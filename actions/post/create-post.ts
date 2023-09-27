"use server";

import { postCreateSchema } from "@/lib/validation/post";
import type { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import * as z from "zod";

export async function CreatePost(context: z.infer<typeof postCreateSchema>) {
  const supabase = createServerComponentClient<Database>({ cookies });
  try {
    const post = postCreateSchema.parse(context);
    const { data, error } = await supabase
      .from("drafts")
      .insert({
        title: post.title,
        author_id: post.user_id,
      })
      .select()
      .single();

    if (error) {
      console.log(error);
      return null;
    }
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
