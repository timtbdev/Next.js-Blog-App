import * as z from 'zod';
import { form as siteForm } from '@/config/site';

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

export const commentSchema = z.object({
    username: z.string().optional(),
    image: z.string().optional(),
    slug: z.string(),
    comment: z.string(),
});

export const commentFormSchema = z.object({
    name: z.string().optional(),
    comment: z
        .string()
        .min(3, { message: 'Comment must be at least 3 characters long.' })
        .max(500, { message: 'Comment must be at most 500 characters long.' }),
});

export const bookmarkSchema = z.object({
    id: z.string(),
    user_id: z.string(),
});

export const postSlugSchema = z.object({
    slug: z.string(),
});

// Email validation schame for newsletter
export const emailSchema = z.object({
    email: z.string().email({ message: 'Email is required.' }),
});

// Contact form validation schema
export const contactFormSchema = z.object({
    name: z.string().min(3, { message: 'Name is required' }),
    email: z.string().email({ message: 'Email is required.' }),
    message: z
        .string()
        .min(4, {
            message: 'Your message must be at least 4 characters long.',
        })
        .max(320, {
            message: 'Your message cannot be more than 320 characters long.',
        }),
});

export function validationConfigMin(characters: number) {
    return `At least ${characters} characters required.`;
}

export function validationConfigMax(characters: number) {
    return `No morea than ${characters} characters required.`;
}
