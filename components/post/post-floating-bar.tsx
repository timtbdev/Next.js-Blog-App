'use client';

import BookmarkButton from '@/components/buttons/bookmark-button';
import CommentButton from '@/components/buttons/comment-button';
import ShareButton from '@/components/buttons/share-button';
import React from 'react';

interface PostFloatingBarProps {
    id: string;
    title?: string;
    text?: string;
    url?: string;
    totalComments?: number;
    isBookmarked?: boolean;
}

const PostFloatingBar: React.FC<PostFloatingBarProps> = ({
    id,
    title = '',
    text = '',
    url = window.location.href,
    totalComments = 0,
    isBookmarked = false,
}) => {
    return (
        <>
            <div className="grid w-full grid-cols-3 justify-start gap-4 rounded-md">
                <CommentButton totalComments={totalComments} />
                <BookmarkButton id={id} isBookmarked={isBookmarked} />
                <ShareButton title={title} text={text} url={url} />
            </div>
        </>
    );
};

export default PostFloatingBar;
