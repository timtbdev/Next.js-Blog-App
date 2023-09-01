import React, { FC } from 'react';
import Image from 'next/image';
import { CalendarIcon, ArchiveIcon, Archive } from 'lucide-react';
import { shimmer } from '@/lib/utils';

interface PostDetailHeadingProps {
    title: string;
    image: string;
    authorImage: string;
    authorName: string;
    date: string;
    category: string;
}

const PostDetailHeading: FC<PostDetailHeadingProps> = ({ title, image, authorName, authorImage, date, category }) => {
    return (
        <section className="flex flex-col items-start justify-between">
            <div className="relative w-full">
                <Image
                    src={image}
                    alt={title}
                    width={512}
                    height={288}
                    className="h-[288px] w-full rounded-2xl bg-gray-100 object-cover"
                    placeholder="blur"
                    blurDataURL={shimmer(512, 288)}
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            </div>
            <div>
                <p className="my-5 overflow-hidden text-xl font-semibold leading-6 text-gray-900">{title}</p>

                <div className="mb-7 flex flex-row items-center text-gray-500">
                    {/* Author */}
                    <div className="flex flex-row items-center pr-3.5">
                        <Image
                            src={authorImage}
                            height={24}
                            width={24}
                            alt={authorName || 'Avatar'}
                            className="flex h-[24px] w-[24px] rounded-full object-cover shadow-sm"
                            priority
                            placeholder="blur"
                            blurDataURL={shimmer(24, 24)}
                        />
                        <div className="ml-2 flex flex-col">
                            <span className="text-md flex font-semibold text-gray-900">{authorName}</span>
                        </div>
                    </div>
                    {/* Date */}
                    <div className="flex space-x-2 border-l border-gray-400 border-opacity-50 pl-3.5 pr-3.5">
                        <p className="mt-0.5">
                            <span className="sr-only">Date</span>
                            <CalendarIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                        </p>
                        <span className="text-sm">{date}</span>
                    </div>
                    {/* Category */}
                    <div className="flex space-x-2 border-l border-gray-400 border-opacity-50 pl-3.5">
                        <p className="mt-0.5">
                            <span className="sr-only">Date</span>
                            <ArchiveIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                        </p>
                        <span className="text-sm">{category}</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PostDetailHeading;
