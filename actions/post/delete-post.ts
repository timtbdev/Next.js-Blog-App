"use server";

import { postDeleteSchema } from "@/lib/validation/post";
import supabase from "@/utils/supabase-server-action";
import * as z from "zod";

export async function DeletePost(context: z.infer<typeof postDeleteSchema>) {
  try {
    const post = postDeleteSchema.parse(context);

    const { data, error } = await supabase
      .from("drafts")
      .delete()
      .match({ id: post.id, author_id: post.user_id })
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
