'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface TableEmpty {
    emptyTitle: string;
    emptyDescription: string;
}

const TableEmpty: FC<TableEmpty> = ({ emptyTitle, emptyDescription }) => {
    const router = useRouter();
    return (
        <>
            <main className="grid min-h-full place-items-center rounded-lg border-2 border-dashed border-gray-300 bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">{emptyTitle}</h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">{emptyDescription}.</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <button
                            type="button"
                            onClick={() => {
                                router.back();
                            }}
                            className="rounded-md bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Back
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
};

export default TableEmpty;
