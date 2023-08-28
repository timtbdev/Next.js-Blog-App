import React from 'react';

const PostDetailLoading = () => {
    return (
        <div className="bg-gray-100 py-3 min-h-full">
            <div className="mx-auto max-w-7xl px-0 sm:px-8">
                <div className="mx-auto max-w-4xl">
                    <div className="mx-auto max-w-4xl bg-white shadow-sm shadow-gray-300 ring-1 ring-black/5 rounded-lg px-6 sm:px-14 py-4 sm:py-10">
                        <div className="relative mx-auto max-w-4xl py-2">
                            <section className="isolate overflow-hidden mb-5 sm:mb-8 rounded-lg px-6 lg:px-8">
                                <div className="animate-pulse bg-white p-5 rounded-lg text-center max-w-3xl">
                                    <div
                                        role="status"
                                        className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
                                    >
                                        <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                                            <svg
                                                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 18"
                                            >
                                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                            </svg>
                                        </div>
                                        <div className="w-full">
                                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                                        </div>
                                        <span className="sr-only">Loading...</span>
                                    </div>

                                    <div className="h-2.5 bg-gray-300 rounded-full max-w-[640px] mt-5 mb-2.5  "></div>
                                    <div className="h-2.5 bg-gray-300 rounded-full max-w-[540px]"></div>
                                    <div className="h-2.5bg-gray-300 rounded-full max-w-[640px] mt-5 mb-2.5"></div>
                                    <div className="h-2.5 bg-gray-300 rounded-full max-w-[540px]"></div>
                                    <div className="h-2.5 bg-gray-300 rounded-full max-w-[640px] mt-5 mb-2.5"></div>
                                    <div className="h-2.5 bg-gray-300 rounded-full max-w-[540px]"></div>
                                    <div className="h-2.5 bg-gray-300 rounded-full max-w-[640px] mt-5 mb-2.5"></div>
                                    <div className="h-2.5 bg-gray-300 rounded-full max-w-[540px]"></div>
                                    <div className="h-2.5 bg-gray-300 rounded-full max-w-[640px] mt-5 mb-2.5"></div>
                                    <div className="h-2.5 bg-gray-300 rounded-full max-w-[540px]"></div>
                                    <div className="h-2.5 bg-gray-300 rounded-full max-w-[640px] mt-5 mb-2.5"></div>
                                    <div className="h-2.5 bg-gray-300 rounded-full max-w-[540px]"></div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetailLoading;
