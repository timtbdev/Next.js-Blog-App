import PostDetailHeader from "@/components/post/post-detail-header";
import supabase from "@/utils/supabase-server";
import { PostWithCategoryWithAuthor } from "@/types/collection";

import { notFound } from "next/navigation";

async function getPost(params: { slug: string[] }) {
  const slug = params?.slug?.join("/");

  if (!slug) {
    notFound;
  }

  const response = await supabase
    .from("posts")
    .select(`*, categories(*), authors(*)`)
    .eq("slug", slug)
    .single<PostWithCategoryWithAuthor>();

  if (!response.data) {
    notFound;
  }

  return response.data;
}

export default async function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    slug: string[];
  };
}) {
  const post = await getPost(params);

  if (!post) {
    notFound();
  }
  return (
    <>
      <PostDetailHeader
        title={post.title as string}
        author={post.authors?.name as string}
        year={post.year as string}
        description={post.description as string}
        slug={post.slug as string}
      />
      <div className="bg-gray-100 py-3 min-h-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">{children}</div>
        </div>
      </div>
    </>
  );
}
