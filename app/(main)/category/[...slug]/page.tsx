import React from "react";
import { menus } from "@/config/menu";
import notFound from "next/navigation";
import supabase from "@/utils/supabase-server";
import { PostWithCategoryWithAuthor } from "@/types/collection";
import { Metadata } from "next";
import { metaData } from "@/config/meta";
import { getOgImageUrl } from "@/lib/utils";
import { SiteEmpty } from "@/components/site/site-empty";
import PostItem from "@/components/post/post-item";
import { v4 } from "uuid";

interface CategoryPageProps {
  params: {
    slug: string[];
  };
}

async function getPosts(params: { slug: string[] }) {
  const slug = params?.slug?.join("/");
  const category = menus.find((menu) => menu.slug === slug);

  if (!category) {
    notFound;
  }

  const response = await supabase
    .from("post")
    .select(`*, category(*), author(*)`)
    .eq("category_id", category?.id)
    .returns<PostWithCategoryWithAuthor[]>();

  if (!response.data) {
    null;
  }

  return response.data;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const slug = params?.slug?.join("/");
  const category = menus.find((menu) => menu.slug === slug);

  if (!category) {
    return {};
  }

  return {
    title: category?.title,
    description: metaData.absoluteTitle,
    authors: {
      name: metaData.author.name,
      url: metaData.author.twitterUrl,
    },
    openGraph: {
      title: category?.title,
      description: metaData.absoluteTitle,
      type: "article",
      url: `${process.env.NEXT_PUBLIC_APP_URL}${category?.slug}`,
      images: [
        {
          url: getOgImageUrl(
            category?.title,
            metaData.absoluteTitle,
            metaData.tags,
            category?.slug
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
      description: metaData.absoluteTitle,
      images: [
        getOgImageUrl(
          category?.title,
          metaData.absoluteTitle,
          metaData.tags,
          category?.slug
        ),
      ],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const posts = await getPosts(params);

  return (
    <>
      {/* Posts */}
      <div className="my-5 space-y-6">
        {posts?.length === 0 ? (
          <SiteEmpty />
        ) : (
          posts?.map((post) => <PostItem key={v4()} post={post} />)
        )}
      </div>
    </>
  );
}
