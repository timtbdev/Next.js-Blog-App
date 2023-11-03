"use client";

import { UpdateSettings } from "@/actions/settings/update-settings";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { protectedProfileConfig } from "@/config/protected";
import { shimmer, toBase64 } from "@/lib/utils";
import { profileFormSchema } from "@/lib/validation/profile";
import { Profile } from "@/types/collection";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Uppy from "@uppy/core";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import { DashboardModal } from "@uppy/react";
import Tus from "@uppy/tus";
import { Loader2 as SpinnerIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface SettingsProfileProps {
  user: Profile;
}

async function downloadImage(
  bucketName: string,
  userId: string,
  fileName: string,
) {
  const supabase = createClient();
  const { data } = supabase.storage
    .from(bucketName)
    .getPublicUrl(`${userId}/${fileName}`);

  if (data.publicUrl) {
    return data.publicUrl;
  }

  return null;
}

const SettingsProfile: FC<SettingsProfileProps> = ({ user }) => {
  const router = useRouter();

  // Setup Uppy with Supabase
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    user.avatar_url || user.avatar_url !== "" ? user.avatar_url : null,
  );
  const bucketName =
    process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_PROFILE || "profile";
  const token = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const projectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID;
  const supabaseUploadURL = `https://${projectId}.supabase.co/storage/v1/upload/resumable`;

  // Uppy instance for cover photo upload
  var uppy = new Uppy({
    id: "avatar",
    autoProceed: false,
    debug: true,
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

  uppy.on("file-added", (file) => {
    file.meta = {
      ...file.meta,
      bucketName: bucketName,
      objectName: `${user.id}/${file.name}`,
      contentType: file.type,
    };
  });

  uppy.on("complete", async (result) => {
    if (result.successful.length > 0) {
      const avatarUrl = await downloadImage(
        bucketName,
        user.id,
        result.successful[0].name,
      );
      setAvatarUrl(avatarUrl);
      toast.success(protectedProfileConfig.successMessageImageUpload);
    } else {
      toast.error(protectedProfileConfig.errorMessageImageUpload);
    }
    setShowModal(false);
  });

  // This can come from your database or API.
  const defaultValues: Partial<ProfileFormValues> = {
    firstName: user.full_name?.split(" ")[0] || "",
    lastName: user.full_name?.split(" ")[1] || "",
    userName: user.username || "",
    website: user.website || "",
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: ProfileFormValues) {
    setIsUpdating(true);

    const response = await UpdateSettings({
      id: user.id,
      fistName: data.firstName,
      lastName: data.lastName,
      avatarUrl: avatarUrl || "",
      userName: data.userName,
      email: data.email,
      website: data.website,
    });

    if (response) {
      toast.success(protectedProfileConfig.successMessage);
      router.push(`/editor/posts/`);
    } else {
      toast.error(protectedProfileConfig.errorMessage);
    }

    setIsUpdating(false);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal information */}
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>{protectedProfileConfig.primaryTitle}</CardTitle>
              <CardDescription>
                {protectedProfileConfig.primarySubTitle}
              </CardDescription>
            </CardHeader>
            <Separator className="mb-8" />
            <CardContent className="space-y-4">
              <div className="mx-auto flex max-w-3xl flex-col justify-center">
                <div className="col-span-full flex items-center gap-x-8">
                  <Image
                    src={avatarUrl || "/images/not-found.jpg"}
                    alt="Avatar"
                    height={96}
                    width={96}
                    className="h-24 w-24 flex-none rounded-lg object-cover"
                    priority
                    placeholder={`data:image/svg+xml;base64,${toBase64(
                      shimmer(96, 96),
                    )}`}
                  />

                  <div>
                    <button
                      type="button"
                      onClick={() => setShowModal(true)}
                      className="rounded-md bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-500 shadow-sm ring-1 ring-gray-300 hover:bg-gray-100"
                    >
                      {protectedProfileConfig.changeAvatar}
                    </button>
                    <p className="mt-2 text-xs leading-5 text-gray-500">
                      {protectedProfileConfig.uploadNote}
                    </p>
                  </div>
                  <DashboardModal
                    uppy={uppy}
                    open={showModal}
                    onRequestClose={() => setShowModal(false)}
                    disablePageScrollWhenModalOpen={false}
                    showSelectedFiles
                    showRemoveButtonAfterComplete
                    note={protectedProfileConfig.formImageNote}
                    proudlyDisplayPoweredByUppy={false}
                    showLinkToFileUploadResult
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{protectedProfileConfig.firstName}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          protectedProfileConfig.firstNamePlaceholder
                        }
                        {...field}
                        className="max-w-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{protectedProfileConfig.lastName}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={protectedProfileConfig.lastNamePlaceholder}
                        {...field}
                        className="max-w-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* User information */}
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>{protectedProfileConfig.secondaryTitle}</CardTitle>
              <CardDescription>
                {protectedProfileConfig.secondarySubTitle}
              </CardDescription>
            </CardHeader>
            <Separator className="mb-8" />
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{protectedProfileConfig.userName}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={protectedProfileConfig.userNamePlaceholder}
                        {...field}
                        className="max-w-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{protectedProfileConfig.email}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={protectedProfileConfig.emailPlaceholder}
                        {...field}
                        className="max-w-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{protectedProfileConfig.website}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={protectedProfileConfig.websitePlaceholder}
                        {...field}
                        className="max-w-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Button type="submit" disabled={isUpdating}>
            {protectedProfileConfig.update}
          </Button>
        </form>
      </Form>
      <AlertDialog open={isUpdating} onOpenChange={setIsUpdating}>
        <AlertDialogContent className="font-sans">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              {protectedProfileConfig.pleaseWait}
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

export default SettingsProfile;
