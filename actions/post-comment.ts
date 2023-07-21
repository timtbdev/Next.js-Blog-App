"use server";
import supabase from "@/utils/supabase-server";
import * as z from "zod";
import { commentSchema } from "@/lib/validations";
import { kv } from "@vercel/kv";

export async function PostComment(context: z.infer<typeof commentSchema>) {
  try {
    const comment = commentSchema.parse(context);
    const { data, error } = await supabase
      .from("comments")
      .insert({
        username: comment.username,
        image: comment.image,
        post_slug: comment.slug,
        comment: comment.comment,
      })
      .single();

    if (error) {
      console.log(error);
      return false;
    }
    await kv.incr(["comments", "post", comment.slug].join(":"));
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error);
      return false;
    }
    return false;
  }
}
