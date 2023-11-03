"use client";

import { AddBookmark } from "@/actions/bookmark/add-bookmark";
import { DeleteBookmark } from "@/actions/bookmark/delete-bookmark";
import { LoginSection } from "@/components/login";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { detailBookMarkConfig } from "@/config/detail";
import { BookMarkOutlineIcon, BookMarkSolidIcon } from "@/icons";
import { createClient } from "@/utils/supabase/client";
import { Session } from "@supabase/supabase-js";
import { Loader2 as SpinnerIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import toast from "react-hot-toast";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface DetailPostBookMarkButtonProps {
  id: string;
  isBookmarked?: boolean;
}

const DetailPostBookMarkButton: FC<DetailPostBookMarkButtonProps> = ({
  id,
  isBookmarked,
}) => {
  const supabase = createClient();
  const [isHovering, setIsHovered] = React.useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);
  const router = useRouter();
  const [session, setSession] = React.useState<Session | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

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
  }, [id, session?.user.id, supabase.auth]);

  // Add a bookmark
  async function addBookmark() {
    setIsLoading(true);

    if (id && session?.user.id) {
      const bookmark = {
        id: id,
        user_id: session?.user.id,
      };

      const response = await AddBookmark(bookmark);
      if (response) {
        toast.success(detailBookMarkConfig.successAdd);
        router.refresh();
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(detailBookMarkConfig.errorAdd);
      }
    } else {
      setIsLoading(false);
      toast.error(detailBookMarkConfig.errorAdd);
    }
  }

  // Delete a bookmark
  async function deleteBookmark() {
    setIsLoading(true);

    if (id && session?.user.id) {
      const bookmark = {
        id: id,
        user_id: session?.user.id,
      };

      const response = await DeleteBookmark(bookmark);
      if (response) {
        setIsLoading(false);
        toast.success(detailBookMarkConfig.successDelete);
        router.refresh();
      } else {
        setIsLoading(false);
        toast.error(detailBookMarkConfig.errorDelete);
      }
    } else {
      setIsLoading(false);
      toast.error(detailBookMarkConfig.errorDelete);
    }
  }

  return (
    <>
      {session &&
        (isBookmarked ? (
          <button
            type="button"
            disabled={isLoading}
            onClick={deleteBookmark}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="group relative mx-auto inline-flex w-full items-center justify-center rounded-md border border-black/5 bg-white py-2 hover:bg-gray-50 hover:shadow-sm"
          >
            {isLoading ? (
              <SpinnerIcon className="-ml-0.5 h-5 w-5 animate-spin" />
            ) : isHovering ? (
              <BookMarkOutlineIcon className="-ml-0.5 h-5 w-5 text-gray-400" />
            ) : (
              <BookMarkSolidIcon className="-ml-0.5 h-5 w-5 text-gray-900" />
            )}
            <span className="ml-2 hidden text-sm text-gray-400 md:flex">
              {isHovering
                ? detailBookMarkConfig.unBookmark
                : detailBookMarkConfig.bookmarked}
            </span>
          </button>
        ) : (
          <button
            type="button"
            disabled={isLoading}
            onClick={addBookmark}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="group relative mx-auto inline-flex w-full items-center justify-center rounded-md border border-black/5 bg-white py-2 hover:bg-gray-50 hover:shadow-sm"
          >
            {isLoading ? (
              <SpinnerIcon className="-ml-0.5 h-5 w-5 animate-spin" />
            ) : isHovering ? (
              <BookMarkSolidIcon className="-ml-0.5 h-5 w-5 text-gray-900" />
            ) : (
              <BookMarkOutlineIcon className="-ml-0.5 h-5 w-5 text-gray-400" />
            )}
            <span className="ml-2 hidden text-sm text-gray-400 group-hover:text-gray-900 md:flex">
              {detailBookMarkConfig.bookmark}
            </span>
          </button>
        ))}
      {!session && (
        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              disabled={isLoading}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              className="group relative mx-auto inline-flex w-full items-center justify-center rounded-md border border-black/5 bg-white py-2 hover:bg-gray-50 hover:shadow-sm"
            >
              {isHovering ? (
                <BookMarkSolidIcon className="-ml-0.5 h-5 w-5 text-gray-900" />
              ) : (
                <BookMarkOutlineIcon className="-ml-0.5 h-5 w-5 text-gray-400" />
              )}
              <span className="ml-2 hidden text-sm text-gray-400 group-hover:text-gray-900 md:flex">
                {detailBookMarkConfig.bookmark}
              </span>
            </button>
          </DialogTrigger>
          <DialogContent className="font-sans sm:max-w-[425px]">
            <LoginSection />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default DetailPostBookMarkButton;
