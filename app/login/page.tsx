"use client";

import LoginHeader from "@/components/login/login-header";
import LoginSection from "@/components/login/login-section";
import { supabase } from "@/utils/supabase-client";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const LoginPage = () => {
  const router = useRouter();
  useEffect(() => {
    const user = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      user && router.replace("/editor/posts");
    };
    user();
  }, []);

  return (
    <>
      <LoginHeader />{" "}
      <div className="mx-auto mt-5 max-w-md">
        <LoginSection />
      </div>
    </>
  );
};

export default LoginPage;
