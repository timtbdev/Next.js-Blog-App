"use client";

import LoginHeader from "@/components/login/login-header";
import LoginSection from "@/components/login/login-section";
import React from "react";

const LoginPage = () => {
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
