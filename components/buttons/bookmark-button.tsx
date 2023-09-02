'use client';

import { AddBookmark } from '@/actions/bookmark/add-bookmark';
import { DeleteBookmark } from '@/actions/bookmark/delete-bookmark';
import BookmarkOutline from '@/components/icons/bookmark-outline';
import BookmarkSolid from '@/components/icons/bookmark-solid';
import LoginSection from '@/components/login/login-section';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { bookmarkConfig } from '@/config/bookmark';
import { supabase } from '@/utils/supabase-client';
import { Session } from '@supabase/auth-helpers-nextjs';
import { Loader2 as SpinnerIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import toast from 'react-hot-toast';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface BookmarkButtonProps {
    id: string;
    isBookmarked?: boolean;
}

const BookmarkButton: FC<BookmarkButtonProps> = ({ id, isBookmarked }) => {
    const [isHovering, setIsHovered] = React.useState(false);
    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);
    const router = useRouter();
    const [session, setSession] = React.useState<Session | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    // Check authentitication and bookmark states
    React.useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, [id, session?.user.id]);

    // Add a bookmark
    async function addBookmark() {
        setIsLoading(true);

        if (id && session?.user.id) {
            const bookmark = {
                id: id,
                user_id: session?.user.id,
            };

            const response = await AddBookmark(bookmark);
            if (response) {
                toast.success(bookmarkConfig.successAdd);
                router.refresh();
                setIsLoading(false);
            } else {
                setIsLoading(false);
                toast.error(bookmarkConfig.errorAdd);
            }
        } else {
            setIsLoading(false);
            toast.error(bookmarkConfig.errorAdd);
        }
    }

    // Delete a bookmark
    async function deleteBookmark() {
        setIsLoading(true);

        if (id && session?.user.id) {
            const bookmark = {
                id: id,
                user_id: session?.user.id,
            };

            const response = await DeleteBookmark(bookmark);
            if (response) {
                setIsLoading(false);
                toast.success(bookmarkConfig.successDelete);
                router.refresh();
            } else {
                setIsLoading(false);
                toast.error(bookmarkConfig.errorDelete);
            }
        } else {
            setIsLoading(false);
            toast.error(bookmarkConfig.errorDelete);
        }
    }

    return (
        <>
            {session &&
                (isBookmarked ? (
                    <button
                        type="button"
                        disabled={isLoading}
                        onClick={deleteBookmark}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        className="group relative mx-auto inline-flex w-full items-center justify-center rounded-md border border-black/5 bg-white py-2 hover:bg-gray-50 hover:shadow-sm"
                    >
                        {isLoading ? (
                            <SpinnerIcon className="-ml-0.5 h-5 w-5 animate-spin" />
                        ) : isHovering ? (
                            <BookmarkOutline className="-ml-0.5 h-5 w-5 text-gray-400" />
                        ) : (
                            <BookmarkSolid className="-ml-0.5 h-5 w-5 text-gray-900" />
                        )}
                        <span className="ml-2 hidden text-sm text-gray-400 md:flex">
                            {isHovering ? bookmarkConfig.unBookmark : bookmarkConfig.bookmarked}
                        </span>
                    </button>
                ) : (
                    <button
                        type="button"
                        disabled={isLoading}
                        onClick={addBookmark}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        className="group relative mx-auto inline-flex w-full items-center justify-center rounded-md border border-black/5 bg-white py-2 hover:bg-gray-50 hover:shadow-sm"
                    >
                        {isLoading ? (
                            <SpinnerIcon className="-ml-0.5 h-5 w-5 animate-spin" />
                        ) : isHovering ? (
                            <BookmarkSolid className="-ml-0.5 h-5 w-5 text-gray-900" />
                        ) : (
                            <BookmarkOutline className="-ml-0.5 h-5 w-5 text-gray-400" />
                        )}
                        <span className="ml-2 hidden text-sm text-gray-400 group-hover:text-gray-900 md:flex">
                            {bookmarkConfig.bookmark}
                        </span>
                    </button>
                ))}
            {!session && (
                <Dialog>
                    <DialogTrigger asChild>
                        <button
                            type="button"
                            disabled={isLoading}
                            onMouseEnter={onMouseEnter}
                            onMouseLeave={onMouseLeave}
                            className="group relative mx-auto inline-flex w-full items-center justify-center rounded-md border border-black/5 bg-white py-2 hover:bg-gray-50 hover:shadow-sm"
                        >
                            {isHovering ? (
                                <BookmarkSolid className="-ml-0.5 h-5 w-5 text-gray-900" />
                            ) : (
                                <BookmarkOutline className="-ml-0.5 h-5 w-5 text-gray-400" />
                            )}
                            <span className="ml-2 hidden text-sm text-gray-400 group-hover:text-gray-900 md:flex">
                                {bookmarkConfig.bookmark}
                            </span>
                        </button>
                    </DialogTrigger>
                    <DialogContent className="font-sans sm:max-w-[425px]">
                        <LoginSection />
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};

export default BookmarkButton;
