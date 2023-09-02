'use client';

import SavePostButton from '@/components/buttons/save-post-button';
import CommentButton from '@/components/buttons/comment-button';
import ShareButton from '@/components/buttons/share-button';
import React from 'react';

interface PostFloatingBarProps {
    id: string;
    title?: string;
    text?: string;
    url?: string;
    totalComments?: number;
    saved?: boolean;
}

const PostFloatingBar: React.FC<PostFloatingBarProps> = ({
    id,
    title = '',
    text = '',
    url = window.location.href,
    totalComments = 0,
    saved = false,
}) => {
    return (
        <>
            <div className="grid w-full grid-cols-3 justify-start gap-4 rounded-md">
                <CommentButton totalComments={totalComments} />
                <SavePostButton id={id} saved={saved} />
                <ShareButton title={title} text={text} url={url} />
            </div>
        </>
    );
};

export default PostFloatingBar;
