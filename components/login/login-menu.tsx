"use client";

import { Profile } from "@/types/collection";
import { createClient } from "@/utils/supabase/client";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import LoginButton from "./login-button";
import LoginProfileButton from "./login-profile-button";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const LoginMenu = () => {
  const supabase = createClient();
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
  }, [supabase.auth]);

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
        <LoginProfileButton profileImageUrl={avatarUrl} />
      ) : (
        <LoginButton />
      )}
    </>
  );
};

export default LoginMenu;
