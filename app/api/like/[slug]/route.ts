import { postViewSchema } from '@/lib/validations';
import * as z from 'zod';
import { kv } from '@vercel/kv';

export async function DELETE(req: Request, context: z.infer<typeof postViewSchema>) {
    try {
        // Validate the route params.
        const { params } = postViewSchema.parse(context);

        // Get the IP address of the client.
        const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip');

        if (ip) {
            // Hash the IP in order to not store it directly in your db.
            const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip));
            const hash = Array.from(new Uint8Array(buf))
                .map((b) => b.toString(16).padStart(2, '0'))
                .join('');

            const likedIp = await kv.get(['likedIp', hash, params.slug].join(':'));

            if (likedIp) {
                const deleted = await kv.del(['likedIp', hash, params.slug].join(':'));
                if (deleted) return new Response(null, { status: 202 });
            }
        }

        return new Response(null, { status: 404 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 });
        }

        return new Response(null, { status: 500 });
    }
}

export async function POST(req: Request, context: z.infer<typeof postViewSchema>) {
    try {
        // Validate the route params.
        const { params } = postViewSchema.parse(context);

        // Get the IP address of the client.
        const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip');

        if (ip) {
            // Hash the IP in order to not store it directly in your db.
            const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip));
            const hash = Array.from(new Uint8Array(buf))
                .map((b) => b.toString(16).padStart(2, '0'))
                .join('');

            // deduplicate the ip for each slug
            const isNew = await kv.set(['likedIp', hash, params.slug].join(':'), true, {
                nx: true,
            });

            if (!isNew) {
                return new Response(null, { status: 202 });
            }
        }
        await kv.incr(['likes', 'posts', params.slug].join(':'));
        console.log('liked');
        return new Response(null, { status: 202 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 });
        }

        return new Response(null, { status: 500 });
    }
}

export async function GET(req: Request, context: z.infer<typeof postViewSchema>) {
    try {
        // Validate the route params.
        const { params } = postViewSchema.parse(context);

        // Get the IP address of the client.
        const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip');

        // Hash the IP in order to not store it directly in your db.
        const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip as string));
        const hash = Array.from(new Uint8Array(buf))
            .map((b) => b.toString(16).padStart(2, '0'))
            .join('');

        const likedIp = await kv.get(['likedIp', hash, params.slug].join(':'));

        return new Response(JSON.stringify(likedIp));
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 });
        }

        return new Response(null, { status: 500 });
    }
}
