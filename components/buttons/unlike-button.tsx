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
      className="relative inline-flex items-center gap-x-1.5 rounded-l-md p-3 text-sm font-semibold text-gray-900 border-y-[1.5px] border-l-[1.5px] border-gray-300 focus:z-10 bg-gradient-to-t from-gray-200 via-gray-100 to-gray-50 shadow-md shadow-black/5 transition duration-200 hover:bg-gradient-to-tr hover:from-gray-200 hover:via-gray-100 hover:to-gray-50 active:scale-[96%]"
    >
      {isHovering ? (
        <HeartOutline className="-ml-0.5 h-5 w-5 text-gray-400" />
      ) : (
        <HeartSolid className="-ml-0.5 h-5 w-5 text-red-600" />
      )}
      {likes}
    </button>
  );
};

export default UnlikeButton;
