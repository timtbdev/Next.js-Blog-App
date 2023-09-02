import { DeleteMyPost } from '@/actions/delete-my-post';
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
import { myPostConfig } from '@/config/my-post';
import { toolbarConfig } from '@/config/toolbar';
import { supabase } from '@/utils/supabase-client';
import { Session } from '@supabase/auth-helpers-nextjs';
import { Loader2 as SpinnerIcon, Trash as TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface MyPostsDeleteButtonProps {
    id?: string;
}

const MyPostsDeleteButton: React.FC<MyPostsDeleteButtonProps> = ({ id }) => {
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

    // Delete post
    async function deleteMyPost() {
        setIsDeleteLoading(true);
        if (id && session?.user.id) {
            const myPostData = {
                id: id,
                user_id: session?.user.id,
            };
            const response = await DeleteMyPost(myPostData);
            if (response) {
                setIsDeleteLoading(false);
                toast.success(myPostConfig.deleted);
                router.refresh();
            } else {
                setIsDeleteLoading(false);
                toast.error(myPostConfig.errorDelete);
            }
        } else {
            setIsDeleteLoading(false);
            toast.error(myPostConfig.errorDelete);
        }
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setShowDeleteAlert(true)}
                className="rounded-md border bg-gray-50 px-3 py-2 text-gray-900 hover:bg-gray-100"
            >
                {myPostConfig.delete}
            </button>
            <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                <AlertDialogContent className="text-md font-sans">
                    <AlertDialogHeader>
                        <AlertDialogTitle>{myPostConfig.question}</AlertDialogTitle>
                        <AlertDialogDescription>{myPostConfig.warning}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>{myPostConfig.cancel}</AlertDialogCancel>
                        <AlertDialogAction onClick={deleteMyPost}>
                            {isDeleteLoading ? (
                                <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <TrashIcon className="mr-2 h-4 w-4" />
                            )}
                            <span>{myPostConfig.confirm}</span>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default MyPostsDeleteButton;
