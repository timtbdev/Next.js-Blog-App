import BookMarkTable from "@/components/dashboard/bookmark/bookmark-table";
import BookMarkTableHeader from "@/components/dashboard/bookmark/bookmark-table-header";
import DashBoardTableWrapper from "@/components/dashboard/dashboard-table-wrapper";
import DashBoardTitle from "@/components/dashboard/dashboard-title";
import { bookMarkConfig } from "@/config/bookmark";
import { generateFakePosts } from "@/lib/utils";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: bookMarkConfig.title,
  description: bookMarkConfig.description,
};

const BookMarkPage = () => {
  const posts = generateFakePosts(100);
  return (
    <>
      <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
        <DashBoardTitle title={bookMarkConfig.title} />
        <DashBoardTableWrapper>
          <BookMarkTableHeader titles={bookMarkConfig.tableHeader} />
          {/* <BookMarkTable posts={posts} /> */}
        </DashBoardTableWrapper>
      </div>
    </>
  );
};

export default BookMarkPage;
