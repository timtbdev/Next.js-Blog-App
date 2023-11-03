import { MainPostItem } from "@/components/main";
import { SharedEmpty, SharedPagination } from "@/components/shared";
import { mainCategoryConfig } from "@/config/main";
import { seoData } from "@/config/root/seo";
import { getOgImageUrl, getUrl } from "@/lib/utils";
import { PostWithCategoryWithProfile } from "@/types/collection";
import type { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { cookies } from "next/headers";
import notFound from "next/navigation";
import React from "react";
import { v4 } from "uuid";

interface CategoryPageProps {
  params: {
    slug: string[];
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const slug = params?.slug?.join("/");
  const category = mainCategoryConfig.find(
    (category) => category.slug === slug,
  );

  if (!category) {
    return {};
  }

  return {
    title: category?.title,
    description: seoData.absoluteTitle,
    authors: {
      name: seoData.author.name,
      url: seoData.author.twitterUrl,
    },
    openGraph: {
      title: category?.title,
      description: seoData.absoluteTitle,
      type: "article",
      url: `${getUrl()}${category?.slug}`,
      images: [
        {
          url: getOgImageUrl(
            category?.title,
            seoData.absoluteTitle,
            seoData.tags,
            category?.slug,
          ),
          width: 1200,
          height: 630,
          alt: category?.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: category?.title,
      description: seoData.absoluteTitle,
      images: [
        getOgImageUrl(
          category?.title,
          seoData.absoluteTitle,
          seoData.tags,
          category?.slug,
        ),
      ],
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  // Get category by slug
  const slug = params?.slug?.join("/");
  const category = mainCategoryConfig.find(
    (category) => category.slug === slug,
  );
  // Fetch total pages
  const { count } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true })
    .eq("category_id", category?.id ? category?.id : "");

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

  if (!category) {
    notFound;
  }

  const { data, error } = await supabase
    .from("posts")
    .select(`*, categories(*), profiles(*)`)
    .match({ category_id: category?.id, published: true })
    .order("created_at", { ascending: false })
    .range(from, to)
    .returns<PostWithCategoryWithProfile[]>();

  if (!data || error || !data.length) {
    notFound;
  }

  return (
    <>
      {/* Posts */}
      <div className="my-5 space-y-6">
        {data?.length === 0 ? (
          <SharedEmpty />
        ) : (
          data?.map((post) => <MainPostItem key={v4()} post={post} />)
        )}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <SharedPagination
          page={page}
          totalPages={totalPages}
          baseUrl={`/category/${slug}`}
          pageUrl="?page="
        />
      )}
    </>
  );
}
