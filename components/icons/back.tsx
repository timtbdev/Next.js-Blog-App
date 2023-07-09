"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const BackIcon = () => {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => {
        if (window.history.state && window.history.state.idx > 0) {
          router.back();
        } else {
          router.push("/");
        }
      }}
      className="group flex p-2 items-center justify-center rounded-full bg-gradient-to-t from-gray-200 via-gray-100 to-gray-50 text-gray-400 shadow-md shadow-black/5 ring-1 ring-black/10 transition duration-200 hover:bg-gradient-to-tr hover:from-gray-200 hover:via-gray-100 hover:to-gray-50 active:scale-[96%] active:ring-black/20"
    >
      <ArrowLeftIcon className="h-[20px] w-[20px] text-gray-600" />
    </button>
  );
};

export default BackIcon;
