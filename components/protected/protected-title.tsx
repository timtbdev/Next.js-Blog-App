import React from 'react';
import PostCreateButton from './post/post-create-button';

interface ProtectedTitleProps {
    title?: string;
    description?: string;
    isPost?: boolean;
}

const ProtectedTitle: React.FC<ProtectedTitleProps> = ({ title = '', description = '', isPost = false }) => {
    return (
        <>
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">{title}</h1>
                    <p className="mt-2 text-sm text-gray-700">{description}</p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">{isPost && <PostCreateButton />}</div>
            </div>
        </>
    );
};

export default ProtectedTitle;
