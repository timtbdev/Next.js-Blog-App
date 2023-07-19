"use client";
import React from "react";
import BookMarkSolid from "@/components/icons/bookmark-solid";
import BookMarkOutline from "@/components/icons/bookmark-outline";

const BoomarkButton = () => {
  const [isHovering, setIsHovered] = React.useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);
  return (
    <button
      type="button"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative inline-flex items-center mx-auto py-2 justify-center rounded-md border border-dashed border-slate-500/50 w-full"
    >
      {isHovering ? (
        <BookMarkSolid className="-ml-0.5 h-5 w-5 text-gray-900" />
      ) : (
        <BookMarkOutline className="-ml-0.5 h-5 w-5 text-gray-400" />
      )}
      <span className="ml-2 text-sm text-gray-400 hover:text-gray-900">
        Хадгалах
      </span>
    </button>
  );
};

export default BoomarkButton;
