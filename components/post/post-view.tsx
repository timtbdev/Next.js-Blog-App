"use client";

import { useEffect } from "react";

export const ReportView: React.FC<{ slug: string }> = ({ slug }) => {
  const slugSingle = slug.split("/")[2];
  useEffect(() => {
    const response = fetch(`/api/counter/${slugSingle}`, {
      method: "POST",
    });
  }, [slugSingle]);

  return null;
};
