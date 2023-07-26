"use client";

import { buttonConfig } from "@/config/buttons";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface BackButtonProps {
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ className = "" }) => {
  const router = useRouter();
  return (
    // <button
    //   type="button"
    //   onClick={() => {
    //     if (window.history.state && window.history.state.idx > 0) {
    //       router.back();
    //     } else {
    //       router.push("/");
    //     }
    //   }}
    //   className={cn(
    //     "group flex p-2 items-center justify-center rounded-full bg-gradient-to-t from-gray-200 via-gray-100 to-gray-50 text-gray-400 shadow-md shadow-black/5 ring-1 ring-black/10 transition duration-200 hover:bg-gradient-to-tr hover:from-gray-200 hover:via-gray-100 hover:to-gray-50 active:scale-[96%] active:ring-black/20",
    //     className
    //   )}
    // >
    //   <ArrowLeftIcon className="h-[20px] w-[20px] text-gray-600" />
    // </button>

    <button
      type="button"
      className="group relative z-10 ml-10 inline-flex items-center justify-center space-x-3"
      onClick={() => {
        if (window.history.state && window.history.state.idx > 0) {
          router.back();
        } else {
          router.push("/");
        }
      }}
    >
      <div className="rounded-full border border-slate-300 bg-slate-50 p-2.5 shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          aria-hidden="true"
          className="h-5 w-5 text-slate-500 group-hover:text-slate-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
      </div>
    </button>
  );
};

export default BackButton;
