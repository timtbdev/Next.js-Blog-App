"use client";

import React from "react";
import HeartButton from "@/components/buttons/heart-button";
import EyeButton from "@/components/buttons/eye-button";
import BoomarkButton from "@/components/buttons/bookmark-button";
import CommentButton from "@/components/buttons/comment-button";
import ShareButton from "@/components/buttons/share-button";

interface PostFloatingBarProps {
  title?: string;
  text?: string;
  url?: string;
  views?: number;
}

const PostFloatingBar: React.FC<PostFloatingBarProps> = ({
  title = "",
  text = "",
  url = window.location.href,
  views = 0,
}) => {
  const goToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <>
      <div className="flex w-full justify-center mx-auto rounded-md">
        <HeartButton />
        <EyeButton views={views} />
        <CommentButton />
        <BoomarkButton />
        <ShareButton title={title} text={text} url={url} />
      </div>
    </>
  );
};

export default PostFloatingBar;
