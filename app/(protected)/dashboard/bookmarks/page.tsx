import BookMarkTable from '@/components/dashboard/bookmark/bookmark-table';
import BookMarkTableHeader from '@/components/dashboard/bookmark/bookmark-table-header';
import DashBoardTableEmpty from '@/components/dashboard/dashboard-table-empty';
import DashBoardTableWrapper from '@/components/dashboard/dashboard-table-wrapper';
import DashBoardTitle from '@/components/dashboard/dashboard-title';
import Pagination from '@/components/shared/pagination';
import { bookMarkConfig } from '@/config/bookmark';
import { dashBoardBookmarkTableEmpty as empty } from '@/config/dashboard';
import { BookMarkWithPost } from '@/types/collection';
import supabase from '@/utils/supabase-server';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';

export const metadata: Metadata = {
    title: bookMarkConfig.title,
    description: bookMarkConfig.description,
};

interface BookMarkProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

const BookMarkPage: React.FC<BookMarkProps> = async ({ searchParams }) => {
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
                        <DashBoardTitle title={bookMarkConfig.title} />
                        <DashBoardTableWrapper>
                            <BookMarkTableHeader titles={bookMarkConfig.tableHeader} />
                            <BookMarkTable bookmarks={data ? data : []} />
                        </DashBoardTableWrapper>
                        {/* Pagination */}
                        {totalPages > 1 && (
                            <Pagination
                                page={page}
                                perPage={limit}
                                totalItems={count ? count : 0}
                                totalPages={totalPages}
                                baseUrl="/dashboard/bookmarks"
                                pageUrl="?page="
                            />
                        )}
                    </>
                ) : (
                    <DashBoardTableEmpty emptyTitle={empty.title} emptyDescription={empty.description} />
                )}
            </div>
        </>
    );
};

export default BookMarkPage;
