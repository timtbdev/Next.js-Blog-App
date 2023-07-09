import BlurImage from "@/components/shared/blur-image";
import { getMinutes, placeholderBlurhash } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { Clock10Icon, HeadphonesIcon, EyeIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { PostWithCategoryWithAuthor } from "@/types/collection";
import readingTime from "reading-time";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
export const revalidate = 60;

export const dynamic = "force-dynamic";

interface PostItemProps {
  post: PostWithCategoryWithAuthor;
}

const PostItem: React.FC<PostItemProps> = async ({ post }) => {
  const readTime = readingTime(post.content as string);
  const views =
    (await redis.get<number>(["pageviews", "posts", post.slug].join(":"))) ?? 0;
  return (
    <>
      <div className="group relative w-full rounded-2xl bg-white/20 p-2.5 shadow-sm shadow-black/5 ring-[0.8px] ring-black/5 transition duration-200 hover:-translate-y-1">
        <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 opacity-[0.15] blur-lg"></div>
        <div className="relative max-w-full rounded-[0.62rem] shadow-sm shadow-black/5 ring-[0.8px] ring-black/5">
          <Link href={`/posts/${post.slug}`}>
            <article className="relative bg-white max-w-3xl shadow-md shadow-gray-300 ring-1 ring-black/5 px-5 sm:px-10 py-3 sm:py-6 rounded-lg isolate flex flex-col gap-8 lg:flex-row">
              <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                <BlurImage
                  src={post.image!}
                  alt={post.title ?? "Cover"}
                  height={256}
                  width={256}
                  priority
                  className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                  placeholder="blur"
                  blurDataURL={placeholderBlurhash}
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div>
                <div className="flex items-center gap-x-3 text-xs">
                  <span className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-200">
                    {post.categories?.title}
                  </span>
                  <p className="text-gray-500">
                    {format(parseISO(post.updated_at!), "yyyy-MM-dd")}
                  </p>
                  <div className="inline-flex items-center text-gray-500">
                    <EyeIcon className="h-4 w-4" />
                    <span className="ml-1">{views}</span>
                  </div>
                  <div className="inline-flex items-center text-gray-500">
                    <Clock10Icon className="h-3 w-3" />
                    <span className="ml-1">{getMinutes(readTime.minutes)}</span>
                  </div>
                  <div className="inline-flex items-center text-gray-500">
                    <HeadphonesIcon className="h-3 w-3" />
                    <span className="ml-1">9м</span>
                  </div>
                </div>
                <div className="group relative max-w-xl">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <span className="absolute inset-0" />
                    {post.title}
                  </h3>
                  <p className="mt-5 text-sm leading-6 text-gray-600">
                    {post.description}
                  </p>
                </div>
                <div className="mt-6 flex border-t border-gray-900/5 pt-6">
                  <div className="relative flex items-center gap-x-4">
                    <BlurImage
                      src={(post.authors.image as string) || ""}
                      alt={post.authors?.name ?? "Avatar"}
                      height={40}
                      width={40}
                      priority
                      className="h-10 w-10 object-cover rounded-full bg-gray-50"
                      placeholder="blur"
                      blurDataURL={placeholderBlurhash}
                    />
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        <span className="absolute inset-0" />
                        {post.authors?.name}
                      </p>
                      <p className="text-gray-600">{post.authors?.title}</p>
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
