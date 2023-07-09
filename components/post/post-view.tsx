"use client";

import { useEffect } from "react";

export const ReportView: React.FC<{ slug: string }> = ({ slug }) => {
  useEffect(() => {
    const response = fetch(`/api/counter/${slug}`, {
      method: "POST",
    });
  }, [slug]);

  return null;
};
