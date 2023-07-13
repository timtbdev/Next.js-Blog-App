"use client";
import React from "react";
import EyeOutline from "@/components/icons/eye-outline";
import EyeSolid from "@/components/icons/eye-solid";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface EyeButtonProps {
  views?: number;
}

const EyeButton: React.FC<EyeButtonProps> = ({ views = 0 }) => {
  const [isHovering, setIsHovered] = React.useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="relative inline-flex items-center gap-x-1.5 px-3 py-2 text-sm font-semibold text-gray-900 border-y-[1.5px] border-l-[1.5px] border-gray-300 focus:z-10 bg-gradient-to-t from-gray-200 via-gray-100 to-gray-50 shadow-md shadow-black/5 transition duration-200 hover:bg-gradient-to-tr hover:from-gray-200 hover:via-gray-100 hover:to-gray-50 active:scale-[96%]"
        >
          {isHovering ? (
            <EyeSolid className="-ml-0.5 h-5 w-5 text-gray-900" />
          ) : (
            <EyeOutline className="-ml-0.5 h-5 w-5 text-gray-400" />
          )}
          {views}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 font-sans">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Хандалт</h4>
            <p className="text-sm text-muted-foreground">{views}</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EyeButton;
