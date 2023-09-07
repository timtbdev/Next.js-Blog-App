import LoadingTable from "@/components/loading/table";
import React from "react";

export default function Loading() {
  return (
    <>
      <div className="mx-auto flex max-w-7xl items-center justify-center px-5 py-10">
        <LoadingTable />
      </div>
    </>
  );
}
