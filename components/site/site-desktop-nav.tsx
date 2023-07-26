import IconWrapperRounded from "@/components/icons/icon-wrapper-rounded";
import LogoIcon from "@/components/icons/logo";
import DesktopNav from "@/components/site/navigations/desktop-navigation";
import LoginMenu from "@/components/site/navigations/login-menu";
import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SiteDesktopNav = () => {
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
            <DesktopNav />
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

export default SiteDesktopNav;
