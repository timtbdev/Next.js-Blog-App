"use server";

import { postUpdateSchema } from "@/lib/validation/post";
import supabase from "@/utils/supabase-server-action";
import * as z from "zod";

export async function UpdatePost(context: z.infer<typeof postUpdateSchema>) {
  try {
    const post = postUpdateSchema.parse(context);

    const { data, error } = await supabase
      .from("drafts")
      .update({
        id: post.id,
        title: post.title,
        slug: post.slug,
        category_id: post.categoryId,
        description: post.description,
        image: post.image,
        content: post.content,
      })
      .match({ id: post.id })
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
