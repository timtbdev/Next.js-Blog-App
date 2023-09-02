import ProtectedTitle from '@/components/protected/protected-title';
import Pagination from '@/components/shared/pagination';
import { savedPostConfig } from '@/config/saved-post';
import { dashBoardBookmarkTableEmpty as empty } from '@/config/dashboard';
import { BookMarkWithPost } from '@/types/collection';
import supabase from '@/utils/supabase-server';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';
import TableWrapper from '@/components/protected/table/table-wrapper';
import SavedPostsTableHeader from '@/components/protected/saved-posts/saved-posts-table-header';
import SavedPostsTable from '@/components/protected/saved-posts/saved-posts-table';
import TableEmpty from '@/components/protected/table/table-empty';

export const metadata: Metadata = {
    title: savedPostConfig.title,
    description: savedPostConfig.description,
};

interface SavedPostPageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

const SavedPostPage: React.FC<SavedPostPageProps> = async ({ searchParams }) => {
    // Fetch total pages
    const { count } = await supabase.from('bookmarks').select('*', { count: 'exact', head: true });

    // Fetch user data
    const {
        data: { user },
    } = await supabase.auth.getUser();

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
        .from('bookmarks')
        .select(`*, posts(*)`)
        .order('created_at', { ascending: false })
        .match({ user_id: user?.id })
        .range(from, to)
        .returns<BookMarkWithPost[]>();

    if (!data || error || !data.length) {
        notFound;
    }
    return (
        <>
            <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
                {data?.length && data?.length > 0 ? (
                    <>
                        <ProtectedTitle title={savedPostConfig.title} />
                        <TableWrapper>
                            <SavedPostsTableHeader titles={savedPostConfig.tableHeader} />
                            <SavedPostsTable savedPosts={data ? data : []} />
                        </TableWrapper>
                        {/* Pagination */}
                        {totalPages > 1 && (
                            <Pagination
                                page={page}
                                perPage={limit}
                                totalItems={count ? count : 0}
                                totalPages={totalPages}
                                baseUrl="/saved-posts"
                                pageUrl="?page="
                            />
                        )}
                    </>
                ) : (
                    <TableEmpty emptyTitle={empty.title} emptyDescription={empty.description} />
                )}
            </div>
        </>
    );
};

export default SavedPostPage;
