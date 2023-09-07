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

export const dynamic = "force-dynamic";

type FormData = z.infer<typeof postEditFormSchema>;

interface PostEditorProps {
  post: Draft;
}

// Delete image from Supabase Storage
async function deleteImage(
  bucketName: string,
  folderName: string,
  fileName: string,
) {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .remove([`${folderName}/${fileName}`]);

  if (error) {
    console.log(error);
  }
  if (data) {
    return data;
  } else {
    return null;
  }
}

type EditorFormValues = z.infer<typeof postEditFormSchema>;

const PostEditor: FC<PostEditorProps> = ({ post }) => {
  const router = useRouter();

  // These are the values that will be used to upload the image
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [userId, setUserId] = useState<string>("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  // States
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showLoadingAlert, setShowLoadingAlert] = useState(false);

  const [content, setContent] = useState<string | null>(post?.content || null);

  // These functions are used to upload the image

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

  const setImagePublicUrl = async (filePath: string) => {
    const { data } = await supabase.storage
      .from("posts")
      .getPublicUrl(filePath);
    if (data) {
      const url = data.publicUrl;
      setImageUrl(url);
      form.setValue("image", url);
    } else {
      console.log("Error getting a publich image url : ", data);
    }
  };

  const uploadImage = async (e) => {
    let file = e.target.files[0];
    const fileName = file.name;
    const { data, error } = await supabase.storage
      .from("posts")
      .upload(userId + "/" + post.id + "/" + fileName, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (data) {
      setFileName(fileName);
      setImagePublicUrl(data.path);
    } else {
      console.log(error);
    }
  };

  // Image uploader powered

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
                <FormControl>
                  <Input
                    placeholder={editorConfig.placeholderImage}
                    {...field}
                    disabled={true}
                    className="hiden bg-gray-50"
                  />
                </FormControl>
                {/* Uploader */}
                <FormTitle title={editorConfig.coverPhoto} />
                <div className="col-span-full">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {editorConfig.thumbnail}
                  </label>

                  {imageUrl ? (
                    // Delete button
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={isDeleting}
                      className="mt-2"
                    >
                      {isDeleting ? (
                        <SpinnerIcon className="mr-2 h-4 w-4" />
                      ) : (
                        <TrashIcon className="mr-2 h-4 w-4" />
                      )}

                      {editorConfig.deleteImage}
                    </Button>
                  ) : (
                    // Choose a file button
                    <div className="mt-2 flex items-center gap-x-3">
                      <Input
                        className="max-w-xs rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        type="file"
                        onChange={(e) => uploadImage(e)}
                      />
                    </div>
                  )}
                </div>

                {/* Image Upload Preview */}
                {imageUrl ? (
                  <div className="col-span-full">
                    <label
                      htmlFor="cover-photo"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      {editorConfig.coverPhoto}
                    </label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <Image
                        src={imageUrl ?? `${getUrl()}/images/not-found.png`}
                        alt={editorConfig.coverPhoto}
                        width={500}
                        height={500}
                        priority={true}
                        placeholder="blur"
                        blurDataURL={shimmer(500, 500)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="col-span-full">
                    <label
                      htmlFor="cover-photo"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      {editorConfig.coverPhoto}
                    </label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center">
                        <PhotoIcon
                          className="mx-auto h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600"></div>
                        <p className="text-xs leading-5 text-gray-600">
                          {editorConfig.uploadDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <FormMessage />
              </FormItem>
            )}
          />
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
