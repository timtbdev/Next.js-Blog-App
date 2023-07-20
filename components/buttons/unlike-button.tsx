"use client";
import React, { useEffect } from "react";
import HeartOutline from "@/components/icons/heart-outline";
import HeartSolid from "@/components/icons/heart-solid";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { setPostUnlike } from "@/actions/set-post-unlike";

interface UnlikeButtonProps {
  slug?: string;
  likes?: number;
}

const UnlikeButton: React.FC<UnlikeButtonProps> = ({
  slug = "",
  likes = 0,
}) => {
  const [isHovering, setIsHovered] = React.useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);
  const [unliking, setUnliking] = React.useState(false);
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={unliking}
      onClick={async () => {
        setUnliking(true);
        const response = await setPostUnlike(slug);
        if (response) {
          setUnliking(false);
          toast.success("Амжилттай");
          router.refresh();
        } else {
          setUnliking(false);
          toast.error("Алдаа гарлаа");
        }
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group relative inline-flex items-center mx-auto py-2 justify-center rounded-md border border-black/5 w-full bg-white hover:bg-gray-50 hover:shadow-sm"
    >
      {isHovering ? (
        <HeartOutline className="-ml-0.5 h-5 w-5 text-gray-400" />
      ) : (
        <HeartSolid className="-ml-0.5 h-5 w-5 text-red-600" />
      )}
      <span className="absolute -top-[10px] -right-[5px] font-semibold text-xs text-gray-500 bg-white rounded-full ring-1 ring-black/5 shadow-sm px-[4px]">
        {likes}
      </span>
      <span className="ml-2 text-sm text-gray-400 group-hover:text-gray-900">
        Unlike
      </span>
    </button>
  );
};

export default UnlikeButton;
