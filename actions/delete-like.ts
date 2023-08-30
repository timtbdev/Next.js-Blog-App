'use server';

import { bookmarkSchema as likeSchema } from '@/lib/validations';
import supabase from '@/utils/supabase-server-action';
import * as z from 'zod';

export async function DeleteLike(context: z.infer<typeof likeSchema>) {
    try {
        const like = likeSchema.parse(context);

        const { data, error } = await supabase
            .from('likes')
            .delete()
            .match({ id: like.id, user_id: like.user_id })
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
