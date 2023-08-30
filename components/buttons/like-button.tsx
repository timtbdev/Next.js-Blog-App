'use client';

import { AddLike } from '@/actions/add-like';
import { DeleteLike } from '@/actions/delete-like';
import HeartOutline from '@/components/icons/heart-outline';
import HeartSolid from '@/components/icons/heart-solid';
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

interface LikeButtonProps {
    id: string;
    totalLikes?: number;
    liked?: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({ id, totalLikes, liked }) => {
    const [isHovering, setIsHovered] = React.useState(false);
    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);
    const router = useRouter();
    const [session, setSession] = React.useState<Session | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    // Check authentitication and like states
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

    // Add Like
    async function addLike() {
        setIsLoading(true);

        if (id && session?.user.id) {
            const likeData = {
                id: id,
                user_id: session?.user.id,
            };

            const response = await AddLike(likeData);
            if (response) {
                toast.success(toolbarConfig.liked);
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

    // Delete Like
    async function deleteLike() {
        setIsLoading(true);

        if (id && session?.user.id) {
            const likeData = {
                id: id,
                user_id: session?.user.id,
            };

            const response = await DeleteLike(likeData);
            if (response) {
                setIsLoading(false);
                toast.success(toolbarConfig.unliked);
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
                (liked ? (
                    <button
                        type="button"
                        disabled={isLoading}
                        onClick={deleteLike}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        className="group relative mx-auto inline-flex w-full items-center justify-center rounded-md border border-black/5 bg-white py-2 hover:bg-gray-50 hover:shadow-sm"
                    >
                        {isLoading ? (
                            <SpinnerIcon className="-ml-0.5 h-5 w-5 animate-spin" />
                        ) : isHovering ? (
                            <HeartOutline className="-ml-0.5 h-5 w-5 text-gray-400" />
                        ) : (
                            <HeartSolid className="-ml-0.5 h-5 w-5 text-red-600" />
                        )}
                        <span className="absolute -right-[5px] -top-[10px] rounded-full bg-white px-[4px] text-xs font-semibold text-gray-500 shadow-sm ring-1 ring-black/5">
                            {totalLikes}
                        </span>
                        <span className="ml-2 text-sm text-gray-400">
                            {isHovering ? toolbarConfig.unlike : toolbarConfig.liked}
                        </span>
                    </button>
                ) : (
                    <button
                        type="button"
                        disabled={isLoading}
                        onClick={addLike}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        className="group relative mx-auto inline-flex w-full items-center justify-center rounded-md border border-black/5 bg-white py-2 hover:bg-gray-50 hover:shadow-sm"
                    >
                        {isLoading ? (
                            <SpinnerIcon className="-ml-0.5 h-5 w-5 animate-spin" />
                        ) : isHovering ? (
                            <HeartSolid className="-ml-0.5 h-5 w-5 text-red-600" />
                        ) : (
                            <HeartOutline className="-ml-0.5 h-5 w-5 text-gray-400" />
                        )}
                        <span className="absolute -right-[5px] -top-[10px] rounded-full bg-white px-[4px] text-xs font-semibold text-gray-500 shadow-sm ring-1 ring-black/5">
                            {totalLikes}
                        </span>
                        <span className="ml-2 text-sm text-gray-400 group-hover:text-gray-900">
                            {toolbarConfig.like}
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
                                <HeartSolid className="-ml-0.5 h-5 w-5 text-red-600" />
                            ) : (
                                <HeartOutline className="-ml-0.5 h-5 w-5 text-gray-400" />
                            )}
                            <span className="absolute -right-[5px] -top-[10px] rounded-full bg-white px-[4px] text-xs font-semibold text-gray-500 shadow-sm ring-1 ring-black/5">
                                {totalLikes}
                            </span>
                            <span className="ml-2 text-sm text-gray-400 group-hover:text-gray-900">
                                {toolbarConfig.like}
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

export default LikeButton;
