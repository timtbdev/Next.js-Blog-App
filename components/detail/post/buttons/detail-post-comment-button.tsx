"use client";

import { detailCommentConfig } from "@/config/detail";
import { MessageOutlineIcon, MessageSolidIcon } from "@/icons";
import React from "react";
import ScrollIntoView from "react-scroll-into-view";

interface DetailPostCommentButtonProps {
  totalComments?: number;
}

const DetailPostCommentButton: React.FC<DetailPostCommentButtonProps> = ({
  totalComments = 0,
}) => {
  const [isHovering, setIsHovered] = React.useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  return (
    <ScrollIntoView selector="#comments" className="flex  w-full">
      <button
        type="button"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="group relative mx-auto inline-flex w-full items-center justify-center rounded-md border border-black/5 bg-white p-2 hover:bg-gray-50 hover:shadow-sm"
      >
        {isHovering ? (
          <MessageSolidIcon className="-ml-0.5 h-5 w-5 text-gray-900" />
        ) : (
          <MessageOutlineIcon className="-ml-0.5 h-5 w-5 text-gray-400" />
        )}
        <span className="absolute -right-[5px] -top-[10px] rounded-full bg-white px-[4px] text-xs font-semibold text-gray-500 shadow-sm ring-1 ring-black/5">
          {totalComments}
        </span>
        <span className="ml-2 hidden text-sm text-gray-400 group-hover:text-gray-900 md:flex">
          {detailCommentConfig.comments}
        </span>
      </button>
    </ScrollIntoView>
  );
};

export default DetailPostCommentButton;
