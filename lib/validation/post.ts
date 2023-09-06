import z from "zod";

export const postDeleteSchema = z.object({
  id: z.string(),
  user_id: z.string(),
});

export const postSlugSchema = z.object({
  slug: z.string(),
});

export const postCreateSchema = z.object({
  title: z.string(),
  user_id: z.string(),
});

export const postParamSchema = z.object({
  postId: z.string(),
  userId: z.string(),
});

export const postEditFormContentSchema = z.object({
  content: z.any().optional(),
});

export const postEditFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(120, {
      message: "Title must not be longer than 120 characters.",
    }),
  slug: z
    .string()
    .min(2, {
      message: "Slug must be at least 2 characters.",
    })
    .max(100, {
      message: "Slug must not be longer than 100 characters.",
    }),
  categoryId: z.string({
    required_error: "Please select a category.",
  }),
  image: z.string().optional(),
  description: z
    .string()
    .min(2, {
      message: "Description must be at least 2 characters.",
    })
    .max(300, {
      message: "Description must not be longer than 300 characters.",
    }),
  content: z.any().optional(),
});

export const postUpdateSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  categoryId: z.string(),
  image: z.string().optional(),
  description: z.string().optional(),
  content: z.any().optional(),
});
