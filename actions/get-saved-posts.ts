'use server';

import { savedPostSchema } from '@/lib/validations';
import supabase from '@/utils/supabase-server-action';
import * as z from 'zod';

export async function GetSavedPost(context: z.infer<typeof savedPostSchema>) {
    try {
        const savedPost = savedPostSchema.parse(context);

        const { data, error } = await supabase
            .from('bookmarks')
            .select('*')
            .match({ id: savedPost.id, user_id: savedPost.user_id });

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
