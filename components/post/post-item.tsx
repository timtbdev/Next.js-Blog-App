import BlurImage from "@/components/shared/blur-image";
import { getMinutes, placeholderBlurhash } from "@/lib/utils";
import { PostWithCategoryWithAuthor } from "@/types/collection";
import { kv } from "@vercel/kv";
import { format, parseISO } from "date-fns";
import {
  CalendarIcon,
  Clock10Icon,
  EyeIcon,
  HeadphonesIcon,
  HeartIcon,
  MessageCircleIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import readingTime from "reading-time";

export const dynamic = "force-dynamic";

interface PostItemProps {
  post: PostWithCategoryWithAuthor;
}

const PostItem: React.FC<PostItemProps> = async ({ post }) => {
  const readTime = readingTime(post.content ? post.content : "");

  const views =
    (await kv.get<number>(["views", "post", post.slug].join(":"))) ?? 0;
  const comments =
    (await kv.get<number>(["comments", "post", post.slug].join(":"))) ?? 0;
  const likes =
    (await kv.get<number>(["likes", "post", post.slug].join(":"))) ?? 0;
  return (
    <>
      <div className="group relative w-full rounded-2xl bg-white/20 p-2.5 shadow-sm shadow-black/5 ring-[0.8px] ring-black/5 transition duration-200 hover:-translate-y-1">
        <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 opacity-[0.15] blur-lg"></div>
        <div className="relative max-w-full rounded-[0.62rem] shadow-sm shadow-black/5 ring-[0.8px] ring-black/5">
          <Link href={`/posts/${post.slug}`}>
            <article className="relative isolate flex max-w-3xl flex-col gap-2 rounded-lg bg-white px-5 py-3 shadow-md shadow-gray-300 ring-1 ring-black/5 sm:gap-8 sm:px-10 sm:py-6 lg:flex-row">
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
                  {/* Mobile toobar view*/}
                  <div className="mt-2 flex items-center gap-x-3 text-xs sm:hidden">
                    <div className="inline-flex items-center text-gray-500">
                      <span className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-200">
                        {post.categories?.title}
                      </span>
                    </div>
                    <div className="inline-flex items-center text-gray-500">
                      <CalendarIcon className="h-4 w-4" />
                      <span className="ml-1">
                        {format(parseISO(post.updated_at!), "yyyy-MM-dd")}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-x-3 text-xs sm:hidden">
                    <div className="inline-flex items-center text-gray-500">
                      <Clock10Icon className="h-4 w-4" />
                      <span className="ml-1">
                        {getMinutes(readTime.minutes ? readTime.minutes : 0)}
                      </span>
                    </div>
                    <div className="inline-flex items-center text-gray-500">
                      <HeadphonesIcon className="h-4 w-4" />
                      <span className="ml-1">9м</span>
                    </div>
                    <div className="inline-flex items-center text-gray-500">
                      <EyeIcon className="h-4 w-4" />
                      <span className="ml-1">{views}</span>
                    </div>
                    <div className="inline-flex items-center text-gray-500">
                      <MessageCircleIcon className="h-4 w-4" />
                      <span className="ml-1">{comments}</span>
                    </div>
                    <div className="inline-flex items-center text-gray-500">
                      <HeartIcon className="h-4 w-4" />
                      <span className="ml-1 text-sm">{likes}</span>
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
                        {format(parseISO(post.updated_at!), "yyyy-MM-dd")}
                      </span>
                    </div>
                    <div className="inline-flex items-center text-gray-500">
                      <EyeIcon className="h-4 w-4" />
                      <span className="ml-1">{views}</span>
                    </div>
                    <div className="inline-flex items-center text-gray-500">
                      <Clock10Icon className="h-4 w-4" />
                      <span className="ml-1">
                        {getMinutes(readTime.minutes)}
                      </span>
                    </div>
                    <div className="inline-flex items-center text-gray-500">
                      <HeadphonesIcon className="h-4 w-4" />
                      <span className="ml-1">9м</span>
                    </div>
                    <div className="inline-flex items-center text-gray-500">
                      <MessageCircleIcon className="h-4 w-4" />
                      <span className="ml-1">{comments}</span>
                    </div>
                    <div className="inline-flex items-center text-gray-500">
                      <HeartIcon className="h-4 w-4" />
                      <span className="ml-1">{likes}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex border-t border-gray-900/5 pt-2">
                  <div className="relative flex items-center gap-x-4">
                    <BlurImage
                      src={post.authors?.image ? post.authors.image : ""}
                      alt={post.authors?.name ?? "Avatar"}
                      height={45}
                      width={45}
                      priority
                      className="h-[45px] w-[45px] rounded-full bg-gray-50 object-cover"
                      placeholder="blur"
                      blurDataURL={placeholderBlurhash}
                    />
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        <span className="absolute inset-0 tracking-tight [word-spacing:-2px]" />
                        {post.authors?.name}
                      </p>
                      <p className="tracking-tight text-gray-600 [word-spacing:-3px]">
                        {post.authors?.title}
                      </p>
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
