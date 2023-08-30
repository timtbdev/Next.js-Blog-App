'use server';

import { commentSchema } from '@/lib/validations';
import supabase from '@/utils/supabase-server-action';
import * as z from 'zod';

export async function PostComment(context: z.infer<typeof commentSchema>) {
    try {
        const comment = commentSchema.parse(context);
        const { data, error } = await supabase
            .from('comments')
            .insert({
                username: comment.username,
                image: comment.image,
                post_slug: comment.slug,
                comment: comment.comment,
            })
            .single();

        if (error) {
            console.log(error);
            return false;
        }
        return true;
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.log(error);
            return false;
        }
        return false;
    }
}
