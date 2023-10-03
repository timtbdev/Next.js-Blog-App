import PostTableEmpty from "@/components/protected/post/post-emtpy-table";
import PostRefreshOnce from "@/components/protected/post/post-refresh-once";
import PostTableTitle from "@/components/protected/post/post-table-title";
import { columns } from "@/components/protected/post/table/columns";
import { DataTable } from "@/components/protected/post/table/data-table";
import { postConfig } from "@/config/post";
import { Draft } from "@/types/collection";
import type { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { FC } from "react";

export const revalidate = 0;

export const metadata: Metadata = {
  title: postConfig.title,
  description: postConfig.description,
};

interface PostsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const PostsPage: FC<PostsPageProps> = async ({ searchParams }) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  // Fetch user data
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch posts
  const { data, error } = await supabase
    .from("drafts")
    .select(`*, categories(*)`)
    .order("created_at", { ascending: false })
    .match({ author_id: user?.id })
    .returns<Draft[]>();

  if (!data || error || !data.length) {
    notFound;
  }
  return (
    <>
      <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
        {data?.length && data?.length > 0 ? (
          <>
            <PostTableTitle />
            <DataTable data={data ? data : []} columns={columns} />
          </>
        ) : (
          <PostTableEmpty />
        )}
        <PostRefreshOnce />
      </div>
    </>
  );
};

export default PostsPage;
