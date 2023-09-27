"use server";

import { bookmarkSchema } from "@/lib/validation/bookmark";
import { Database } from "@/types/supabase";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import * as z from "zod";

export async function DeleteBookmark(context: z.infer<typeof bookmarkSchema>) {
  const supabase = createServerActionClient<Database>({ cookies });

  try {
    const bookmark = bookmarkSchema.parse(context);

    const { data, error } = await supabase
      .from("bookmarks")
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
