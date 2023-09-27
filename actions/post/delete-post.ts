"use server";

import { postDeleteSchema } from "@/lib/validation/post";
import type { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import * as z from "zod";

export async function DeletePost(context: z.infer<typeof postDeleteSchema>) {
  const supabase = createServerComponentClient<Database>({ cookies });
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
