import PostItem from "@/components/post/post-item";
import Pagination from "@/components/shared/pagination";
import { PostWithCategoryWithProfile } from "@/types/collection";
import type { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { v4 } from "uuid";

interface HomePageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const supabase = createServerComponentClient<Database>({ cookies });
  // Fetch total pages
  const { count } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true });

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
    .from("posts")
    .select(`*, categories(*), profiles(*)`)
    .eq("published", true)
    .order("created_at", { ascending: false })
    .range(from, to)
    .returns<PostWithCategoryWithProfile[]>();

  if (!data || error || !data.length) {
    notFound;
  }

  return (
    <>
      <div className="space-y-6">
        {data?.map((post) => <PostItem key={v4()} post={post} />)}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          page={page}
          perPage={limit}
          totalItems={count ? count : 0}
          totalPages={totalPages}
          baseUrl="/"
          pageUrl="?page="
        />
      )}
    </>
  );
}
