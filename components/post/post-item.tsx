import { postConfig } from "@/config/post";
import { getMinutes, shimmer, toBase64 } from "@/lib/utils";
import { Comment, PostWithCategoryWithProfile } from "@/types/collection";
import type { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { format, parseISO } from "date-fns";
import { CalendarIcon, Clock10Icon, MessageCircleIcon } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import readingTime from "reading-time";

export const dynamic = "force-dynamic";

async function getPublicImageUrl(postId: string, fileName: string) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const bucketName =
    process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_POSTS || "posts";
  const { data } = supabase.storage
    .from(bucketName)
    .getPublicUrl(`${postId}/${fileName}`);

  if (data && data.publicUrl) return data.publicUrl;

  return "/images/not-found.jpg";
}

async function getComments(postId: string) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: comments, error } = await supabase
    .from("comments")
    .select()
    .eq("post_id", postId)
    .order("created_at", { ascending: true })
    .returns<Comment[]>();

  if (error) {
    console.error(error.message);
  }
  return comments;
}

interface PostItemProps {
  post: PostWithCategoryWithProfile;
}

const PostItem: React.FC<PostItemProps> = async ({ post }) => {
  const readTime = readingTime(post.content ? post.content : "");
  const comments = await getComments(post.id ? post.id : "");

  return (
    <>
      <div className="group relative w-full rounded-2xl bg-white/20 p-2.5 shadow-sm shadow-black/5 ring-[0.8px] ring-black/5 transition duration-200 hover:-translate-y-1">
        <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 opacity-[0.15] blur-lg"></div>
        <div className="relative max-w-full rounded-[0.62rem] shadow-sm shadow-black/5 ring-[0.8px] ring-black/5">
          <Link href={`/posts/${post.slug}`}>
            <article className="relative isolate flex max-w-3xl flex-col gap-2 rounded-lg bg-white px-5 py-3 shadow-md shadow-gray-300 ring-1 ring-black/5 sm:gap-8 sm:px-10 sm:py-6 lg:flex-row">
              <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                <Image
                  src={await getPublicImageUrl(post.id, post.image || "")}
                  alt={post.title ?? "Cover"}
                  height={256}
                  width={256}
                  priority
                  placeholder={`data:image/svg+xml;base64,${toBase64(
                    shimmer(256, 256),
                  )}`}
                  className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div>
                {/* Desktop category view */}
                <div className="hidden items-center gap-x-3 text-xs sm:flex">
                  <span className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-200">
                    {post.categories?.title}
                  </span>
                </div>

                <div className="group relative max-w-xl">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <span className="absolute inset-0" />
                    {post.title}
                  </h3>
                  {/* Mobile category and toolbar view*/}
                  <div className="mt-2 flex items-center gap-x-3 text-xs sm:hidden">
                    <div className="inline-flex items-center text-gray-500">
                      <span className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-200">
                        {post.categories?.title}
                      </span>
                    </div>
                    <div className="inline-flex items-center text-gray-500">
                      <CalendarIcon className="h-4 w-4" />
                      <span className="ml-1">
                        {format(parseISO(post.updated_at!), "MM/dd/yyyy")}
                      </span>
                    </div>
                    <div className="inline-flex items-center text-gray-500">
                      <Clock10Icon className="h-4 w-4" />
                      <span className="ml-1">
                        {getMinutes(readTime.minutes ? readTime.minutes : 0)}
                      </span>
                    </div>
                    <div className="inline-flex items-center text-gray-500">
                      <MessageCircleIcon className="h-4 w-4" />
                      <span className="ml-1">{comments?.length}</span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {post.description}
                  </p>
                  {/* Desktop toolbar view */}
                  <div className="mt-3 hidden items-center gap-x-3 text-xs sm:flex">
                    <div className="inline-flex items-center text-gray-500">
                      <CalendarIcon className="h-4 w-4" />
                      <span className="ml-1">
                        {format(parseISO(post.updated_at!), "MM/dd/yyyy")}
                      </span>
                    </div>
                    <div className="inline-flex items-center text-gray-500">
                      <Clock10Icon className="h-4 w-4" />
                      <span className="ml-1">
                        {getMinutes(readTime.minutes)}
                      </span>
                    </div>
                    <div className="inline-flex items-center text-gray-500">
                      <MessageCircleIcon className="h-4 w-4" />
                      <span className="ml-1">{comments?.length}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex border-t border-gray-900/5 pt-2">
                  <div className="relative flex items-center gap-x-2">
                    <Image
                      src={post.profiles?.avatar_url ?? "/images/avatar.png"}
                      alt={post.profiles?.full_name ?? "Avatar"}
                      height={40}
                      width={40}
                      priority
                      placeholder={`data:image/svg+xml;base64,${toBase64(
                        shimmer(40, 40),
                      )}`}
                      className="h-[40px] w-[40px] rounded-full bg-gray-50 object-cover"
                    />
                    <div className="text-sm">
                      <p className="font-semibold text-gray-900">
                        {post.profiles.full_name}
                      </p>
                      <p className="text-gray-600">{postConfig.author}</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PostItem;
