"use client";
import React from "react";
import EyeOutline from "@/components/icons/eye-outline";
import EyeSolid from "@/components/icons/eye-solid";
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
        toast.success("Хуудас үзсэн тоо: " + views);
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative inline-flex items-center mx-auto py-2  justify-center rounded-md border border-dashed border-slate-500/50 w-full"
    >
      {isHovering ? (
        <EyeSolid className="-ml-0.5 h-5 w-5 text-gray-900" />
      ) : (
        <EyeOutline className="-ml-0.5 h-5 w-5 text-gray-400" />
      )}
      <span className="absolute -top-[10px] -right-[5px] font-semibold text-xs text-gray-600 bg-gray-300 rounded-full px-[4px]">
        {views}
      </span>
      <span className="ml-2 text-sm text-gray-400 hover:text-gray-900">
        Уншсан
      </span>
    </button>
  );
};

export default EyeButton;
