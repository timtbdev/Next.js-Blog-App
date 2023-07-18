"use server";
import { kv } from "@vercel/kv";
import { cookies } from "next/headers";
import { getHash } from "@/lib/utils";

export async function setPostUnlike(slug: string) {
  const raw = cookies().get("user-ip")?.value ?? "";
  const hashed = getHash(raw);
  const removed = await kv.del(["likedIp", hashed, slug].join(":"));
  if (removed === 1) {
    const likes = await kv.decr(["likes", "post", slug].join(":"));
    return likes >= 0 ? true : false;
  } else {
    return false;
  }
}
