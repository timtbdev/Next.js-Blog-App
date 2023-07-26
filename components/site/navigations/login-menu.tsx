"use client";

import LoginButton from "@/components/login/login-button";
import ProfileButton from "@/components/login/profile-button";
import { supabase } from "@/utils/supabase-client";
import { Session, User } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const LoginMenu = () => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      //router.refresh();
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      {session ? (
        <ProfileButton
          email={session.user.user_metadata.email}
          profileImageUrl={
            session.user.user_metadata.picture ||
            session.user.user_metadata.avatar_url
          }
        />
      ) : (
        <LoginButton />
      )}
    </>
  );
};

export default LoginMenu;
