"use client";

import { CreatePost } from "@/actions/post/create-post";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { postConfig } from "@/config/post";
import { supabase } from "@/utils/supabase-client";
import { Session } from "@supabase/auth-helpers-nextjs";
import { Loader2 as SpinnerIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const PostCreateButton = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [session, setSession] = useState<Session | null>(null);

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
  }, [session?.user.id]);

  async function createPost() {
    setIsLoading(true);

    if (session?.user.id) {
      const post = {
        title: postConfig.untitled,
        user_id: session?.user.id,
      };

      const response = await CreatePost(post);

      if (response) {
        toast.success(postConfig.successCreate);
        // This forces a cache invalidation.
        router.refresh();
        // Redirect to the new post
        router.push("/editor/posts/" + response.id);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(postConfig.errorCreate);
      }
    } else {
      setIsLoading(false);
      toast.error(postConfig.errorCreate);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={createPost}
        className="flex items-center rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600"
      >
        {isLoading && <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />}
        {postConfig.newPost}
      </button>
      <AlertDialog open={isLoading} onOpenChange={setIsLoading}>
        <AlertDialogContent className="font-sans">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              {postConfig.pleaseWait}
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

export default PostCreateButton;
