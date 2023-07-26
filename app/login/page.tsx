"use client";

import LoginSection from "@/components/login/login-section";
import { buttonConfig } from "@/config/buttons";
import React from "react";

const LoginPage = () => {
  return (
    <>
      <nav className="border-y-1 sticky top-0 z-50 mx-auto items-center justify-between border-black/5 bg-gray-50 px-2 py-4 shadow-sm shadow-gray-300 !backdrop-blur-sm backdrop-opacity-10">
        <a
          className="group relative z-10 ml-10 inline-flex items-center justify-center space-x-3"
          href="/"
        >
          <div className="rounded-full border border-slate-300 bg-slate-50 p-1.5 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
              className="h-4 w-4 text-slate-500 group-hover:text-slate-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </div>
          <span className="text-sm text-slate-500 group-hover:text-slate-700">
            {buttonConfig.back}
          </span>
        </a>
      </nav>
      <LoginSection />
    </>
  );
};

export default LoginPage;
