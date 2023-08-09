import { DashBoardAttributes } from "@/types";
import {
  BookMarkedIcon,
  LayoutGridIcon as DashBoardIcon,
  LogOut,
  FilePlus2Icon as NewIcon,
  FileTextIcon as PostIcon,
  SettingsIcon,
} from "lucide-react";

export const dashBoardMenus: DashBoardAttributes[] = [
  {
    title: "Хяналтын самбар",
    icon: DashBoardIcon,
  },
  {
    title: "Шинэ нийтлэл",
    slug: "new",
    icon: NewIcon,
  },
  {
    title: "Бичсэн нийтлэл",
    slug: "posts",
    icon: PostIcon,
  },
  {
    title: "Хадгалсан нийтлэл",
    slug: "bookmarks",
    icon: BookMarkedIcon,
  },
  {
    title: "Тохиргоо",
    slug: "settings",
    icon: SettingsIcon,
  },
  {
    title: "Гарах",
    slug: "logout",
    icon: LogOut,
  },
];

export const dashBoardConfig = {
  title: "Хяналтын самбар",
  description: "Хяналтын самбар",
  slug: "dashboard",
};
