import { MousePointerClickIcon } from "lucide-react";
import Link from "next/link";

const MainBanner = () => {
  return (
    <div className="mx-auto max-w-full items-center bg-gray-50 py-2 text-center">
      <div className="hidden items-center gap-x-1 rounded-full bg-gray-200 px-3.5 py-2 text-sm text-gray-800 shadow-sm sm:inline-flex">
        <p className="font-semibold">👋 Hey, I’m Tim.</p>
        <p>I built this with</p>
        <p className="font-semibold">Next.js & Supabase.</p>
        <p>Need dev? Let&apos;s chat!</p>
        <Link
          href="https://timtb.dev"
          target="_blank"
          className="inline-flex items-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 px-3 py-0.5 text-sm text-white shadow-md ring-2 ring-transparent hover:from-blue-500 hover:to-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          <MousePointerClickIcon className="mr-1 size-4" />
          Click here
        </Link>
      </div>
      <div className="flex-row items-center gap-x-1 gap-y-2 px-3.5 py-2 text-sm text-gray-800 shadow-sm lg:hidden">
        <p className="font-semibold">👋 Hey, I’m Tim.</p>
        <p>
          I built this with{" "}
          <span className="font-semibold">Next.js & Supabase.</span>
        </p>
        <p>Need dev? Let&apos;s chat!</p>
        <Link
          href="https://timtb.dev"
          target="_blank"
          className="mt-2 inline-flex items-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 px-3 py-0.5 text-sm text-white shadow-md ring-2 ring-transparent hover:from-blue-500 hover:to-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          <MousePointerClickIcon className="mr-1 size-4" />
          Click here
        </Link>
      </div>
    </div>
  );
};

export default MainBanner;
