"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dashBoardMenus } from "@/config/dashboard";
import { supabase } from "@/utils/supabase-client";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { v4 } from "uuid";

interface ProfileButtonProps {
  profileImageUrl?: string;
}

const ProfileButton: FC<ProfileButtonProps> = ({ profileImageUrl }) => {
  const router = useRouter();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    }

    router.refresh();
  };

  return (
    <div className="mt-3 flex sm:ml-4 sm:mt-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src={profileImageUrl} />
            <AvatarFallback>UB</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 font-sans">
          {dashBoardMenus.map((menu) =>
            menu.slug == "logout" ? (
              <DropdownMenuItem key={v4()} onClick={signOut}>
                <menu.icon className="mr-2 h-4 w-4 text-gray-500" />
                <span className="text-md text-gray-500">{menu.title}</span>
              </DropdownMenuItem>
            ) : (
              <>
                <DropdownMenuItem
                  key={v4()}
                  onClick={() => router.push(`/${menu.slug ? menu.slug : ""}`)}
                >
                  <menu.icon className="mr-2 h-4 w-4 text-gray-500" />
                  <span key={v4()} className="text-md text-gray-500">
                    {menu.title}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            ),
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileButton;
