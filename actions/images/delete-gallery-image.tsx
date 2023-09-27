"use server";

import { imageDeleteSchema } from "@/lib/validation/image";
import { Database } from "@/types/supabase";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import * as z from "zod";

export async function DeleteGalleryImage(
  context: z.infer<typeof imageDeleteSchema>,
) {
  const supabase = createServerActionClient<Database>({ cookies });
  try {
    const { userId, postId, fileName } = imageDeleteSchema.parse(context);
    const bucketName =
      process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_GALLERY_IMAGE ||
      "gallery-image";

    const { data, error } = await supabase.storage
      .from(bucketName)
      .remove([`${userId}/${postId}/${fileName}`]);

    if (error) {
      console.log(error);
    }
    if (data?.length && data?.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error);
      return false;
    }
    return false;
  }
}
