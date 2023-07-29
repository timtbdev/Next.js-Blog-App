"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { loginConfig } from "@/config/login";
import { supabase } from "@/utils/supabase-client";
import {
  BookMarkedIcon,
  FilePlus2Icon,
  FileTextIcon,
  LogOut,
  SettingsIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

interface ProfileButtonProps {
  email?: string;
  profileImageUrl?: string;
}

const ProfileButton: FC<ProfileButtonProps> = ({ email, profileImageUrl }) => {
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
            <AvatarFallback>MN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 font-sans">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none text-gray-500">
                {email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push("/saved")}>
            <FilePlus2Icon className="mr-2 h-4 w-4 text-gray-500" />
            <span className="text-md text-gray-500">{loginConfig.new}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push("/saved")}>
            <FileTextIcon className="mr-2 h-4 w-4 text-gray-500" />
            <span className="text-md text-gray-500">{loginConfig.posts}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push("/saved")}>
            <BookMarkedIcon className="mr-2 h-4 w-4 text-gray-500" />
            <span className="text-md text-gray-500">{loginConfig.saved}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push("/saved")}>
            <SettingsIcon className="mr-2 h-4 w-4 text-gray-500" />
            <span className="text-md text-gray-500">
              {loginConfig.settings}
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut}>
            <LogOut className="mr-2 h-4 w-4 text-gray-500" />
            <span className="text-md text-gray-500">{loginConfig.logOut}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileButton;
