import PostItem from '@/components/post/post-item';
import Pagination from '@/components/shared/pagination';
import { SiteEmpty } from '@/components/site/site-empty';
import { menus } from '@/config/menu';
import { metaData } from '@/config/meta';
import { getOgImageUrl, getUrl } from '@/lib/utils';
import { PostWithCategoryWithProfile } from '@/types/collection';
import supabase from '@/utils/supabase-server';
import { Metadata } from 'next';
import notFound from 'next/navigation';
import React from 'react';
import { v4 } from 'uuid';

interface CategoryPageProps {
    params: {
        slug: string[];
    };
    searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const slug = params?.slug?.join('/');
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
            type: 'article',
            url: `${getUrl()}${category?.slug}`,
            images: [
                {
                    url: getOgImageUrl(category?.title, metaData.absoluteTitle, metaData.tags, category?.slug),
                    width: 1200,
                    height: 630,
                    alt: category?.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: category?.title,
            description: metaData.absoluteTitle,
            images: [getOgImageUrl(category?.title, metaData.absoluteTitle, metaData.tags, category?.slug)],
        },
    };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    // Get category by slug
    const slug = params?.slug?.join('/');
    const category = menus.find((menu) => menu.slug === slug);
    // Fetch total pages
    const { count } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true })
        .eq('category_id', category?.id ? category?.id : '');

    // Pagination
    const limit = 10;
    const totalPages = count ? Math.ceil(count / limit) : 0;
    const page =
        typeof searchParams.page === 'string' && +searchParams.page > 1 && +searchParams.page <= totalPages
            ? +searchParams.page
            : 1;
    const from = (page - 1) * limit;
    const to = page ? from + limit : limit;

    // Fetch posts

    if (!category) {
        notFound;
    }

    const { data, error } = await supabase
        .from('posts')
        .select(`*, categories(*), profiles(*)`)
        .match({ category_id: category?.id, published: true })
        .order('created_at', { ascending: false })
        .range(from, to)
        .returns<PostWithCategoryWithProfile[]>();

    if (!data || error || !data.length) {
        notFound;
    }

    return (
        <>
            {/* Posts */}
            <div className="my-5 space-y-6">
                {data?.length === 0 ? <SiteEmpty /> : data?.map((post) => <PostItem key={v4()} post={post} />)}
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
                <Pagination
                    page={page}
                    perPage={limit}
                    totalItems={count ? count : 0}
                    totalPages={totalPages}
                    baseUrl={`/category/${slug}`}
                    pageUrl="?page="
                />
            )}
        </>
    );
}
