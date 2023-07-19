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
        className="relative inline-flex w-full items-center justify-center mx-auto py-2 rounded-md border border-dashed border-slate-500/50"
      >
        {isHovering ? (
          <MessageSolid className="-ml-0.5 h-5 w-5 text-gray-900" />
        ) : (
          <MessageOutline className="-ml-0.5 h-5 w-5 text-gray-400" />
        )}
        <span className="absolute -top-[10px] -right-[5px] font-semibold text-xs text-gray-600 bg-gray-300 rounded-full px-[4px]">
          66
        </span>
        <span className="ml-2 text-sm text-gray-400 hover:text-gray-900 overflow-hidden">
          Сэтгэгдэл
        </span>
      </button>
    </ScrollIntoView>
  );
};

export default CommentButton;
