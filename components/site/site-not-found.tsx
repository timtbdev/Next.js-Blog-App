"use client";

import { AlertTriangleIcon, ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const SiteNotFound = () => {
  const router = useRouter();
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
      <AlertTriangleIcon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">Алдаа</h3>
      <p className="mt-1 text-sm text-gray-500">
        Таны хайсан нийтлэл олдсонгүй!
      </p>
      <div className="mt-6">
        <button
          type="button"
          onClick={() => {
            router.back();
          }}
          className="inline-flex items-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
        >
          <ArrowLeftIcon
            className="-ml-0.5 mr-1.5 h-5 w-5"
            aria-hidden="true"
          />
          Буцах
        </button>
      </div>
    </div>
  );
};

export default SiteNotFound;
