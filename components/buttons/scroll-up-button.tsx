"use client";

import React from "react";
import ArrowUpOutline from "@/components/icons/arrow-up-outline";
import ArrowUpSolid from "@/components/icons/arrow-up-solid";

interface ScrollUpButtonProps {
  goToTop: () => void;
}

const ScrollUpButton: React.FC<ScrollUpButtonProps> = ({ goToTop }) => {
  const [isHovering, setIsHovered] = React.useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  return (
    <button
      type="button"
      onClick={goToTop}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold border-y-[1.5px] border-r-[1.5px] border-gray-300 focus:z-10 bg-gradient-to-t from-gray-200 via-gray-100 to-gray-50 shadow-md shadow-black/5 transition duration-200 hover:bg-gradient-to-tr hover:from-gray-200 hover:via-gray-100 hover:to-gray-50 active:scale-[96%]"
    >
      {isHovering ? (
        <ArrowUpSolid className="-ml-0.5 h-5 w-5 text-gray-900" />
      ) : (
        <ArrowUpOutline className="-ml-0.5 h-5 w-5 text-gray-400" />
      )}
    </button>
  );
};

export default ScrollUpButton;
