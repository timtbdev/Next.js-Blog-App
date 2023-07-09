import { MenuAttributes } from "@/types";
import {
  CircleDollarSignIcon,
  CpuIcon,
  FlaskConicalIcon,
  HeartPulseIcon,
  HomeIcon,
} from "lucide-react";

export const menus: MenuAttributes[] = [
  {
    id: "",
    title: "Эхлэл",
    slug: "/",
    icon: HomeIcon,
  },
  {
    id: "4db30a13-2797-4c7d-a0ce-e0c127287a39",
    title: "Шинжлэх ухаан",
    slug: "science",
    icon: FlaskConicalIcon,
  },
  {
    id: "c13ae4a7-476c-4608-9b7a-9ec9488c42e4",
    title: "Эрүүл мэнд",
    slug: "health",
    icon: HeartPulseIcon,
  },
  {
    id: "7b8781b0-b4fa-40e4-ac23-5310640eecd7",
    title: "Маркетинг",
    slug: "marketing",
    icon: CircleDollarSignIcon,
  },
  {
    id: "962f860d-ab0d-4650-ae93-8171c8b47169",
    title: "Технологи",
    slug: "technology",
    icon: CpuIcon,
  },
];
