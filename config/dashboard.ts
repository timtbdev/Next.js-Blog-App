import { DashBoardAttributes, DashBoardPageAttributes } from "@/types";
import {
  BookMarkedIcon,
  LayoutGridIcon as DashBoardIcon,
  HeartIcon as LikeIcon,
  LogOut,
  FilePlus2Icon as NewIcon,
  FileTextIcon as PostIcon,
  SettingsIcon,
  UserCircle,
} from "lucide-react";

const post: DashBoardAttributes = {
  title: "Posts",
  slug: "/editor/posts",
  icon: PostIcon,
};

const bookmarks: DashBoardAttributes = {
  title: "Bookmarks",
  slug: "/bookmarks",
  icon: BookMarkedIcon,
};

const settings: DashBoardAttributes = {
  title: "Settings",
  slug: "/settings",
  icon: SettingsIcon,
};
// Because of weird key warnings for shadcn ui MenuItem used seperate DashboardMenu constants
export const dashBoardMenus = {
  post,
  bookmarks,
  settings,
};
// Because of weird key warnings for shadcn ui MenuItem used seperate DashboardMenu constants
export const dashBoardMenusLoop: DashBoardAttributes[] = [
  {
    title: "Posts",
    slug: "/editor/posts",
    icon: PostIcon,
  },
  {
    title: "Bookmarks",
    slug: "/bookmarks",
    icon: BookMarkedIcon,
  },
  {
    title: "Settings",
    slug: "/settings",
    icon: SettingsIcon,
  },
];

export const dashBoardPages: DashBoardPageAttributes[] = [
  {
    title: "About",
    slug: "/pages/about",
    initial: "AB",
  },
  {
    title: "Terms",
    slug: "/pages/terms",
    initial: "TS",
  },
  {
    title: "Policy",
    slug: "/pages/policy",
    initial: "PY",
  },
  {
    title: "Contact",
    slug: "/pages/contact",
    initial: "CT",
  },
];

export const dashBoardLogout: DashBoardAttributes = {
  title: "Sign Out",
  slug: "/logout",
  icon: LogOut,
};
export const dashBoardProfile: DashBoardAttributes = {
  title: "Profile",
  slug: "/profile",
  icon: UserCircle,
};
