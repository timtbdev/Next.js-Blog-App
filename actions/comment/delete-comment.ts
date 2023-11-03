"use server";

import { commentDeleteSchema } from "@/lib/validation/comment";
import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import * as z from "zod";

export async function DeleteComment(
  context: z.infer<typeof commentDeleteSchema>,
) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  try {
    const comment = commentDeleteSchema.parse(context);

    const { data, error } = await supabase
      .from("comments")
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
