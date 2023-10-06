import React from "react";

const PostDetailLoading = () => {
  return (
    <div className="min-h-full bg-gray-100 py-3">
      <div className="mx-auto max-w-7xl px-0 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto max-w-4xl rounded-lg bg-white px-6 py-4 shadow-sm shadow-gray-300 ring-1 ring-black/5 sm:px-14 sm:py-10">
            <div className="relative mx-auto max-w-4xl py-2">
              <section className="isolate mb-5 overflow-hidden rounded-lg px-6 sm:mb-8 lg:px-8">
                <div className="max-w-3xl animate-pulse rounded-lg bg-white p-5 text-center">
                  <div
                    role="status"
                    className="animate-pulse space-y-8 md:flex md:items-center md:space-x-8 md:space-y-0"
                  >
                    <div className="w-[392px]md:h-[288px] flex h-[221px] flex-1 items-center justify-center rounded bg-gray-300 dark:bg-gray-700 sm:w-full md:w-[512px]">
                      <svg
                        className="h-10 w-10 text-gray-200 dark:text-gray-600"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18"
                      >
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                      </svg>
                    </div>
                    <span className="sr-only">Loading...</span>
                  </div>
                  <div className="mt-4 flex items-center space-x-3">
                    <svg
                      className="h-10 w-10 text-gray-200 dark:text-gray-700"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                    <div>
                      <div className="mb-2 h-2.5 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                      <div className="h-2 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                  </div>

                  <div className="mb-2.5 mt-5 h-2.5 max-w-[640px] rounded-full bg-gray-300  "></div>
                  <div className="h-2.5 max-w-[540px] rounded-full bg-gray-300"></div>
                  <div className="h-2.5bg-gray-300 mb-2.5 mt-5 max-w-[640px] rounded-full"></div>
                  <div className="h-2.5 max-w-[540px] rounded-full bg-gray-300"></div>
                  <div className="mb-2.5 mt-5 h-2.5 max-w-[640px] rounded-full bg-gray-300"></div>
                  <div className="h-2.5 max-w-[540px] rounded-full bg-gray-300"></div>
                  <div className="mb-2.5 mt-5 h-2.5 max-w-[640px] rounded-full bg-gray-300"></div>
                  <div className="h-2.5 max-w-[540px] rounded-full bg-gray-300"></div>
                  <div className="mb-2.5 mt-5 h-2.5 max-w-[640px] rounded-full bg-gray-300"></div>
                  <div className="h-2.5 max-w-[540px] rounded-full bg-gray-300"></div>
                  <div className="mb-2.5 mt-5 h-2.5 max-w-[640px] rounded-full bg-gray-300"></div>
                  <div className="h-2.5 max-w-[540px] rounded-full bg-gray-300"></div>
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
