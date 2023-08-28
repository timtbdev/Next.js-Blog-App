'use client';

import { setPostUnlike } from '@/actions/set-post-unlike';
import HeartOutline from '@/components/icons/heart-outline';
import HeartSolid from '@/components/icons/heart-solid';
import { toolbarConfig } from '@/config/toolbar';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

interface UnlikeButtonProps {
    slug?: string;
    likes?: number;
}

const UnlikeButton: React.FC<UnlikeButtonProps> = ({ slug = '', likes = 0 }) => {
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
                    toast.success(toolbarConfig.unliked);
                    router.refresh();
                } else {
                    setUnliking(false);
                    toast.error(toolbarConfig.error);
                }
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="group relative mx-auto inline-flex w-full items-center justify-center rounded-md border border-black/5 bg-white py-2 hover:bg-gray-50 hover:shadow-sm"
        >
            {isHovering ? (
                <HeartOutline className="-ml-0.5 h-5 w-5 text-gray-400" />
            ) : (
                <HeartSolid className="-ml-0.5 h-5 w-5 text-red-600" />
            )}
            <span className="absolute -right-[5px] -top-[10px] rounded-full bg-white px-[4px] text-xs font-semibold text-gray-500 shadow-sm ring-1 ring-black/5">
                {likes}
            </span>
            <span className="ml-2 text-sm text-gray-400 group-hover:text-gray-900">
                {isHovering ? toolbarConfig.unlike : toolbarConfig.liked}
            </span>
        </button>
    );
};

export default UnlikeButton;
