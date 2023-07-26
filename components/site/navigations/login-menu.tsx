import LoginButton from "@/components/login/login-button";
import ProfileButton from "@/components/login/profile-button";
import supabase from "@/utils/supabase-server";
import React from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getData() {
  "use server";
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
}

const LoginMenu = async () => {
  const session = await getData();

  const profileImageUrl =
    session?.user?.user_metadata.picture ||
    session?.user?.user_metadata.avatar_url;

  return (
    <>
      {session ? (
        <ProfileButton
          email={session?.user?.user_metadata.email}
          profileImageUrl={profileImageUrl}
        />
      ) : (
        <LoginButton />
      )}
    </>
  );
};

export default LoginMenu;
