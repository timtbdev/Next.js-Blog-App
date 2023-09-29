"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dashBoardLogout, dashBoardProfile } from "@/config/dashboard";
import { Profile } from "@/types/collection";
import { supabase } from "@/utils/supabase-client";
import { Session } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface ProfileDropDownProps {
  avatarUrl: string;
}

const ProfileDropDown: FC<ProfileDropDownProps> = ({ avatarUrl }) => {
  const router = useRouter();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    }

    router.refresh();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 font-sans">
          <Link
            href={dashBoardProfile.slug || ""}
            className="group inline-flex w-full items-center rounded-md bg-white px-3 py-2.5 hover:bg-gray-100"
          >
            <dashBoardProfile.icon className="mr-2 h-4 w-4 text-gray-500 group-hover:text-gray-900" />
            <span className="text-sm text-gray-500 group-hover:text-gray-900">
              {dashBoardProfile.title}
            </span>
          </Link>
          <DropdownMenuSeparator />

          <button
            onClick={signOut}
            type="button"
            className="group inline-flex w-full items-center rounded-md bg-white px-3 py-2.5 hover:bg-gray-100"
          >
            <dashBoardLogout.icon className="mr-2 h-4 w-4 text-gray-500 group-hover:text-gray-900" />
            <span className="group-hover:text-gray-90 text-sm text-gray-500 group-hover:text-gray-900">
              {dashBoardLogout.title}
            </span>
          </button>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileDropDown;
