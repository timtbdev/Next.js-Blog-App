"use client";

import BookMarkOutline from "@/components/icons/bookmark-outline";
import BookMarkSolid from "@/components/icons/bookmark-solid";
import LoginSection from "@/components/login/login-section";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { buttonConfig } from "@/config/buttons";
import { useRouter } from "next/navigation";
import React from "react";

const BoomarkButton = () => {
  const [isHovering, setIsHovered] = React.useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);
  const router = useRouter();
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="group relative mx-auto inline-flex w-full items-center justify-center rounded-md border border-black/5 bg-white py-2 hover:bg-gray-50 hover:shadow-sm"
          >
            {isHovering ? (
              <BookMarkSolid className="-ml-0.5 h-5 w-5 text-gray-900" />
            ) : (
              <BookMarkOutline className="-ml-0.5 h-5 w-5 text-gray-400" />
            )}
            <span className="ml-2 text-sm text-gray-400 group-hover:text-gray-900">
              {buttonConfig.save}
            </span>
          </button>
        </DialogTrigger>
        <DialogContent className="font-sans sm:max-w-[425px]">
          <LoginSection />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BoomarkButton;
