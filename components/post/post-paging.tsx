import Link from "next/link";
import { FC } from "react";

interface PostPagingProps {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  baseUrl: string;
  pageUrl: string;
}

const PostPaging: FC<PostPagingProps> = ({
  page,
  perPage,
  totalItems,
  totalPages,
  baseUrl,
  pageUrl,
}) => {
  return (
    <div className="mt-4 flex items-center justify-between">
      <p className="text-sm text-gray-700">
        Showing <span className="font-medium">{(page - 1) * perPage + 1}</span>{" "}
        to{" "}
        <span className="font-medium">
          {Math.min(page * perPage, totalItems)}
        </span>{" "}
        of <span className="font-medium">{totalItems}</span> projects
      </p>
      <div className="space-x-2">
        <Link
          href={page > 2 ? baseUrl + pageUrl : baseUrl}
          className={`${
            page === 1 ? "pointer-events-none opacity-50" : ""
          } inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50`}
        >
          Previous
        </Link>
        <Link
          href={
            page < totalPages
              ? baseUrl + pageUrl + (page + 1).toString()
              : baseUrl + pageUrl + page.toString()
          }
          className={`${
            page >= totalPages ? "pointer-events-none opacity-50" : ""
          } inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50`}
        >
          Next
        </Link>
      </div>
    </div>
  );
};

export default PostPaging;
