"use client";

import { UpdatePost } from "@/actions/post/update-post";
import WysiwygEditor from "@/components/protected/editor/wysiwyg/wysiwyg-editor";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { mainCategoryConfig } from "@/config/main";
import { protectedEditorConfig, protectedPostConfig } from "@/config/protected";
import { postEditFormSchema } from "@/lib/validation/post";
import { Draft } from "@/types/collection";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import Uppy from "@uppy/core";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import { DashboardModal } from "@uppy/react";
import Tus from "@uppy/tus";
import { SparklesIcon, Loader2 as SpinnerIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import slugify from "react-slugify";
import { v4 } from "uuid";
import * as z from "zod";
import {
  EditorUploadCoverImageItem,
  EditorUploadCoverImagePlaceHolder,
  EditorUploadGalleryImageTable,
  EditorUploadGalleryImageTableEmpty,
} from "./upload";
import { defaultEditorContent } from "./wysiwyg/default-content";

export const dynamic = "force-dynamic";

type FormData = z.infer<typeof postEditFormSchema>;

interface EditorProps {
  post: Draft;
  userId: string;
  coverImageFileName: string;
  coverImagePublicUrl: string;
  galleryImageFileNames: string[];
  galleryImagePublicUrls: string[];
}

type EditorFormValues = z.infer<typeof postEditFormSchema>;

const Editor: FC<EditorProps> = ({
  post,
  userId,
  coverImageFileName,
  coverImagePublicUrl,
  galleryImageFileNames,
  galleryImagePublicUrls,
}) => {
  const router = useRouter();

  // These are the values that will be used to upload the image
  const allowedNumberOfImages = 9 - galleryImagePublicUrls.length;
  // States
  const [isSaving, setIsSaving] = useState(false);
  const [showLoadingAlert, setShowLoadingAlert] = useState<boolean>(false);
  const [showCoverModal, setShowCoverModal] = useState<boolean>(false);
  const [showGalleryModal, setShowGalleryModal] = useState<boolean>(false);

  // Editor
  const [saveStatus, setSaveStatus] = useState("Saved");

  const [content, setContent] = useState<string | null>(post?.content || null);

  // Setup Uppy with Supabase
  const bucketNamePosts =
    process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_POSTS || "posts";
  const bucketNameCoverImage =
    process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_COVER_IMAGE ||
    "cover-image";
  const bucketNameGalleryImage =
    process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_GALLERY_IMAGE ||
    "gallery-image";
  const token = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const projectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID;
  const supabaseUploadURL = `https://${projectId}.supabase.co/storage/v1/upload/resumable`;

  // Uppy instance for cover photo upload

  var uppyCover = new Uppy({
    id: "cover-image",
    autoProceed: false,
    debug: false,
    allowMultipleUploadBatches: true,
    restrictions: {
      maxFileSize: 6000000,
      maxNumberOfFiles: 1,
    },
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

  uppyCover.on("file-added", (file) => {
    file.meta = {
      ...file.meta,
      bucketName: bucketNameCoverImage,
      objectName: `${userId}/${post.id}/${file.name}`,
      contentType: file.type,
    };
  });

  uppyCover.on("complete", async (result) => {
    if (result.successful.length > 0) {
      toast.success(protectedEditorConfig.successMessageImageUpload);
      router.refresh();
    } else {
      toast.error(protectedEditorConfig.errorMessageImageUpload);
    }
    setShowCoverModal(false);
  });

  // Uppy instance for gallery uploads
  var uppyGallery = new Uppy({
    id: "gallery-image",
    autoProceed: false,
    debug: false,
    allowMultipleUploadBatches: true,
    restrictions: {
      maxFileSize: 6000000,
      maxNumberOfFiles: allowedNumberOfImages,
    },
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

  uppyGallery.on("file-added", (file) => {
    file.meta = {
      ...file.meta,
      bucketName: bucketNameGalleryImage,
      objectName: `${userId}/${post.id}/${file.name}`,
      contentType: file.type,
    };
  });

  uppyGallery.on("complete", async (result) => {
    if (result.successful.length > 0) {
      // Auto save post
      toast.success(protectedEditorConfig.successMessageImageUpload);
      router.refresh();
    } else {
      toast.error(protectedEditorConfig.errorMessageImageUpload);
    }
    setShowGalleryModal(false);
  });

  // Default values for the form
  const defaultValues: Partial<EditorFormValues> = {
    title: post.title ?? "Untitled",
    slug: post.slug ?? `post-${v4()}`,
    image: post.image ?? "",
    categoryId: post.category_id ?? protectedEditorConfig.defaultCategoryId,
    description: post.description ?? "Post description",
    content: content ?? protectedEditorConfig.placeholderContent,
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
      toast.success(protectedEditorConfig.successMessage);
      router.push(`/editor/posts?search=refresh`);
    } else {
      toast.error(protectedEditorConfig.errorMessage);
    }

    setIsSaving(false);
    setShowLoadingAlert(false);
  }

  return (
    <>
      <Form {...form}>
        {/* Title */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* General information */}
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>{protectedEditorConfig.generalTitle}</CardTitle>
              <CardDescription>
                {protectedEditorConfig.generalDescription}
              </CardDescription>
            </CardHeader>
            <Separator className="mb-8" />
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full max-w-md">
                    <FormLabel>{protectedEditorConfig.formTitle}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={protectedEditorConfig.placeHolderTitle}
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
                    <FormLabel>{protectedEditorConfig.slug}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={protectedEditorConfig.placeholderSlug}
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
                        {protectedEditorConfig.generateSlug}
                      </Button>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Category */}
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>{protectedEditorConfig.categoryTitle}</CardTitle>
              <CardDescription>
                {protectedEditorConfig.categoryDescription}
              </CardDescription>
            </CardHeader>
            <Separator className="mb-8" />
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {mainCategoryConfig.map(
                          (category) =>
                            category.slug !== "/" && (
                              <FormItem
                                key={v4()}
                                className="flex items-center space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <RadioGroupItem value={category.id} />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {category.title}
                                </FormLabel>
                              </FormItem>
                            ),
                        )}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Cover Image */}
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>{protectedEditorConfig.coverImageTitle}</CardTitle>
              <CardDescription>
                {protectedEditorConfig.coverImageDescription}
              </CardDescription>
            </CardHeader>
            <Separator className="mb-8" />
            <CardContent className="space-y-4">
              {/* Image */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="w-full max-w-xl">
                    <FormControl>
                      <Input
                        placeholder={protectedEditorConfig.placeholderImage}
                        {...field}
                        disabled={true}
                        className="hidden bg-gray-50"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex w-full flex-col">
                <DashboardModal
                  uppy={uppyCover}
                  open={showCoverModal}
                  onRequestClose={() => setShowCoverModal(false)}
                  disablePageScrollWhenModalOpen={false}
                  showSelectedFiles
                  showRemoveButtonAfterComplete
                  note={protectedEditorConfig.formImageNote}
                  proudlyDisplayPoweredByUppy={false}
                  showLinkToFileUploadResult
                />
                {coverImageFileName === "" && (
                  <div className="col-span-full">
                    <div className="mb-1 flex items-center gap-x-3">
                      <button
                        onClick={() => setShowCoverModal(!showCoverModal)}
                        type="button"
                        className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        <PaperClipIcon className="mr-1 h-4 w-4" />
                        <span className="">
                          {protectedEditorConfig.formCoverImageUploadFile}
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {coverImageFileName !== "" ? (
                  <EditorUploadCoverImageItem
                    userId={userId}
                    postId={post.id}
                    fileName={coverImageFileName}
                    imageUrl={coverImagePublicUrl}
                  />
                ) : (
                  <EditorUploadCoverImagePlaceHolder />
                )}
              </div>
            </CardContent>
          </Card>

          {/* Gallery Images */}
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>{protectedEditorConfig.galleryImageTitle}</CardTitle>
              <CardDescription>
                {protectedEditorConfig.galleryImageDescription +
                  allowedNumberOfImages +
                  "  images."}
              </CardDescription>
            </CardHeader>
            <Separator className="mb-8" />
            <CardContent className="space-y-4">
              <div className="flex w-full flex-col">
                <DashboardModal
                  uppy={uppyGallery}
                  open={showGalleryModal}
                  onRequestClose={() => setShowGalleryModal(false)}
                  disablePageScrollWhenModalOpen={false}
                  showSelectedFiles
                  showRemoveButtonAfterComplete
                  note={protectedEditorConfig.formImageNote}
                  proudlyDisplayPoweredByUppy={false}
                  showLinkToFileUploadResult
                />
                <div className="col-span-full">
                  <div className="mb-3 flex items-center gap-x-3">
                    <button
                      onClick={() => setShowGalleryModal(!showGalleryModal)}
                      type="button"
                      className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      <PaperClipIcon className="mr-1 h-4 w-4" />
                      <span className="">
                        {protectedEditorConfig.chooseFile}
                      </span>
                    </button>
                  </div>
                </div>

                {galleryImagePublicUrls.length > 0 ? (
                  <EditorUploadGalleryImageTable
                    userId={userId}
                    postId={post.id}
                    fileNames={galleryImageFileNames}
                    imageUrls={galleryImagePublicUrls}
                  />
                ) : (
                  <EditorUploadGalleryImageTableEmpty />
                )}
              </div>
            </CardContent>
          </Card>

          {/* Short Description */}
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>
                {protectedEditorConfig.shortDescriptionTitle}
              </CardTitle>
              <CardDescription>
                {protectedEditorConfig.shortDescriptionDescription}
              </CardDescription>
            </CardHeader>
            <Separator className="mb-8" />
            <CardContent className="space-y-4">
              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder={
                          protectedEditorConfig.placeholderDescription
                        }
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <WysiwygEditor
            defaultValue={content ? JSON.parse(content) : defaultEditorContent}
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
              {protectedEditorConfig.submit}
            </Button>
            <Button
              type="button"
              onClick={() => router.back()}
              className="flex !bg-gray-100 px-10 !text-gray-900 hover:!bg-gray-200"
              disabled={isSaving}
            >
              {protectedEditorConfig.cancel}
            </Button>
          </div>
        </form>
      </Form>
      <AlertDialog open={showLoadingAlert} onOpenChange={setShowLoadingAlert}>
        <AlertDialogContent className="font-sans">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              {protectedPostConfig.pleaseWait}
            </AlertDialogTitle>
            <AlertDialogDescription className="mx-auto text-center">
              <SpinnerIcon className="h-6 w-6 animate-spin" />
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Editor;
