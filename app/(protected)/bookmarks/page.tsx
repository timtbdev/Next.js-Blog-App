import BookmarkTable from "@/components/protected/bookmark/bookmark-table";
import BookmarkTableHeader from "@/components/protected/bookmark/bookmark-table-header";
import TableEmpty from "@/components/protected/table/table-empty";
import TableWrapper from "@/components/protected/table/table-wrapper";
import Pagination from "@/components/shared/pagination";
import { bookmarkConfig } from "@/config/bookmark";
import { emptyConfig } from "@/config/empty";
import { BookMarkWithPost } from "@/types/collection";
import type { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: bookmarkConfig.title,
  description: bookmarkConfig.description,
};

interface BookmarksPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const BookmarksPage: React.FC<BookmarksPageProps> = async ({
  searchParams,
}) => {
  const supabase = createServerComponentClient<Database>({ cookies });
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
  return (
    <>
      <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
        {data?.length && data?.length > 0 ? (
          <>
            <TableWrapper>
              <BookmarkTableHeader titles={bookmarkConfig.tableHeader} />
              <BookmarkTable bookmarks={data ? data : []} />
            </TableWrapper>
            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                page={page}
                perPage={limit}
                totalItems={count ? count : 0}
                totalPages={totalPages}
                baseUrl="/bookmarks"
                pageUrl="?page="
              />
            )}
          </>
        ) : (
          <TableEmpty
            emptyTitle={emptyConfig.title}
            emptyDescription={emptyConfig.description}
          />
        )}
      </div>
    </>
  );
};

export default BookmarksPage;
