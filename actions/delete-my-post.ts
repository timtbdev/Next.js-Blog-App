'use server';

import { myPostSchema } from '@/lib/validations';
import supabase from '@/utils/supabase-server-action';
import * as z from 'zod';

export async function DeleteMyPost(context: z.infer<typeof myPostSchema>) {
    try {
        const myPost = myPostSchema.parse(context);

        const { data, error } = await supabase
            .from('posts')
            .delete()
            .match({ id: myPost.id, user_id: myPost.user_id })
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
