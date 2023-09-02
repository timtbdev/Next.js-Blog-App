'use server';

import { savedPostSchema } from '@/lib/validations';
import supabase from '@/utils/supabase-server-action';
import * as z from 'zod';

export async function AddSavedPost(context: z.infer<typeof savedPostSchema>) {
    try {
        const savedPost = savedPostSchema.parse(context);
        const { data, error } = await supabase
            .from('bookmarks')
            .insert({
                id: savedPost.id,
                user_id: savedPost.user_id,
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
