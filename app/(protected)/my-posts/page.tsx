import ProtectedTitle from '@/components/protected/protected-title';
import Pagination from '@/components/shared/pagination';
import { myPostConfig } from '@/config/my-post';
import { emptyConfig } from '@/config/empty';
import { Post } from '@/types/collection';
import supabase from '@/utils/supabase-server';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';
import TableWrapper from '@/components/protected/table/table-wrapper';
import MyPostsTableHeader from '@/components/protected/my-posts/my-posts-table-header';
import MyPostsTable from '@/components/protected/my-posts/my-posts-table';
import TableEmpty from '@/components/protected/table/table-empty';

export const metadata: Metadata = {
    title: myPostConfig.title,
    description: myPostConfig.description,
};

interface MyPostsPageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

const MyPostsPage: React.FC<MyPostsPageProps> = async ({ searchParams }) => {
    // Fetch user data
    const {
        data: { user },
    } = await supabase.auth.getUser();

    console.log('User Id : ', user?.id);

    // Fetch total pages
    const { count } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true })
        .match({ author_id: user?.id });

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
    const { data, error } = await supabase
        .from('posts')
        .select(`*`)
        .order('created_at', { ascending: false })
        .match({ author_id: user?.id })
        .range(from, to)
        .returns<Post[]>();

    if (!data || error || !data.length) {
        notFound;
    }
    return (
        <>
            <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
                {data?.length && data?.length > 0 ? (
                    <>
                        <ProtectedTitle title={myPostConfig.title} description={myPostConfig.description} />
                        <TableWrapper>
                            <MyPostsTableHeader titles={myPostConfig.tableHeader} />
                            <MyPostsTable myPosts={data ? data : []} />
                        </TableWrapper>
                        {/* Pagination */}
                        {totalPages > 1 && (
                            <Pagination
                                page={page}
                                perPage={limit}
                                totalItems={count ? count : 0}
                                totalPages={totalPages}
                                baseUrl="/my-posts"
                                pageUrl="?page="
                            />
                        )}
                    </>
                ) : (
                    <TableEmpty emptyTitle={emptyConfig.empty} emptyDescription={emptyConfig.description} />
                )}
            </div>
        </>
    );
};

export default MyPostsPage;
