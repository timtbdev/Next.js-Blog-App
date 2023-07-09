import React from "react";
import Link from "next/link";
import IconWrapperRounded from "@/components/icons/icon-wrapper-rounded";
import LogoIcon from "@/components/icons/logo";
import DesktopNav from "@/components/site/navigations/desktop-navigation";
import LoginMenu from "@/components/site/navigations/login-menu";

const SiteDesktopNav = () => {
  return (
    <>
      <nav className="hidden mx-auto md:flex max-w-5xl items-center justify-between px-2 py-4">
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
          <div className="gap-x-6 flex flex-1">
            <DesktopNav />
          </div>
        </div>

        {/* Login Menu */}
        <div className="justify-end flex flex-1">
          <LoginMenu />
        </div>
      </nav>
    </>
  );
};

export default SiteDesktopNav;
