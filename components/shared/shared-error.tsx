"use client";

import { sharedEmptyConfig } from "@/config/shared";
import { useRouter } from "next/navigation";

const SharedError = () => {
  const router = useRouter();

  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-gray-900">
          {sharedEmptyConfig.sorry}
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {sharedEmptyConfig.error}
        </h1>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            type="button"
            onClick={() => router.refresh()}
            className="rounded-md bg-gray-200 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-300"
          >
            {sharedEmptyConfig.tryAgain}
          </button>
        </div>
      </div>
    </main>
  );
};

export default SharedError;
