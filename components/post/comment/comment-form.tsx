'use client';

import { PostComment } from '@/actions/comment/post-comment';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { commentConfig } from '@/config/comment';
import { zodResolver } from '@hookform/resolvers/zod';
import { SendIcon, Loader2 as SpinnerIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as z from 'zod';
import { commentFormSchema, commentSchema } from '@/lib/validations';

type FormValues = z.infer<typeof commentFormSchema>;

interface CommentFormProps {
    postId: string;
    userId: string;
}

// This can come from your database or API.
const defaultValues: Partial<FormValues> = {
    comment: '',
};

const CommentForm: React.FC<CommentFormProps> = ({ postId, userId }) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const router = useRouter();

    const form = useForm<FormValues>({
        resolver: zodResolver(commentFormSchema),
        defaultValues,
        mode: 'onChange',
    });

    async function onSubmit(data: FormValues) {
        setIsLoading(true);

        const formData = {
            postId: postId,
            userId: userId,
            comment: data.comment,
        };

        const response = await PostComment(formData);

        if (response) {
            setIsLoading(false);
            toast.success(commentConfig.successAdd);
            router.refresh();
        } else {
            setIsLoading(false);
            toast.error(commentConfig.errorAdd);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{commentConfig.title}</FormLabel>
                            <FormControl>
                                <Textarea {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="group flex items-center justify-center rounded-lg bg-gradient-to-t from-gray-200 via-gray-100 to-gray-50 p-2 text-gray-400 shadow-md shadow-black/5 ring-1 ring-black/10 transition duration-200 hover:bg-gradient-to-tr hover:from-gray-200 hover:via-gray-100 hover:to-gray-50 active:scale-[96%] active:ring-black/20"
                >
                    {isLoading ? (
                        <SpinnerIcon className="mr-2 h-4 w-4 animate-spin text-gray-600" />
                    ) : (
                        <SendIcon className="mr-2 h-4 w-4 text-gray-600" />
                    )}
                    <span className="text-gray-600">{commentConfig.submit}</span>
                </Button>
            </form>
        </Form>
    );
};

export default CommentForm;
