'use server';

import { commentDeleteSchema } from '@/lib/validation/comment';
import supabase from '@/utils/supabase-server-action';
import * as z from 'zod';

export async function DeleteComment(context: z.infer<typeof commentDeleteSchema>) {
    try {
        const comment = commentDeleteSchema.parse(context);

        const { data, error } = await supabase
            .from('comments')
            .delete()
            .match({ id: comment.id, user_id: comment.userId })
            .select();

        if (error) {
            console.log(error);
            return false;
        }
        if (data && data.length > 0) {
            return true;
        }
        return false;
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.log(error);
            return false;
        }
        return false;
    }
}
