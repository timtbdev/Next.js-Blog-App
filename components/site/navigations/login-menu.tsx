import LoginButton from "@/components/login/login-button";
import ProfileButton from "@/components/login/profile-button";
import supabase from "@/utils/supabase-server";
import React from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

const LoginMenu = async () => {
  const user = await getUser();

  const profileImageUrl =
    user?.user_metadata.picture || user?.user_metadata.avatar_url;

  return (
    <>
      {user ? (
        <ProfileButton
          email={user?.user_metadata.email}
          profileImageUrl={profileImageUrl}
        />
      ) : (
        <LoginButton />
      )}
    </>
  );
};

export default LoginMenu;
