import { cn } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { v4 } from "uuid";

export interface SharedPagerProps {
  index: number;
  totalPages: number;
  currentPage: number;
  baseUrl: string;
  pageUrl: string;
}

const SharedPager: React.FC<SharedPagerProps> = ({
  index,
  totalPages,
  currentPage,
  baseUrl,
  pageUrl,
}) => {
  const i = index + 1;
  if (
    i <= 3 || //the first three pages
    i >= totalPages - 2 || //the last three pages
    (i >= currentPage - 1 && i <= currentPage + 1)
  ) {
    //the currentPage, the page before and after
    return (
      <Link
        href={baseUrl + pageUrl + i.toString()}
        key={v4()}
        className={cn(
          "inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700",
          { "border-gray-300": i === currentPage },
        )}
      >
        {i}
      </Link>
    );
  }

  return (
    //any other page should be represented by ...
    <div className="inline-flex items-center border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:text-gray-700">
      ...
    </div>
  );
};

export default SharedPager;
