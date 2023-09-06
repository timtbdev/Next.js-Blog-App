import * as z from 'zod';

export const ogImageSchema = z.object({
    title: z.string(),
    subTitle: z.string(),
    tags: z.string().array(),
    slug: z.string(),
});
