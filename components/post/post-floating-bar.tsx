'use client';

import BoomarkButton from '@/components/buttons/bookmark-button';
import CommentButton from '@/components/buttons/comment-button';
import LikeButton from '@/components/buttons/like-button';
import ShareButton from '@/components/buttons/share-button';
import React from 'react';

interface PostFloatingBarProps {
    id: string;
    title?: string;
    text?: string;
    url?: string;
    slug?: string;
    totalLikes?: number;
    liked?: boolean;
    totalComments?: number;
    bookmarked?: boolean;
}

const PostFloatingBar: React.FC<PostFloatingBarProps> = ({
    id,
    title = '',
    text = '',
    url = window.location.href,
    slug = '',
    totalLikes = 0,
    liked = false,
    totalComments = 0,
    bookmarked = false,
}) => {
    return (
        <>
            <div className="grid w-full grid-cols-2 justify-start gap-4 rounded-md md:grid-cols-2 lg:grid-cols-4">
                <LikeButton id={id} liked={liked} totalLikes={totalLikes} />
                <CommentButton totalComments={totalComments} />
                <BoomarkButton id={id} bookmarked={bookmarked} />
                <ShareButton title={title} text={text} url={url} />
            </div>
        </>
    );
};

export default PostFloatingBar;
