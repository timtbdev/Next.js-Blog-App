"use server";

import { bookmarkSchema } from "@/lib/validations";
import supabase from "@/utils/supabase-server-action";
import * as z from "zod";

export async function AddBookmark(context: z.infer<typeof bookmarkSchema>) {
  try {
    const bookmark = bookmarkSchema.parse(context);
    const { data, error } = await supabase
      .from("bookmarks")
      .insert({
        id: bookmark.id,
        user_id: bookmark.user_id,
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
