"use client";

import React, { useEffect } from "react";
import LikeButton from "@/components/buttons/like-button";
import EyeButton from "@/components/buttons/eye-button";
import BoomarkButton from "@/components/buttons/bookmark-button";
import CommentButton from "@/components/buttons/comment-button";
import ShareButton from "@/components/buttons/share-button";
import UnlikeButton from "../buttons/unlike-button";

interface PostFloatingBarProps {
  title?: string;
  text?: string;
  url?: string;
  slug?: string;
  views?: number;
  likes?: number;
  ip?: string;
}

const PostFloatingBar: React.FC<PostFloatingBarProps> = ({
  title = "",
  text = "",
  url = window.location.href,
  slug = "",
  views = 0,
  likes = 0,
  ip,
}) => {
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-4 w-full justify-start rounded-md">
        {ip ? (
          <UnlikeButton slug={slug} likes={likes} />
        ) : (
          <LikeButton slug={slug} likes={likes} />
        )}
        <EyeButton slug={slug} views={views} />
        <CommentButton />
        <BoomarkButton />
        <ShareButton title={title} text={text} url={url} />
      </div>
    </>
  );
};

export default PostFloatingBar;
