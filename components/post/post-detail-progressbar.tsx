"use client";
import React from "react";
import { motion, useScroll } from "framer-motion";

const PostDetailProgressBar = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed z-50 top-0 left-0 right-0 w-full h-[3px] bg-sky-500 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default PostDetailProgressBar;
