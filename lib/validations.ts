import * as z from "zod";

export const ogImageSchema = z.object({
  title: z.string(),
  subTitle: z.string(),
  tags: z.string().array(),
  slug: z.string(),
});

export const ogImagePostSchema = z.object({
  title: z.string(),
  year: z.string(),
  image: z.string(),
  name: z.string(),
  avatar: z.string(),
  job: z.string(),
});

export const postViewSchema = z.object({
  params: z.object({
    slug: z.string(),
  }),
});

export const postClapsSchema = z.object({
  params: z.object({
    slug: z.string(),
    score: z.number().optional(),
  }),
});
