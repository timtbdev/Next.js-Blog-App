import ProtectedFooter from '@/components/protected/protected-footer';
import ProtectedHeader from '@/components/protected/protected-header';
import supabase from '@/utils/supabase-server';
import { redirect } from 'next/navigation';
import React from 'react';

export const dynamic = 'force-dynamic';

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = async ({ children }) => {
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
        // This route can only be accessed by authenticated users.
        // Unauthenticated users will be redirected to the `/login` route.
        redirect('/login');
    }
    return (
        <>
            <ProtectedHeader />
            {children}
            <ProtectedFooter />
        </>
    );
};

export default ProtectedLayout;
