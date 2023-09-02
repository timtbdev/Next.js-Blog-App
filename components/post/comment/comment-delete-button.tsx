'use client';

import { useRouter } from 'next/navigation';
import React, { FC, useState } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '@/utils/supabase-client';
import { Session } from '@supabase/auth-helpers-nextjs';
import { Loader2 as SpinnerIcon, Trash as TrashIcon } from 'lucide-react';
import { commentConfig } from '@/config/comment';
import { DeleteComment } from '@/actions/comment/delete-comment';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface CommentDeleteButtonProps {
    id?: string;
    userId?: string;
}

const CommentDeleteButton: FC<CommentDeleteButtonProps> = ({ id = '', userId = '' }) => {
    const router = useRouter();
    const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
    const [session, setSession] = React.useState<Session | null>(null);

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

    // Delete bookmark
    async function deleteComment() {
        setIsDeleteLoading(true);
        if (id && session?.user.id && userId === session?.user.id) {
            const commentData = {
                id: id,
                userId: session?.user.id,
            };
            const response = await DeleteComment(commentData);
            if (response) {
                setIsDeleteLoading(false);
                toast.success(commentConfig.successDeleted);
                router.refresh();
            } else {
                setIsDeleteLoading(false);
                toast.error(commentConfig.errorDeleted);
            }
        } else {
            setIsDeleteLoading(false);
            toast.error(commentConfig.errorDeleted);
        }
    }

    return (
        <>
            {session?.user.id === userId && (
                <>
                    <div className="flex flex-shrink-0 self-center">
                        <div className="relative inline-block text-left">
                            <div className="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600">
                                <span className="sr-only">Delete comment</span>
                                <TrashIcon
                                    onClick={() => setShowDeleteAlert(true)}
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                />
                            </div>
                        </div>
                    </div>
                    <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                        <AlertDialogContent className="text-md font-sans">
                            <AlertDialogHeader>
                                <AlertDialogTitle>{commentConfig.questionDelete}</AlertDialogTitle>
                                <AlertDialogDescription>{commentConfig.warning}</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>{commentConfig.cancel}</AlertDialogCancel>
                                <AlertDialogAction onClick={deleteComment}>
                                    {isDeleteLoading ? (
                                        <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <TrashIcon className="mr-2 h-4 w-4" />
                                    )}
                                    <span>{commentConfig.confirm}</span>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </>
            )}
        </>
    );
};

export default CommentDeleteButton;
