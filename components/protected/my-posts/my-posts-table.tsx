'use client';

import MyPostDeleteButton from '@/components/protected/my-posts/my-posts-delete-button';
import { Post } from '@/types/collection';
import { format } from 'date-fns';
import React from 'react';
import { v4 } from 'uuid';

interface MyPostsTableProps {
    myPosts?: Post[];
}

const MyPostsTable: React.FC<MyPostsTableProps> = ({ myPosts }) => {
    return (
        <>
            <tbody className="divide-y divide-gray-200 bg-white">
                {myPosts &&
                    myPosts.map((myPost) => (
                        <tr key={v4()}>
                            <td className="whitespace-nowrap border-r py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                {myPost.title}
                            </td>
                            <td className="whitespace-nowrap border-r px-3 py-4 text-center text-sm text-gray-500">
                                {myPost.created_at ? format(new Date(myPost.created_at), 'yyyy-MM-dd') : ''}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
                                <MyPostDeleteButton id={myPost.id} />
                            </td>
                        </tr>
                    ))}
            </tbody>
        </>
    );
};

export default MyPostsTable;
