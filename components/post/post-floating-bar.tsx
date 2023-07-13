"use client";

import React from "react";
import HeartButton from "@/components/buttons/heart-button";
import EyeButton from "@/components/buttons/eye-button";
import BoomarkButton from "@/components/buttons/bookmark-button";
import CommentButton from "@/components/buttons/comment-button";
import ShareButton from "@/components/buttons/share-button";
import ScrollUpButton from "@/components/buttons/scroll-up-button";
import { useReadingProgress } from "@/hooks/use-reading-progress";
import { cn } from "@/lib/utils";

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
  const completion = useReadingProgress();
  const goToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <div
      className={cn(
        "max-w-4xl w-full py-5 justify-center mx-auto inline-flex rounded-md",
        {
          "fixed max-w-md sm:max-w-4xl bottom-0 transition duration-150 ease-in-out z-40":
            completion < 95,
        }
      )}
    >
      <HeartButton />
      <EyeButton views={views} />
      <CommentButton />
      <BoomarkButton />
      <ShareButton title={title} text={text} url={url} />
      <ScrollUpButton goToTop={goToTop} />
    </div>
  );
};

export default PostFloatingBar;
