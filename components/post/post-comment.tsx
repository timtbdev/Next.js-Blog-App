"use client";
import React from "react";
import CommentItem from "@/components/post/comment/comment-item";
import { v4 } from "uuid";
import CommentForm from "@/components/post/comment/comment-form";
import { Comment } from "@/types/collection";

interface PostCommentProps {
  slug?: string;
  username?: string;
  profileImage?: string;
  comments: Comment[];
}

const PostComment: React.FC<PostCommentProps> = ({
  slug = "",
  username,
  profileImage,
  comments = [],
}) => {
  return (
    <div
      id="comments"
      className="mx-auto max-w-4xl bg-gray-50 py-5 px-7 rounded-md shadow-sm ring-1 ring-black/5 my-5"
    >
      <div>
        <CommentForm
          slug={slug}
          username={username}
          profileImage={profileImage}
        />
        <div className="py-5">
          {comments?.map((comment) => (
            <CommentItem
              key={v4()}
              id={comment.id.toString()}
              slug={slug}
              name={comment.username as string}
              image={comment.image as string}
              comment={comment.comment as string}
              date={comment.created_at as string}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostComment;
