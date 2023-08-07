import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { v4 } from "uuid";

export interface PagerProps {
  totalPages: number;
  currentPage: number;
  baseUrl: string;
  pageUrl: string;
}

const Pager: React.FC<PagerProps> = ({
  totalPages,
  currentPage,
  baseUrl,
  pageUrl,
}) => {
  let pagination = [],
    index = 1;

  while (index <= totalPages) {
    if (
      index <= 3 || //the first three pages
      index >= totalPages - 2 || //the last three pages
      (index >= currentPage - 1 && index <= currentPage + 1)
    ) {
      //the currentPage, the page before and after
      pagination.push(
        <Link
          key={v4()}
          href={baseUrl + pageUrl + index.toString()}
          className={cn(
            "inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700",
            { "border-gray-300": index === currentPage },
          )}
        >
          {index}
        </Link>,
      );
      index++;
    } else {
      //any other page should be represented by ...
      pagination.push(
        <div className="inline-flex items-center border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:text-gray-700">
          ...
        </div>,
      );
      //jump to the next page to be linked in the navigation
      index = index < currentPage ? currentPage - 1 : totalPages - 2;
    }
  }
  return pagination;
};

export default Pager;
