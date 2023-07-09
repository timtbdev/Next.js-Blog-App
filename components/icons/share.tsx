"use client";

import { Share2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { RWebShare } from "react-web-share";

interface ShareProps {
  title: string;
  description: string;
  url: string;
}

const ShareIcon: React.FC<ShareProps> = ({ title, description, url }) => {
  const router = useRouter();
  return (
    <RWebShare
      data={{
        text: description,
        url: url,
        title: title,
      }}
      onClick={() => console.log("Амжилттай")}
    >
      <button
        type="button"
        className="group flex p-2 items-center justify-center rounded-full bg-gradient-to-t from-gray-200 via-gray-100 to-gray-50 text-gray-400 shadow-md shadow-black/5 ring-1 ring-black/10 transition duration-200 hover:bg-gradient-to-tr hover:from-gray-200 hover:via-gray-100 hover:to-gray-50 active:scale-[96%] active:ring-black/20"
      >
        <Share2Icon className="h-[20px] w-[20px] text-gray-600" />
      </button>
    </RWebShare>
  );
};

export default ShareIcon;
