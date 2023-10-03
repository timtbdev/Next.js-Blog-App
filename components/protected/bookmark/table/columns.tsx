"use client";

import { DataTableRowActions } from "@/components/protected/bookmark/table/data-table-row-actions";
import { categories } from "@/components/protected/post/table//data/data";
import { DataTableColumnHeader } from "@/components/protected/post/table/data-table-column-header";
import { Post } from "@/types/collection";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "category_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const label = categories.find(
        (category) => category.value === row.getValue("category_id"),
      );

      if (!label) {
        return null;
      }

      return (
        <div className="flex space-x-2">
          <div className="max-w-[500px] justify-start truncate font-medium">
            <span className="inline-flex items-center rounded-full border border-gray-400 px-3 py-1 text-sm text-gray-500">
              <label.icon className="mr-1 h-4 w-4" />
              {label.label}
            </span>
          </div>
        </div>
      );
    },
    enableHiding: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => {
      const date = format(new Date(row.getValue("created_at")), "MM/dd/yyyy");

      if (!date) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          <span>{date}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableHiding: false,
    enableSorting: false,
  },
];
