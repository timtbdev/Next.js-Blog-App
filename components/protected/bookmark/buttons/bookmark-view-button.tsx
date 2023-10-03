import { bookmarkConfig } from "@/config/bookmark";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";

interface BookMarkViewButtonProps {
  slug?: string;
}

const BookMarkViewButton: FC<BookMarkViewButtonProps> = ({ slug }) => {
  return (
    <Link
      href={`/posts/${slug}`}
      target="_blank"
      className="rounded-md border bg-gray-50 px-3 py-2 text-gray-900 hover:bg-gray-100"
    >
      <EyeIcon className="h-4 w-4" />
    </Link>
  );
};

export default BookMarkViewButton;
