import {
  ProtectedBookMarkTableColumns,
  ProtectedBookMarkTableTitle,
} from "@/components/protected/bookmark";
import { DataTable } from "@/components/protected/post/table/data-table";
import TableEmpty from "@/components/protected/table/table-empty";
import { detailBookMarkConfig } from "@/config/detail";
import { sharedEmptyConfig } from "@/config/shared";
import { BookMarkWithPost, Post } from "@/types/collection";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: detailBookMarkConfig.title,
  description: detailBookMarkConfig.description,
};

interface BookmarksPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const BookmarksPage: React.FC<BookmarksPageProps> = async ({
  searchParams,
}) => {
  let posts: Post[] = [];
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  // Fetch total pages
  const { count } = await supabase
    .from("bookmarks")
    .select("*", { count: "exact", head: true });

  // Fetch user data
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Pagination
  const limit = 10;
  const totalPages = count ? Math.ceil(count / limit) : 0;
  const page =
    typeof searchParams.page === "string" &&
    +searchParams.page > 1 &&
    +searchParams.page <= totalPages
      ? +searchParams.page
      : 1;
  const from = (page - 1) * limit;
  const to = page ? from + limit : limit;

  // Fetch posts
  const { data, error } = await supabase
    .from("bookmarks")
    .select(`*, posts(*)`)
    .order("created_at", { ascending: false })
    .match({ user_id: user?.id })
    .range(from, to)
    .returns<BookMarkWithPost[]>();

  if (!data || error || !data.length) {
    notFound;
  }

  data?.map((bookmark) => {
    posts.push(bookmark.posts);
  });

  return (
    <>
      <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
        {posts?.length && posts?.length > 0 ? (
          <>
            <ProtectedBookMarkTableTitle />
            <DataTable data={posts} columns={ProtectedBookMarkTableColumns} />
          </>
        ) : (
          <TableEmpty
            emptyTitle={sharedEmptyConfig.title}
            emptyDescription={sharedEmptyConfig.description}
          />
        )}
      </div>
    </>
  );
};

export default BookmarksPage;
