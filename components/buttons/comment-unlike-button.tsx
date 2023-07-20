"use client";
import React, { useEffect } from "react";
import ThumbDownOutline from "@/components/icons/thumb-down-outline";
import ThumbDownSolid from "@/components/icons/thumb-down-solid";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { setPostLike } from "@/actions/set-post-like";

interface CommentUnLikeButtonProps {
  slug?: string;
  likes?: number;
}

const CommentUnLikeButton: React.FC<CommentUnLikeButtonProps> = ({
  slug = "",
  likes = 0,
}) => {
  const [isHovering, setIsHovered] = React.useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);
  const [liking, setLiking] = React.useState(false);
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={liking}
      onClick={async () => {
        setLiking(true);
        const response = await setPostLike(slug);
        if (response) {
          setLiking(false);
          toast.success("Баярлалаа");
          router.refresh();
        } else {
          setLiking(false);
          toast.error("Та өмнө нь зүрх дарсан байна.");
        }
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group relative inline-flex items-center py-1 px-2 rounded-full bg-white hover:bg-gray-100"
    >
      {isHovering ? (
        <ThumbDownSolid className="-ml-0.5 h-5 w-5 text-gray-900" />
      ) : (
        <ThumbDownOutline className="-ml-0.5 h-5 w-5 text-gray-400" />
      )}
      <span className="ml-2 text-sm text-gray-400 group-hover:text-gray-900">
        {likes}
      </span>
    </button>
  );
};

export default CommentUnLikeButton;
