import { cn } from '@/lib/utils';
import React from 'react';
import { v4 } from 'uuid';

interface BookMarkTableHeaderProps {
    titles?: string[];
}

const BookMarkTableHeader: React.FC<BookMarkTableHeaderProps> = ({ titles = [] }) => {
    return (
        <thead className="bg-gray-50">
            <tr>
                {titles.map((title, idx) => (
                    <th
                        key={v4()}
                        scope="col"
                        className={cn(
                            idx === 0 ? 'text-left' : 'text-center',
                            idx === titles.length - 1 ? '' : 'border-r',
                            'text-md py-3.5 pl-4 pr-3 font-semibold text-gray-900 sm:pl-6'
                        )}
                    >
                        {title}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default BookMarkTableHeader;
