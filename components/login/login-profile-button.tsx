"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  dashBoardBookMark,
  dashBoardLogout,
  dashBoardPost,
  dashBoardSettings,
} from "@/config/shared/dashboard";
import { shimmer, toBase64 } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface LoginProfileButtonProps {
  profileImageUrl?: string;
}

const LoginProfileButton: FC<LoginProfileButtonProps> = ({
  profileImageUrl,
}) => {
  const supabase = createClient();
  const router = useRouter();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    }

    router.refresh();
  };

  return (
    <div className="flex sm:ml-4 sm:mt-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Image
            src={profileImageUrl || "/images/user-placeholder.png"}
            alt="Avatar"
            height={40}
            width={40}
            className="h-[40px] w-[40px] rounded-full"
            priority
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(40, 40),
            )}`}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 font-sans">
          <Link
            href={dashBoardPost.slug || ""}
            className="group inline-flex w-full items-center rounded-md bg-white px-3 py-1.5 hover:bg-gray-100"
          >
            <dashBoardPost.icon className="mr-2 h-4 w-4 text-gray-500 group-hover:text-gray-900" />
            <span className="text-sm text-gray-500 group-hover:text-gray-900">
              {dashBoardPost.title}
            </span>
          </Link>
          <DropdownMenuSeparator />

          <Link
            href={dashBoardBookMark.slug || ""}
            className="group inline-flex w-full items-center rounded-md bg-white px-3 py-1.5 hover:bg-gray-100"
          >
            <dashBoardBookMark.icon className="mr-2 h-4 w-4 text-gray-500 group-hover:text-gray-900" />
            <span className="text-sm text-gray-500 group-hover:text-gray-900">
              {dashBoardBookMark.title}
            </span>
          </Link>
          <DropdownMenuSeparator />

          <Link
            href={dashBoardSettings.slug || ""}
            className="group inline-flex w-full items-center rounded-md bg-white px-3 py-1.5 hover:bg-gray-100"
          >
            <dashBoardSettings.icon className="mr-2 h-4 w-4 text-gray-500 group-hover:text-gray-900" />
            <span className="text-sm text-gray-500 group-hover:text-gray-900">
              {dashBoardSettings.title}
            </span>
          </Link>
          <DropdownMenuSeparator />

          <button
            onClick={signOut}
            type="button"
            className="group inline-flex w-full items-center rounded-md bg-white px-3 py-1.5 hover:bg-gray-100"
          >
            <dashBoardLogout.icon className="mr-2 h-4 w-4 text-gray-500 group-hover:text-gray-900" />
            <span className="group-hover:text-gray-90 text-sm text-gray-500">
              {dashBoardLogout.title}
            </span>
          </button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LoginProfileButton;
