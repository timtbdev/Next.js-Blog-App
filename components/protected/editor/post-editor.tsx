"use client";

import { UpdatePost } from "@/actions/post/update-post";
import ScrollUpButton from "@/components/buttons/scroll-up-button";
import FormTitle from "@/components/protected/editor/post-title";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/config/categories";
import { editorConfig } from "@/config/editor";
import { postConfig } from "@/config/post";
import { cn, getUrl, shimmer } from "@/lib/utils";
import { postEditFormSchema } from "@/lib/validation/post";
import { Draft } from "@/types/collection";
import { supabase } from "@/utils/supabase-client";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import { SparklesIcon, Loader2 as SpinnerIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Editor } from "novel";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import ScrollToTop from "react-scroll-to-top";
import slugify from "react-slugify";
import { v4 } from "uuid";
import * as z from "zod";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import Tus from "@uppy/tus";

export const dynamic = "force-dynamic";

type FormData = z.infer<typeof postEditFormSchema>;

interface PostEditorProps {
  post: Draft;
}

// Delete image from Supabase Storage
async function deleteImage(
  bucketName: string,
  userId: string,
  postId: string,
  fileName: string,
) {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .remove([`${userId}/${postId}/${fileName}`]);

  if (error) {
    console.log(error);
  }
  if (data) {
    return data;
  } else {
    return null;
  }
}

// Download image from Supabase Storage
async function downloadImage(
  bucketName: string,
  userId: string,
  postId: string,
  fileName: string,
) {
  const { data } = await supabase.storage
    .from(bucketName)
    .getPublicUrl(`${userId}/${postId}/${fileName}`);

  if (data) {
    return data.publicUrl;
  } else {
    return "/images/not-found.jpg";
  }
}

type EditorFormValues = z.infer<typeof postEditFormSchema>;

