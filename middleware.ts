import type { Database } from '@/types/supabase';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    // Supabase client
    const supabase = createMiddlewareClient<Database>({ req, res });
    await supabase.auth.getSession();

    // Get the IP address of the client.
    let ip = req.ip ?? req.headers.get('x-real-ip');
    const forwardedFor = req.headers.get('x-forwarded-for');
    if (!ip && forwardedFor) {
        ip = forwardedFor.split(',').at(0) ?? 'Unknown';
    }
    if (ip) {
        res.cookies.set('user-ip', ip, {
            httpOnly: false,
        });
    }
    return res;
}
