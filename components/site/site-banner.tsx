import GithubIcon from "@/components/icons/github-contact-icon";
import { bannerConfig } from "@/config/site";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const SiteBanner = () => {
  return (
    <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      <div
        className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
          }}
        />
      </div>
      <div
        className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
          }}
        />
      </div>
      <div className="mx-auto hidden w-full items-center justify-center gap-x-2 md:flex">
        <p className="text-sm font-semibold leading-6 text-gray-900">
          {bannerConfig.title}
        </p>
        <p className="text-sm leading-6 text-gray-900">
          {bannerConfig.description}
        </p>
        <Link
          href={bannerConfig.link}
          target="_blank"
          className="inline-flex items-center rounded-full bg-gray-900 px-3.5 py-1 text-sm text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          <GithubIcon className="mr-1 h-4 w-4" />
          {bannerConfig.button}
        </Link>
      </div>
      <div className="mx-auto w-full gap-2 text-center md:hidden">
        <p className="text-sm font-semibold leading-6 text-gray-900">
          {bannerConfig.title}
        </p>
        <p className="text-sm leading-6 text-gray-900">
          {bannerConfig.description}
        </p>
        <Link
          href={bannerConfig.link}
          target="_blank"
          className="inline-flex items-center rounded-full bg-gray-900 px-3.5 py-1 text-sm text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          <GithubIcon className="mr-1 h-4 w-4" />
          {bannerConfig.button}
        </Link>
      </div>
    </div>
  );
};

export default SiteBanner;
