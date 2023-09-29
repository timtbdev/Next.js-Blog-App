"use client";

import LoginButton from "@/components/login/login-button";
import ProfileButton from "@/components/login/profile-button";
import { Profile } from "@/types/collection";
import { supabase } from "@/utils/supabase-client";
import { Session } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const LoginMenu = () => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    async function fetchAvatar() {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .match({ id: session?.user.id })
        .single<Profile>();
      if (data) {
        setAvatarUrl(data.avatar_url ? data.avatar_url : "");
      }
    }
    fetchAvatar();
  }, [session]);

  return (
    <>
      {session ? (
        <ProfileButton profileImageUrl={avatarUrl} />
      ) : (
        <LoginButton />
      )}
    </>
  );
};

export default LoginMenu;
