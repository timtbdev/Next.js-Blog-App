import PostCreateButton from "@/components/protected/post/post-create-button";
import React from "react";

interface TableTitleProps {
  title?: string;
  description?: string;
  isPost?: boolean;
}

const TableTitle: React.FC<TableTitleProps> = ({
  title = "",
  description = "",
  isPost = false,
}) => {
  return (
    <>
      <div className="flex flex-row">
        <div className="flex-none items-center justify-start">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            {title}
          </h1>
          <p className="mt-2 text-sm text-gray-700">{description}</p>
        </div>
        <div className="flex-grow"></div>
        <div className="flex-none items-center justify-end">
          {isPost && <PostCreateButton />}
        </div>
      </div>
    </>
  );
};

export default TableTitle;
