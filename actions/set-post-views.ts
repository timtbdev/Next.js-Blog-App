'use server';

import { getHash } from '@/lib/utils';
import { kv } from '@vercel/kv';
import { cookies } from 'next/headers';

export async function setPostViews(slug: string) {
    const raw = cookies().get('user-ip')?.value ?? '';
    const hashed = getHash(raw);
    const isNew = await kv.set(['viewedIp', hashed, slug].join(':'), true, {
        nx: true,
        ex: 24 * 60 * 60,
    });
    if (!isNew) {
        return 0;
    }
    await kv.incr(['views', 'post', slug].join(':'));
    return 1;
}
