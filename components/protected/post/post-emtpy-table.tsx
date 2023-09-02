'use client';

import { useRouter } from 'next/navigation';
import { emptyConfig } from '@/config/empty';
import { postConfig } from '@/config/post';
import { PlusIcon } from 'lucide-react';

const PostTableEmpty = () => {
    const router = useRouter();
    return (
        <>
            <main className="grid min-h-full place-items-center rounded-lg border-2 border-dashed border-gray-300 bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        {emptyConfig.title}
                    </h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">{emptyConfig.description}.</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <button
                            type="button"
                            onClick={() => {
                                router.back();
                            }}
                            className="flex flex-row items-center rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600"
                        >
                            <PlusIcon className="mr-2 h-4 w-5" />
                            {postConfig.newPost}
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
};

export default PostTableEmpty;
