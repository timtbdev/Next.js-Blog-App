import * as z from 'zod';

export const bookmarkSchema = z.object({
    id: z.string(),
    user_id: z.string(),
});
