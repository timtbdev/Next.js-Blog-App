'use server';

import { likeSchema } from '@/lib/validations';
import supabase from '@/utils/supabase-server-action';
import * as z from 'zod';

export async function AddLike(context: z.infer<typeof likeSchema>) {
    try {
        const like = likeSchema.parse(context);
        const { data, error } = await supabase
            .from('likes')
            .insert({
                id: like.id,
                user_id: like.user_id,
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
