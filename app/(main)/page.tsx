import PostItem from "@/components/post/post-item";
import { v4 } from "uuid";
import supabase from "@/utils/supabase-server";
import { PostWithCategoryWithAuthor } from "@/types/collection";
import { notFound } from "next/navigation";

export default async function HomePage() {
  const response = await supabase
    .from("posts")
    .select(`*, categories(*), authors(*)`)
    .returns<PostWithCategoryWithAuthor[]>();

  if (!response.data) {
    notFound;
  }

  if (response.error) {
    console.error(response.error.message);
  }

  return (
    <>
      {/* Posts */}
      <div className="space-y-6">
        {response.data?.map((post) => <PostItem key={v4()} post={post} />)}
      </div>
    </>
  );
}