const PostEditor: FC<PostEditorProps> = ({ post }) => {
  const router = useRouter();

  // These are the values that will be used to upload the image
  const [userId, setUserId] = useState<string>("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  // States
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showLoadingAlert, setShowLoadingAlert] = useState(false);

  const [content, setContent] = useState<string | null>(post?.content || null);
  const [showImage, setShowImage] = useState<boolean>(
    post?.image ? true : false,
  );

  // Setup Uppy
  const token = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const projectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID;
  const bucketName = "posts";
  const supabaseUploadURL = `https://${projectId}.supabase.co/storage/v1/upload/resumable`;

  // Get user id for image upload folder + filename
  const getUserId = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user !== null) {
        setUserId(user.id);
      } else {
        setUserId("");
      }
    } catch (e) {}
  };

  useEffect(() => {
    getUserId();
    setImageUrl(post?.image ?? null);
  }, [userId, post?.image]);

  var uppy = new Uppy({
    id: "image-upload",
    autoProceed: true,
    debug: true,
    allowMultipleUploadBatches: false,
    restrictions: { maxFileSize: 6000000, maxNumberOfFiles: 1 },
  }).use(Tus, {
    endpoint: supabaseUploadURL,
    headers: {
      authorization: `Bearer ${token}`,
    },
    chunkSize: 6 * 1024 * 1024,
    allowedMetaFields: [
      "bucketName",
      "objectName",
      "contentType",
      "cacheControl",
    ],
  });

  uppy.on("file-added", (file) => {
    file.meta = {
      ...file.meta,
      bucketName: bucketName,
      objectName: userId
        ? `${userId}/${post.id}/${file.name}`
        : `${post.id}/${file.name}`,
      contentType: file.type,
    };
  });

  uppy.on("complete", async (result) => {
    if (result.successful.length != 0) {
      setFileName(result.successful[0].name);
      await downloadImage(
        bucketName,
        userId,
        post.id,
        result.successful[0].name,
      ).then((url) => {
        console.log("URL : ", url);
        setImageUrl(url);
        form.setValue("image", url);
        setShowImage(true);
      });
    } else {
      toast.error(editorConfig.errorMessageImageUpload);
    }
  });

  // Default values for the form
  const defaultValues: Partial<EditorFormValues> = {
    title: post.title ?? "Untitled",
    slug: post.slug ?? `post-${v4()}`,
    image: post.image ?? "",
    categoryId: post.category_id ?? editorConfig.defaultCategoryId,
    description: post.description ?? "Post description",
    content: content ?? editorConfig.placeholderContent,
  };

  const form = useForm<EditorFormValues>({
    resolver: zodResolver(postEditFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: EditorFormValues) {
    setShowLoadingAlert(true);
    setIsSaving(true);

    const response = await UpdatePost({
      id: post.id,
      title: data.title,
      slug: data.slug,
      image: data.image,
      description: data.description,
      content: content,
      categoryId: data.categoryId,
    });

    if (response) {
      toast.success(editorConfig.successMessage);
      router.push(`/editor/posts/`);
    } else {
      toast.error(editorConfig.errorMessage);
    }

    setIsSaving(false);
    setShowLoadingAlert(false);
  }

  return (
    <>
      <Form {...form}>
        {/* Title */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full max-w-md">
                <FormLabel>{editorConfig.formTitle}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={editorConfig.placeHolderTitle}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Slug */}
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="w-full max-w-md">
                <FormLabel>{editorConfig.slug}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={editorConfig.placeholderSlug}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() =>
                      field.onChange(slugify(form.getValues("title")))
                    }
                  >
                    <SparklesIcon className="mr-2 h-4 w-4" />
                    {editorConfig.generateSlug}
                  </Button>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Category */}
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full max-w-xs">
                <FormLabel>{editorConfig.formCategory}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={editorConfig.placeholderCategory}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map(
                      (category, idx) =>
                        idx != 0 && (
                          <SelectItem
                            key={category.id}
                            value={category.id}
                            className="font-sans"
                          >
                            {category.title}
                          </SelectItem>
                        ),
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="w-full max-w-xl">
                <FormLabel>{editorConfig.formImage}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={editorConfig.placeholderImage}
                    {...field}
                    disabled={true}
                    className="bg-gray-50"
                  />
                </FormControl>
                <FormDescription>
                  {showImage && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={isDeleting}
                      className="mt-2"
                      onClick={async () => {
                        const response = await deleteImage(
                          bucketName,
                          userId,
                          post.id,
                          fileName ? fileName : "",
                        );
                        if (response != null) {
                          setImageUrl("");
                          setShowImage(false);
                          form.setValue("image", "");
                          toast.success(
                            editorConfig.successMessagesDeleteImage,
                          );
                        } else {
                          toast.error(editorConfig.errorMessagesDeleteImage);
                        }
                      }}
                    >
                      {isDeleting ? (
                        <SpinnerIcon className="mr-2 h-4 w-4" />
                      ) : (
                        <TrashIcon className="mr-2 h-4 w-4" />
                      )}

                      {editorConfig.deleteImage}
                    </Button>
                  )}
                </FormDescription>
                {/* Uploader */}
                {showImage ? (
                  <div className="flex w-full justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <Image
                      src={imageUrl ? imageUrl : "/images/not-found.jpg"}
                      width={570}
                      height={350}
                      alt="icon"
                      priority
                      placeholder="blur"
                      blurDataURL={shimmer(570, 350)}
                      className="h-full w-[570] rounded-lg object-cover"
                    />
                  </div>
                ) : (
                  <Dashboard uppy={uppy} />
                )}

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{editorConfig.formDescription}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={editorConfig.placeholderDescription}
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Content editor */}
          <FormTitle title={editorConfig.formContent} />
          <Editor
            storageKey={post.id}
            defaultValue={JSON.parse(content ?? "{}")}
            onDebouncedUpdate={(editor) => {
              setContent(JSON.stringify(editor?.getJSON()));
            }}
          />
          <div className="infline-flex flex items-center justify-start space-x-3">
            <Button
              type="submit"
              className="flex !bg-gray-900 px-10 !text-white hover:!bg-gray-800"
              disabled={isSaving}
            >
              {editorConfig.submit}
            </Button>
            <Button
              type="submit"
              className="flex !bg-gray-100 px-10 !text-gray-900 hover:!bg-gray-200"
              disabled={isSaving}
            >
              {editorConfig.cancel}
            </Button>
          </div>
        </form>
      </Form>
      <AlertDialog open={showLoadingAlert} onOpenChange={setShowLoadingAlert}>
        <AlertDialogContent className="font-sans">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              <SpinnerIcon className="ml-2 h-4 w-4" />
              {postConfig.pleaseWait}
            </AlertDialogTitle>
            <AlertDialogDescription className="mx-auto text-center">
              <SpinnerIcon className="h-6 w-6 animate-spin" />
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
      <ScrollUpButton />
      <ScrollToTop />
    </>
  );
};

export default PostEditor;
