import SettingsProfile from "@/components/protected/settings/settings-profile";
import { Profile } from "@/types/collection";
import type { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";

export const revalidate = 0;

async function getUserId() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.log("Error has occured while getting UserId!");
    console.log("Error message : ", error.message);
    return null;
  }

  return session ? session.user.id : null;
}

const SettingsPage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const userId = await getUserId();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .match({ id: userId })
    .single<Profile>();

  if (error) {
    console.log(error);
    throw Error;
  }

  if (!data) {
    notFound;
    console.log("Cound't find User profile.");
  }

  return (
    <div className="max-w-3xl px-10">
      <SettingsProfile user={data} />
    </div>
  );
};

export default SettingsPage;
