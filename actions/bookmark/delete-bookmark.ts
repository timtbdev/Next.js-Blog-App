'use server';

import { bookmarkSchema } from '@/lib/validation/bookmark';
import supabase from '@/utils/supabase-server-action';
import * as z from 'zod';

export async function DeleteBookmark(context: z.infer<typeof bookmarkSchema>) {
    try {
        const bookmark = bookmarkSchema.parse(context);

        const { data, error } = await supabase
            .from('bookmarks')
            .delete()
            .match({ id: bookmark.id, user_id: bookmark.user_id })
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
