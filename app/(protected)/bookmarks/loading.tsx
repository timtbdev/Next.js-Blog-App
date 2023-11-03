import { SharedTableLoading } from "@/components/shared";
import React from "react";

export default function Loading() {
  return (
    <>
      <div className="mx-auto flex max-w-7xl items-center justify-center px-5 py-10">
        <SharedTableLoading />
      </div>
    </>
  );
}
