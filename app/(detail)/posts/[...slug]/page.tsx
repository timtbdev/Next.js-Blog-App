import { GetBookmark } from '@/actions/get-bookmark';
import { setPostViews } from '@/actions/set-post-views';
import ScrollUpButton from '@/components/buttons/scroll-up-button';
import PostComment from '@/components/post/post-comment';
import PostDetailProgressBar from '@/components/post/post-detail-progressbar';
import PostFloatingBar from '@/components/post/post-floating-bar';
import { metaData } from '@/config/meta';
import { getHash, getOgImagePostUrl, getUrl } from '@/lib/utils';
import { Comment, PostWithCategoryWithAuthor } from '@/types/collection';
import supabase from '@/utils/supabase-server';
import { kv } from '@vercel/kv';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export const revalidate = 0;

interface PostPageProps {
    params: {
        slug: string[];
    };
}

async function getBookmark(postId: string, userId: string) {
    if (postId && userId) {
        const bookmarkData = {
            id: postId,
            user_id: userId,
        };
        const response = await GetBookmark(bookmarkData);

        return response;
    }
}
async function getPost(params: { slug: string[] }) {
    const slug = params?.slug?.join('/');

    const response = await supabase
        .from('posts')
        .select(`*, categories(*), authors(*)`)
        .eq('slug', slug)
        .single<PostWithCategoryWithAuthor>();

    if (!response.data) {
        notFound;
    }

    return response.data;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    const post = await getPost(params);

    if (!post) {
        return {};
    }

    return {
        title: post.title,
        description: post.description,
        authors: {
            name: metaData.author.name,
            url: metaData.author.twitterUrl,
        },
        openGraph: {
            title: post.title as string,
            description: post.description as string,
            type: 'article',
            url: `${getUrl()}${post.slug}`,
            images: [
                {
                    url: getOgImagePostUrl(
                        post.title as string,
                        post.year as string,
                        post.image as string,
                        post.authors?.name as string,
                        post.authors?.image as string,
                        post.authors?.title as string
                    ),
                    width: 1200,
                    height: 630,
                    alt: post.title as string,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title as string,
            description: post.description as string,
            images: [
                getOgImagePostUrl(
                    post.title as string,
                    post.year as string,
                    post.image as string,
                    post.authors?.name as string,
                    post.authors?.image as string,
                    post.authors?.title as string
                ),
            ],
        },
    };
}

async function getComments(slug: string) {
    const { data: comments, error } = await supabase
        .from('comments')
        .select()
        .eq('post_slug', slug)
        .order('created_at', { ascending: true })
        .returns<Comment[]>();

    if (error) {
        console.error(error.message);
    }
    return comments;
}

export default async function PostPage({ params }: PostPageProps) {
    // Get post data
    const post = await getPost(params);
    if (!post) {
        notFound();
    }
    // Set post views
    const slug = params?.slug?.join('/');
    await setPostViews(slug);
    const views = (await kv.get<number>(['views', 'post', slug].join(':'))) ?? 0;
    // Get likes from KV
    const likes = (await kv.get<number>(['likes', 'post', slug].join(':'))) ?? 0;

    // Check if the user has already liked the post.
    const raw = cookies().get('user-ip')?.value ?? '';
    const hashed = getHash(raw);
    const ip = await kv.get(['likedIp', hashed, slug].join(':'));

    // Check user logged in or not
    let username = null;
    let profileImage = null;
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (session) {
        username = session.user?.user_metadata.full_name;
        profileImage = session?.user?.user_metadata.picture || session?.user?.user_metadata.avatar_url;
    }

    // Get bookmark
    const bookmark = await getBookmark(post.id as string, session?.user.id as string);

    console.log('Bookmark :', bookmark);

    // Get comments
    const comments = await getComments(slug);
    const totalComments = (await kv.get<number>(['comments', 'post', slug].join(':'))) ?? 0;

    return (
        <>
            <PostDetailProgressBar />
            <div className="min-h-full bg-gray-100 py-3">
                <div className="mx-auto max-w-7xl px-0 sm:px-8">
                    <div className="mx-auto max-w-4xl">
                        <div className="mx-auto max-w-4xl rounded-lg bg-white px-6 py-4 shadow-sm shadow-gray-300 ring-1 ring-black/5 sm:px-14 sm:py-10">
                            <div className="relative mx-auto max-w-4xl py-2">
                                <section className="isolate mb-5 overflow-hidden rounded-lg bg-gray-100 px-6 shadow-sm shadow-gray-300 ring-1 ring-black/5 sm:mb-8 lg:px-8">
                                    <div className="relative mx-auto max-w-2xl py-4 sm:py-8 lg:max-w-4xl">
                                        <div className="absolute left-1/2 top-0 -z-10 h-[50rem] w-[90rem] -translate-x-1/2 bg-[radial-gradient(50%_100%_at_top,theme(colors.indigo.100),white)] opacity-20 lg:left-36" />
                                        <div className="absolute inset-y-0 right-1/2 -z-10 mr-12 w-[150vw] origin-bottom-left skew-x-[-30deg] bg-gray-50 shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-20 md:mr-0 lg:right-full lg:-mr-36 lg:origin-center" />
                                        <figure className="grid grid-cols-1 items-center gap-x-6 gap-y-8 lg:gap-x-10">
                                            <div className="relative col-span-2 lg:col-start-1 lg:row-start-2">
                                                <svg
                                                    viewBox="0 0 162 128"
                                                    fill="none"
                                                    aria-hidden="true"
                                                    className="absolute -top-12 left-0 -z-10 h-32 stroke-gray-900/10"
                                                >
                                                    <path
                                                        id="b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb"
                                                        d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z"
                                                    />
                                                    <use href="#b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb" x={86} />
                                                </svg>
                                                <blockquote className="text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                                                    <p>{post.quote}</p>
                                                </blockquote>
                                            </div>
                                            <div className="col-end-1 w-28 lg:row-span-4 lg:w-72">
                                                <Image
                                                    src={post.image as string}
                                                    height={288}
                                                    width={288}
                                                    className="rounded-xl bg-gray-50 lg:rounded-3xl"
                                                    alt={post.title || 'Cover'}
                                                    priority
                                                />
                                            </div>
                                            <figcaption className="text-base lg:col-start-1 lg:row-start-3">
                                                <div className="flex flex-row items-center">
                                                    <Image
                                                        src={post.authors?.image as string}
                                                        height={40}
                                                        width={40}
                                                        alt={(post.authors?.name as string) || 'Avatar'}
                                                        className="flex h-[40px] w-[40px] rounded-full object-cover shadow-sm"
                                                        priority
                                                    />
                                                    <div className="ml-2 flex flex-col">
                                                        <span className="flex text-sm font-semibold text-gray-900">
                                                            {post.authors?.name}
                                                        </span>
                                                        <span className="flex text-sm text-gray-500">
                                                            {post.authors?.title}
                                                        </span>
                                                    </div>
                                                </div>
                                            </figcaption>
                                        </figure>
                                    </div>
                                </section>
                                {/* Top Floatingbar */}
                                <div className="mx-auto">
                                    <PostFloatingBar
                                        id={post.id as string}
                                        title={post.title as string}
                                        text={post.description as string}
                                        url={`${getUrl()}${encodeURIComponent(`/posts/${post.slug}`)}`}
                                        slug={post.slug as string}
                                        views={views}
                                        likes={likes}
                                        ip={ip as string}
                                        totalComments={totalComments}
                                        bookmarked={bookmark}
                                    />
                                </div>
                            </div>

                            <div className="relative mx-auto max-w-3xl border-slate-500/50">
                                <div
                                    className="lg:prose-md prose"
                                    dangerouslySetInnerHTML={{ __html: post.content || '' }}
                                />
                            </div>
                            <div className="mx-auto mt-10">
                                {/* Bottom Floatingbar */}
                                <PostFloatingBar
                                    id={post.id as string}
                                    title={post.title as string}
                                    text={post.description as string}
                                    url={`${getUrl()}${encodeURIComponent(`/posts/${post.slug}`)}`}
                                    slug={post.slug as string}
                                    views={views}
                                    likes={likes}
                                    ip={ip as string}
                                    totalComments={totalComments}
                                    bookmarked={bookmark}
                                />
                            </div>
                        </div>
                    </div>
                    <PostComment
                        slug={post.slug as string}
                        username={username}
                        profileImage={profileImage}
                        comments={comments as Comment[]}
                    />
                </div>
                <ScrollUpButton />
            </div>
        </>
    );
}
