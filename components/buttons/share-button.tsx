"use client";
import React, { Fragment, useEffect, useState } from "react";
import ShareSolid from "@/components/icons/share-solid";
import ShareOutline from "@/components/icons/share-outline";
import { Dialog, Transition } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Mail, XCircle } from "lucide-react";
import Facebook from "@/components/icons/facebook";
import Twitter from "@/components/icons/twitter";
import LinkedIn from "@/components/icons/linkedin";
import Email from "@/components/icons/email";
import { RWebShare } from "react-web-share";

interface ShareButtonProps {
  title?: string;
  text?: string;
  url?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  title = "",
  text = "",
  url = window.location.href,
}) => {
  const [isHovering, setIsHovered] = React.useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  return (
    <>
      <RWebShare
        data={{
          title: title,
          text: text,
          url: url,
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <button
          type="button"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="relative inline-flex items-center gap-x-1.5 px-3 py-2 border-[1.5px] border-gray-300 focus:z-10 bg-gradient-to-t from-gray-200 via-gray-100 to-gray-50 shadow-md shadow-black/5 transition duration-200 hover:bg-gradient-to-tr hover:from-gray-200 hover:via-gray-100 hover:to-gray-50 active:scale-[96%]"
        >
          {isHovering ? (
            <ShareSolid className="-ml-0.5 h-5 w-5 text-gray-900" />
          ) : (
            <ShareOutline className="-ml-0.5 h-5 w-5 text-gray-400" />
          )}
        </button>
      </RWebShare>
    </>
  );
};

export default ShareButton;
