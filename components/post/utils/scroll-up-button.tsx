"use client";

import { ArrowUpIcon } from "lucide-react";
import React from "react";
import ScrollToTop from "react-scroll-to-top";

const ScrollUpButton = () => {
  return (
    <ScrollToTop
      style={{ height: "50px", width: "50px", borderRadius: "50%" }}
      smooth
      component={
        <ArrowUpIcon className="h-5 w-5 text-gray-500/70 items-center justify-center mx-auto" />
      }
    />
  );
};

export default ScrollUpButton;
