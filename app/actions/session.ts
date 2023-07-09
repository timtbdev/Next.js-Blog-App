"use server";
import supabase from "@/utils/supabase-server";

export async function getSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return null;
  }

  const profileImageUrl =
    session?.user?.user_metadata.picture ||
    session?.user?.user_metadata.avatar_url;

  const userEmail = session?.user?.user_metadata.email;

  return [userEmail, profileImageUrl, session];
}
