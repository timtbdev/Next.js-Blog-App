import { GetBookmark } from "@/actions/bookmark/get-bookmark";
import {
  DetailPostComment,
  DetailPostFloatingBar,
  DetailPostHeading,
} from "@/components/detail/post";
import { DetailPostScrollUpButton } from "@/components/detail/post/buttons";
import { seoData } from "@/config/root/seo";
import { getOgImageUrl, getUrl } from "@/lib/utils";
import {
  CommentWithProfile,
  PostWithCategoryWithProfile,
} from "@/types/collection";
import type { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { format, parseISO } from "date-fns";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import readingTime, { ReadTimeResults } from "reading-time";

export const revalidate = 0;

interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getBookmark(postId: string, userId: string) {
  if (postId && userId) {
    const bookmark = {
      id: postId,
      user_id: userId,
    };
    const response = await GetBookmark(bookmark);

    return response;
  }
}

async function getPost(params: { slug: string[] }) {
  const slug = params?.slug?.join("/");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const response = await supabase
    .from("posts")
    .select(`*, categories(*), profiles(*)`)
    .match({ slug: slug, published: true })
    .single<PostWithCategoryWithProfile>();

  if (!response.data) {
    notFound;
  }

  return response.data;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPost(params);
  const truncateDescription =
    post?.description?.slice(0, 100) + ("..." as string);
  const slug = "/posts/" + post?.slug;

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    authors: {
      name: seoData.author.name,
      url: seoData.author.twitterUrl,
    },
    openGraph: {
      title: post.title as string,
      description: post.description as string,
      type: "article",
      url: getUrl() + slug,
      images: [
        {
          url: getOgImageUrl(
            post.title as string,
            truncateDescription as string,
            [post.categories?.title as string] as string[],
            slug as string,
          ),
          width: 1200,
          height: 630,
          alt: post.title as string,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title as string,
      description: post.description as string,
      images: [
        getOgImageUrl(
          post.title as string,
          truncateDescription as string,
          [post.categories?.title as string] as string[],
          slug as string,
        ),
      ],
    },
  };
}

async function getComments(postId: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: comments, error } = await supabase
    .from("comments")
    .select("*, profiles(*)")
    .eq("post_id", postId)
    .order("created_at", { ascending: true })
    .returns<CommentWithProfile[]>();

  if (error) {
    console.error(error.message);
  }
  return comments;
}

export default async function PostPage({ params }: PostPageProps) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  // Get post data
  const post = await getPost(params);
  if (!post) {
    notFound();
  }
  // Set post views
  const slug = params?.slug?.join("/");

  // Check user logged in or not
  let username = null;
  let profileImage = null;
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    username = session.user?.user_metadata.full_name;
    profileImage =
      session?.user?.user_metadata.picture ||
      session?.user?.user_metadata.avatar_url;
  }

  // Get bookmark status
  const isBookmarked = await getBookmark(
    post.id as string,
    session?.user.id as string,
  );

  // Get comments
  const comments = await getComments(post.id as string);
  const readTime = readingTime(post.content ? post.content : "");

  return (
    <>
      <div className="min-h-full bg-gray-100 py-3">
        <div className="mx-auto max-w-7xl px-0 sm:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mx-auto max-w-4xl rounded-lg bg-white px-6 py-4 shadow-sm shadow-gray-300 ring-1 ring-black/5 sm:px-14 sm:py-10">
              <div className="relative mx-auto max-w-4xl py-2">
                {/* Heading */}
                <DetailPostHeading
                  id={post.id}
                  title={post.title as string}
                  image={post.image as string}
                  authorName={post.profiles.full_name as string}
                  authorImage={post.profiles.avatar_url as string}
                  date={format(parseISO(post.updated_at!), "MMMM dd, yyyy")}
                  category={post.categories?.title as string}
                  readTime={readTime as ReadTimeResults}
                />
                {/* Top Floatingbar */}
                <div className="mx-auto">
                  <DetailPostFloatingBar
                    id={post.id as string}
                    title={post.title as string}
                    text={post.description as string}
                    url={`${getUrl()}${encodeURIComponent(
                      `/posts/${post.slug}`,
                    )}`}
                    totalComments={comments?.length}
                    isBookmarked={isBookmarked}
                  />
                </div>
              </div>
              {/* Content */}
              <div className="relative mx-auto max-w-3xl border-slate-500/50 py-5">
                <div
                  className="lg:prose-md prose"
                  dangerouslySetInnerHTML={{ __html: post.content || "" }}
                />
              </div>
              <div className="mx-auto mt-10">
                {/* Bottom Floatingbar */}
                <DetailPostFloatingBar
                  id={post.id as string}
                  title={post.title as string}
                  text={post.description as string}
                  url={`${getUrl()}${encodeURIComponent(
                    `/posts/${post.slug}`,
                  )}`}
                  totalComments={comments?.length}
                  isBookmarked={isBookmarked}
                />
              </div>
            </div>
          </div>
          <DetailPostComment
            postId={post.id as string}
            comments={comments as CommentWithProfile[]}
          />
        </div>
        <DetailPostScrollUpButton />
      </div>
    </>
  );
}
