'use client';

import { AddBookmark } from '@/actions/add-bookmark';
import { DeleteBookmark } from '@/actions/delete-bookmark';
import BookMarkOutline from '@/components/icons/bookmark-outline';
import BookMarkSolid from '@/components/icons/bookmark-solid';
import LoginSection from '@/components/login/login-section';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { toolbarConfig } from '@/config/toolbar';
import { supabase } from '@/utils/supabase-client';
import { Session } from '@supabase/auth-helpers-nextjs';
import { Loader2 as SpinnerIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface BoomarkButtonProps {
    id: string;
    bookmarked?: boolean;
}

const BoomarkButton: React.FC<BoomarkButtonProps> = ({ id, bookmarked }) => {
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

    // Add bookmark
    async function addBookmark() {
        setIsLoading(true);

        if (id && session?.user.id) {
            const bookmarkData = {
                id: id,
                user_id: session?.user.id,
            };

            const response = await AddBookmark(bookmarkData);
            if (response) {
                toast.success(toolbarConfig.saved);
                router.refresh();
                setIsLoading(false);
            } else {
                setIsLoading(false);
                toast.error(toolbarConfig.error);
            }
        } else {
            setIsLoading(false);
            toast.error(toolbarConfig.error);
        }
    }

    // Delete bookmark
    async function deleteBookmark() {
        setIsLoading(true);

        if (id && session?.user.id) {
            const bookmarkData = {
                id: id,
                user_id: session?.user.id,
            };

            const response = await DeleteBookmark(bookmarkData);
            if (response) {
                setIsLoading(false);
                toast.success(toolbarConfig.unsaved);
                router.refresh();
            } else {
                setIsLoading(false);
                toast.error(toolbarConfig.error);
            }
        } else {
            setIsLoading(false);
            toast.error(toolbarConfig.error);
        }
    }

    return (
        <>
            {session &&
                (bookmarked ? (
                    <button
                        type="button"
                        disabled={isLoading}
                        onClick={deleteBookmark}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        className="group relative mx-auto inline-flex w-full items-center justify-center rounded-md border border-black/5 bg-gray-50 py-2 hover:bg-white hover:shadow-sm"
                    >
                        {isLoading ? (
                            <SpinnerIcon className="-ml-0.5 h-5 w-5 animate-spin" />
                        ) : isHovering ? (
                            <BookMarkOutline className="-ml-0.5 h-5 w-5 text-gray-400" />
                        ) : (
                            <BookMarkSolid className="-ml-0.5 h-5 w-5 text-gray-900" />
                        )}
                        <span className="ml-2 hidden text-sm text-gray-400 md:flex">
                            {isHovering ? toolbarConfig.unsave : toolbarConfig.saved}
                        </span>
                    </button>
                ) : (
                    <button
                        type="button"
                        disabled={isLoading}
                        onClick={addBookmark}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        className="group relative mx-auto inline-flex w-full items-center justify-center rounded-md border border-black/5 bg-gray-50 py-2 hover:bg-white hover:shadow-sm"
                    >
                        {isLoading ? (
                            <SpinnerIcon className="-ml-0.5 h-5 w-5 animate-spin" />
                        ) : isHovering ? (
                            <BookMarkSolid className="-ml-0.5 h-5 w-5 text-gray-900" />
                        ) : (
                            <BookMarkOutline className="-ml-0.5 h-5 w-5 text-gray-400" />
                        )}
                        <span className="ml-2 hidden text-sm text-gray-400 group-hover:text-gray-900 md:flex">
                            {toolbarConfig.save}
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
                            className="group relative mx-auto inline-flex w-full items-center justify-center rounded-md border border-black/5 bg-gray-50 py-2 hover:bg-white hover:shadow-sm"
                        >
                            {isHovering ? (
                                <BookMarkSolid className="-ml-0.5 h-5 w-5 text-gray-900" />
                            ) : (
                                <BookMarkOutline className="-ml-0.5 h-5 w-5 text-gray-400" />
                            )}
                            <span className="ml-2 hidden text-sm text-gray-400 group-hover:text-gray-900 md:flex">
                                {toolbarConfig.save}
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

export default BoomarkButton;
