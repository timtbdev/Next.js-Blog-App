"use client";
import React from "react";
import MessageOutline from "@/components/icons/message-outline";
import MessageSolid from "@/components/icons/message-solid";
import ScrollIntoView from "react-scroll-into-view";

const CommentButton = () => {
  const [isHovering, setIsHovered] = React.useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  return (
    <ScrollIntoView selector="#comments" className="flex  w-full">
      <button
        type="button"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="group relative inline-flex items-center mx-auto py-2 justify-center rounded-md border border-black/5 w-full bg-white hover:bg-gray-50 hover:shadow-sm"
      >
        {isHovering ? (
          <MessageSolid className="-ml-0.5 h-5 w-5 text-gray-900" />
        ) : (
          <MessageOutline className="-ml-0.5 h-5 w-5 text-gray-400" />
        )}
        <span className="absolute -top-[10px] -right-[5px] font-semibold text-xs text-gray-500 bg-white rounded-full ring-1 ring-black/5 shadow-sm px-[4px]">
          66
        </span>
        <span className="ml-2 text-sm text-gray-400 group-hover:text-gray-900 overflow-hidden">
          Сэтгэгдэл
        </span>
      </button>
    </ScrollIntoView>
  );
};

export default CommentButton;
