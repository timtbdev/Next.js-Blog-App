"use client";

import PostEditButton from "@/components/protected/post/buttons/post-edit-button";
import { Row } from "@tanstack/react-table";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  return <PostEditButton id={row.getValue("id")} />;
}
