"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface BackButtonProps {
  className?: string;
  url?: string;
}

const SharedBackButton: React.FC<BackButtonProps> = ({
  className = "",
  url = "/",
}) => {
  const router = useRouter();
  return (
    <button
      type="button"
      className="group relative z-10 inline-flex items-center justify-center space-x-3"
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

export default SharedBackButton;
