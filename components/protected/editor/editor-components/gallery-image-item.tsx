"use client";

import { DeleteGalleryImage } from "@/actions/images/delete-gallery-image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { editorConfig } from "@/config/editor";
import { shimmer } from "@/lib/utils";
import { Loader2 as SpinnerIcon, TrashIcon, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import toast from "react-hot-toast";

interface GalleryImageItemProps {
  userId: string;
  postId: string;
  fileName: string;
  imageUrl: string;
}

const GalleryImageItem: FC<GalleryImageItemProps> = ({
  userId,
  postId,
  fileName,
  imageUrl,
}) => {
  const router = useRouter();
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  async function deleteImage() {
    setIsDeleteLoading(!isDeleteLoading);
    const imageData = {
      userId: userId,
      postId: postId,
      fileName: fileName,
    };
    const response = await DeleteGalleryImage(imageData);
    if (response) {
      setIsDeleteLoading(false);
      toast.success(editorConfig.successMessagesDeleteImage);
      router.refresh();
    } else {
      setIsDeleteLoading(false);
      toast.error(editorConfig.errorMessagesDeleteImage);
    }
  }
  return (
    <>
      <div className="flex items-center gap-x-3 border-b border-gray-200 pb-3">
        <div className="h-11 w-11 flex-none items-center">
          <Image
            className="h-11 w-11 rounded-md bg-cover"
            src={imageUrl}
            alt="Gallery Photo"
            height={44}
            width={44}
            priority
            placeholder="blur"
            blurDataURL={shimmer(44, 44)}
          />
        </div>
        <div className="grow items-center justify-start text-sm">
          {imageUrl.split("/").at(-1)}
        </div>
        <div className="flex-none">
          <Dialog>
            <DialogTrigger className="mr-2" asChild>
              <Button variant="outline" size="icon">
                <ZoomIn className="h-4 w-4 text-gray-500" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
              <div className="mx-auto items-center">
                <Image
                  src={imageUrl}
                  alt="Fullscreen gallery image"
                  className="h-[500px] w-[700px] rounded-md bg-cover shadow-sm ring-1 ring-gray-400"
                  height={500}
                  width={700}
                  priority
                  placeholder="blur"
                  blurDataURL={shimmer(400, 600)}
                />
              </div>
            </DialogContent>
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="icon">
                <TrashIcon className="h-4 w-4 text-gray-500" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader className="font-sans">
                <AlertDialogTitle>
                  {editorConfig.deleteImageQuestion}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {editorConfig.deleteImageDescription}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="font-sans">
                <AlertDialogCancel>{editorConfig.cancel}</AlertDialogCancel>
                <AlertDialogAction onClick={deleteImage}>
                  {isDeleteLoading ? (
                    <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <TrashIcon className="mr-2 h-4 w-4" />
                  )}
                  <span>{editorConfig.cofirm}</span>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </>
  );
};

export default GalleryImageItem;
