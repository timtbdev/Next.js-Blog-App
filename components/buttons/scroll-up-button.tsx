"use client";

import { ArrowUpIcon } from "lucide-react";
import React from "react";
import ScrollToTop from "react-scroll-to-top";

const ScrollUpButton = () => {
  return (
    <ScrollToTop
      style={{
        height: "45px",
        width: "45px",
        borderRadius: "50%",
      }}
      className="items-center justify-center rounded-full !ring-1 !ring-black/5 bg-gradient-to-t from-gray-200 via-gray-100 to-gray-50 text-gray-400 shadow-md shadow-black/5 transition duration-200 hover:bg-gradient-to-tr hover:from-gray-200 hover:via-gray-100 hover:to-gray-50 active:scale-[96%] active:ring-black/20"
      smooth
      component={
        <ArrowUpIcon className="h-5 w-5 text-gray-500/70 items-center justify-center mx-auto" />
      }
    />
  );
};

export default ScrollUpButton;
