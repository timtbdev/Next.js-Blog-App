import { DeleteBookmark } from "@/actions/bookmark/delete-bookmark";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { bookmarkConfig } from "@/config/bookmark";
import { supabase } from "@/utils/supabase-client";
import { Session } from "@supabase/auth-helpers-nextjs";
import { Loader2 as SpinnerIcon, Trash as TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface BookmarkDeleteButtonProps {
  id?: string;
}

const BookmarkDeleteButton: React.FC<BookmarkDeleteButtonProps> = ({ id }) => {
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [session, setSession] = React.useState<Session | null>(null);

  // Check authentitication and bookmark states
  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [id, session?.user.id]);

  // Delete a bookmark
  async function deleteBookmark() {
    setIsDeleteLoading(true);
    if (id && session?.user.id) {
      const savedPostData = {
        id: id,
        user_id: session?.user.id,
      };
      const response = await DeleteBookmark(savedPostData);
      if (response) {
        setIsDeleteLoading(false);
        toast.success(bookmarkConfig.successDelete);
        router.refresh();
      } else {
        setIsDeleteLoading(false);
        toast.error(bookmarkConfig.errorDelete);
      }
    } else {
      setIsDeleteLoading(false);
      toast.error(bookmarkConfig.errorDelete);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setShowDeleteAlert(true)}
        className="rounded-md border bg-gray-50 px-3 py-2 text-gray-900 hover:bg-gray-100"
      >
        {bookmarkConfig.delete}
      </button>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent className="text-md font-sans">
          <AlertDialogHeader>
            <AlertDialogTitle>{bookmarkConfig.question}</AlertDialogTitle>
            <AlertDialogDescription>
              {bookmarkConfig.warning}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{bookmarkConfig.cancel}</AlertDialogCancel>
            <AlertDialogAction
              className="!mt-2 !bg-gray-900 hover:!bg-gray-600"
              onClick={deleteBookmark}
            >
              {isDeleteLoading ? (
                <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <TrashIcon className="mr-2 h-4 w-4" />
              )}
              <span>{bookmarkConfig.confirm}</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BookmarkDeleteButton;
