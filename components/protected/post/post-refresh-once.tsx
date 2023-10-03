"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const PostRefreshOnce = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    if (search === "refresh") {
      router.refresh();
    }
  }, [search, router]);
  return null;
};

export default PostRefreshOnce;
