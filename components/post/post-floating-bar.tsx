"use client";

import BoomarkButton from "@/components/buttons/bookmark-button";
import CommentButton from "@/components/buttons/comment-button";
import EyeButton from "@/components/buttons/eye-button";
import LikeButton from "@/components/buttons/like-button";
import ShareButton from "@/components/buttons/share-button";
import React, { useEffect } from "react";
import UnlikeButton from "../buttons/unlike-button";

interface PostFloatingBarProps {
  id: string;
  title?: string;
  text?: string;
  url?: string;
  slug?: string;
  views?: number;
  likes?: number;
  ip?: string;
  totalComments?: number;
  bookmarked?: boolean;
}

const PostFloatingBar: React.FC<PostFloatingBarProps> = ({
  id,
  title = "",
  text = "",
  url = window.location.href,
  slug = "",
  views = 0,
  likes = 0,
  ip,
  totalComments = 0,
  bookmarked = false,
}) => {
  return (
    <>
      <div className="grid w-full grid-cols-2 justify-start gap-4 rounded-md md:grid-cols-3 lg:grid-cols-5">
        {ip ? (
          <UnlikeButton slug={slug} likes={likes} />
        ) : (
          <LikeButton slug={slug} likes={likes} />
        )}
        <EyeButton slug={slug} views={views} />
        <CommentButton totalComments={totalComments} />
        <BoomarkButton id={id} bookmarked={bookmarked} />
        <ShareButton title={title} text={text} url={url} />
      </div>
    </>
  );
};

export default PostFloatingBar;
