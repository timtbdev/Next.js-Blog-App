import type { Database } from '@/types/supabase';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    // Supabase client
    const supabase = createMiddlewareClient<Database>({ req, res });
    await supabase.auth.getSession();
    return res;
}
