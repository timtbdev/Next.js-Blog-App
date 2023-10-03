"use client";

import BookMarkDeleteButton from "@/components/protected/bookmark/buttons/bookmark-delete-button";
import { Row } from "@tanstack/react-table";
import BookMarkViewButton from "../buttons/bookmark-view-button";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  return (
    <div className="inline-flex items-center space-x-2">
      {/* @ts-ignore */}
      <BookMarkViewButton slug={row.original.slug} />
      {/* @ts-ignore */}
      <BookMarkDeleteButton id={row.original.id} />
    </div>
  );
}
