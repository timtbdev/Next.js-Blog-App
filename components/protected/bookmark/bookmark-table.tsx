'use client';

import BookmarkDeleteButton from '@/components/protected/bookmark/bookmark-delete-button';
import { BookMarkWithPost } from '@/types/collection';
import { format } from 'date-fns';
import React from 'react';
import { v4 } from 'uuid';

interface BookmarkTableProps {
    bookmarks?: BookMarkWithPost[];
}

const BookmarkTable: React.FC<BookmarkTableProps> = ({ bookmarks }) => {
    return (
        <>
            <tbody className="divide-y divide-gray-200 bg-white">
                {bookmarks &&
                    bookmarks.map((bookmark) => (
                        <tr key={v4()}>
                            <td className="whitespace-nowrap border-r py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                {bookmark.posts?.title}
                            </td>
                            <td className="whitespace-nowrap border-r px-3 py-4 text-center text-sm text-gray-500">
                                {bookmark.posts?.created_at
                                    ? format(new Date(bookmark.posts?.created_at), 'yyyy-MM-dd')
                                    : ''}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
                                <BookmarkDeleteButton id={bookmark.posts?.id} />
                            </td>
                        </tr>
                    ))}
            </tbody>
        </>
    );
};

export default BookmarkTable;
