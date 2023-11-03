"use client";

import {
  DetailPostCommentForm,
  DetailPostCommentItem,
  DetailPostCommentWrapper,
  DetailPostSignInToComment,
} from "@/components/detail/post/comment";
import { CommentWithProfile } from "@/types/collection";
import { createClient } from "@/utils/supabase/client";
import { Session } from "@supabase/supabase-js";
import React from "react";
import { v4 } from "uuid";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface DetailPostCommentProps {
  postId: string;
  comments: CommentWithProfile[];
}

const DetailPostComment: React.FC<DetailPostCommentProps> = ({
  postId = "",
  comments = [],
}) => {
  const supabase = createClient();
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
  }, [session?.user.id, supabase.auth]);
  return (
    <DetailPostCommentWrapper>
      {session ? (
        <DetailPostCommentForm postId={postId} userId={session?.user.id} />
      ) : (
        <DetailPostSignInToComment />
      )}
      <div className="py-5">
        {comments?.map((comment) => (
          <DetailPostCommentItem
            key={v4()}
            id={comment.id.toString()}
            name={comment.profiles.full_name as string}
            image={comment.profiles.avatar_url as string}
            comment={comment.comment as string}
            date={comment.created_at as string}
            userId={comment.user_id as string}
          />
        ))}
      </div>
    </DetailPostCommentWrapper>
  );
};

export default DetailPostComment;
