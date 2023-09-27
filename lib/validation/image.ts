import * as z from "zod";

export const imageDeleteSchema = z.object({
  userId: z.string(),
  postId: z.string(),
  fileName: z.string(),
});
