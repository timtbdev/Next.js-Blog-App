"use client";

import EyeOutline from "@/components/icons/eye-outline";
import EyeSolid from "@/components/icons/eye-solid";
import { buttonConfig } from "@/config/buttons";
import React from "react";
import { toast } from "react-hot-toast";

interface EyeButtonProps {
  slug?: string;
  views?: number;
}

const EyeButton: React.FC<EyeButtonProps> = ({ slug = "", views = 0 }) => {
  const [isHovering, setIsHovered] = React.useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  return (
    <button
      type="button"
      onClick={() => {
        toast.success(`${buttonConfig.viewed} :` + views);
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group relative mx-auto inline-flex w-full items-center justify-center rounded-md border border-black/5 bg-white py-2 hover:bg-gray-50 hover:shadow-sm"
    >
      {isHovering ? (
        <EyeSolid className="-ml-0.5 h-5 w-5 text-gray-900" />
      ) : (
        <EyeOutline className="-ml-0.5 h-5 w-5 text-gray-400" />
      )}
      <span className="absolute -right-[5px] -top-[10px] rounded-full bg-white px-[4px] text-xs font-semibold text-gray-500 shadow-sm ring-1 ring-black/5">
        {views}
      </span>
      <span className="ml-2 text-sm text-gray-400 group-hover:text-gray-900">
        {buttonConfig.views}
      </span>
    </button>
  );
};

export default EyeButton;
