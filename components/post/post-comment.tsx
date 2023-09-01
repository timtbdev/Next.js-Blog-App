'use client';
import React from 'react';
import CommentItem from '@/components/post/comment/comment-item';
import SignInToComment from '@/components/post/comment/sign-in-to-comment';
import CommentWrapper from '@/components/post/comment/comment-wrapper';
import { v4 } from 'uuid';
import CommentForm from '@/components/post/comment/comment-form';
import { CommentWithProfile } from '@/types/collection';
import { supabase } from '@/utils/supabase-client';
import { Session } from '@supabase/auth-helpers-nextjs';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PostCommentProps {
    postId: string;
    comments: CommentWithProfile[];
}

const PostComment: React.FC<PostCommentProps> = ({ postId = '', comments = [] }) => {
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
    }, [session?.user.id]);
    return (
        <CommentWrapper>
            {session ? <CommentForm postId={postId} userId={session?.user.id} /> : <SignInToComment />}
            <div className="py-5">
                {comments?.map((comment) => (
                    <CommentItem
                        key={v4()}
                        id={comment.id.toString()}
                        name={comment.profiles.full_name as string}
                        image={comment.profiles.avatar_url as string}
                        comment={comment.comment as string}
                        date={comment.created_at as string}
                    />
                ))}
            </div>
        </CommentWrapper>
    );
};

export default PostComment;
