import { DashBoardAttributes } from "@/types";
import {
  BookMarkedIcon,
  LogOut,
  FilePlus2Icon as NewIcon,
  FileTextIcon as PostIcon,
  SettingsIcon,
} from "lucide-react";

export const dashBoardMenus: DashBoardAttributes[] = [
  {
    title: "Шинэ нийтлэл",
    slug: "/dashboard/new",
    icon: NewIcon,
  },
  {
    title: "Бичсэн нийтлэл",
    slug: "/dashboard/posts",
    icon: PostIcon,
  },
  {
    title: "Хадгалсан нийтлэл",
    slug: "/dashboard/bookmarks",
    icon: BookMarkedIcon,
  },
  {
    title: "Тохиргоо",
    slug: "/dashboard/settings",
    icon: SettingsIcon,
  },
];

export const dashBoardLogout = {
  title: "Гарах",
  icon: LogOut,
};
