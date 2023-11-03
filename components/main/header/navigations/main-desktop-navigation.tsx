import { LoginMenu } from "@/components/login";
import { IconWrapperRounded, LogoIcon } from "@/icons";
import Link from "next/link";
import React from "react";
import { MainDesktopNavigationMenu } from "./menu";

const MainDesktopNavigation = () => {
  return (
    <>
      <nav className="mx-auto hidden max-w-5xl items-center justify-between px-2 py-4 md:flex">
        {/* Logo */}
        <div className="flex flex-1 justify-start pl-2">
          <Link href="/">
            <IconWrapperRounded>
              <LogoIcon className="h-10 w-10" />
            </IconWrapperRounded>
          </Link>
        </div>

        {/* Navigation */}
        <div>
          <div className="flex flex-1 gap-x-6">
            <MainDesktopNavigationMenu />
          </div>
        </div>

        {/* Login Menu */}
        <div className="flex flex-1 justify-end">
          <LoginMenu />
        </div>
      </nav>
    </>
  );
};

export default MainDesktopNavigation;
