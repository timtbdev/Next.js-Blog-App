'use server';

import { getHash } from '@/lib/utils';
import { kv } from '@vercel/kv';
import { cookies } from 'next/headers';

export async function setPostLike(slug: string) {
    const raw = cookies().get('user-ip')?.value ?? '';
    const hashed = getHash(raw);
    const isNew = await kv.set(['likedIp', hashed, slug].join(':'), true, {
        nx: true,
    });
    if (isNew === 'OK') {
        const response = await kv.incr(['likes', 'post', slug].join(':'));
        return response ? true : false;
    }
    return false;
}
