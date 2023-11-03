"use client";

import {
  ProtectedBookMarkDeleteButton,
  ProtectedBookMarkViewButton,
} from "@/components/protected/bookmark";
import { Row } from "@tanstack/react-table";

interface ProtectedBookMarkTableRowActionsProps<TData> {
  row: Row<TData>;
}

export default function ProtectedBookMarkTableRowActions<TData>({
  row,
}: ProtectedBookMarkTableRowActionsProps<TData>) {
  return (
    <div className="inline-flex items-center space-x-2">
      {/* @ts-ignore */}
      <ProtectedBookMarkViewButton slug={row.original.slug} />
      {/* @ts-ignore */}
      <ProtectedBookMarkDeleteButton id={row.original.id} />
    </div>
  );
}
