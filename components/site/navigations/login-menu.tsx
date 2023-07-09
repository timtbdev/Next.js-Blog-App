import React from "react";
import supabase from "@/utils/supabase-server";
import LoginButton from "@/components/login/login-button";
import ProfileButton from "@/components/login/profile-button";

const LoginMenu = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

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
