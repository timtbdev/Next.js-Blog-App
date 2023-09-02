import PostDetailHeader from '@/components/post/post-detail-header';
import supabase from '@/utils/supabase-server';
import { PostWithCategoryWithProfile } from '@/types/collection';

import { notFound } from 'next/navigation';

async function getPost(params: { slug: string[] }) {
    const slug = params?.slug?.join('/');

    if (!slug) {
        notFound;
    }

    const response = await supabase
        .from('posts')
        .select(`*, categories(*), profiles(*)`)
        .match({ slug: slug, published: true })
        .single<PostWithCategoryWithProfile>();

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
            <PostDetailHeader title={post.title as string} />
            <div className="min-h-full bg-gray-100 py-3">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl">{children}</div>
                </div>
            </div>
        </>
    );
}
