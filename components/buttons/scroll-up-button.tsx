"use client";

import React, { useEffect } from "react";
import { ArrowUpIcon } from "lucide-react";
import ScrollToTop from "react-scroll-to-top";

const ScrollUpButton = () => {
  return (
    <>
      <ScrollToTop
        style={{
          height: "45px",
          width: "45px",
          borderRadius: "10%",
        }}
        className="items-center justify-center !ring-[1.5px] !ring-gray-300 shadow-sm bg-gradient-to-t from-gray-200 via-gray-100 to-gray-50 text-gray-400 transition duration-200 hover:bg-gradient-to-tr hover:from-gray-200 hover:via-gray-100 hover:to-gray-50 active:scale-[96%] active:ring-black/20"
        smooth
        component={
          <ArrowUpIcon className="h-5 w-5 text-gray-500/70 items-center justify-center mx-auto" />
        }
      />
    </>
  );
};

export default ScrollUpButton;
