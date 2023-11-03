"use client";

import { LoginMenu } from "@/components/login";
import { SharedBackButton } from "@/components/shared";
import { useReadingProgress } from "@/hooks/use-reading-progress";

interface DetailPostHeaderProps {
  title: string;
}

const DetailPostHeader: React.FC<DetailPostHeaderProps> = ({ title }) => {
  const completion = useReadingProgress();
  return (
    <header className="border-y-1 sticky top-0 z-40 border-black/5 bg-gray-50/60 shadow-sm shadow-gray-300 backdrop-blur-lg">
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4"
        aria-label="Global"
      >
        <div className="flex flex-none items-center justify-start">
          <SharedBackButton />
        </div>
        <div className="flex w-full max-w-3xl">
          <h1 className="text-md justify-start px-4 font-semibold tracking-tight text-slate-900 sm:px-0 sm:text-xl">
            {title}
          </h1>
        </div>
        <div className="flex flex-none items-center justify-end">
          <LoginMenu />
        </div>
      </nav>
      <span
        style={{ transform: `translateX(${completion - 100}%)` }}
        className="absolute bottom-0 h-1 w-full bg-gray-400"
      />
    </header>
  );
};

export default DetailPostHeader;
