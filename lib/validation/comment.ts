import * as z from 'zod';

export const commentSchema = z.object({
    postId: z.string(),
    userId: z.string(),
    comment: z.string(),
});

export const commentDeleteSchema = z.object({
    id: z.string(),
    userId: z.string(),
});

export const commentFormSchema = z.object({
    comment: z
        .string()
        .min(3, { message: 'Comment must be at least 3 characters long.' })
        .max(500, { message: 'Comment must be at most 500 characters long.' }),
});
