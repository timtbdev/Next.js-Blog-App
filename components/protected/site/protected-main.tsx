"use client";

import { FC, ReactNode, useState } from "react";
import DesktopSidebar from "./sidebars/desktop-sidebar";
import MobileSidebar from "./sidebars/mobile-sidebar";
import MobileMenuButton from "./sub-components/mobile-menu-button";
import ProfileDropDown from "./sub-components/profile-dropdown";
import SearchBar from "./sub-components/searchbar";

interface ProtectedMainProps {
  children?: ReactNode;
}

const ProtectedMain: FC<ProtectedMainProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  return (
    <>
      <MobileSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <DesktopSidebar />
      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <MobileMenuButton setSidebarOpen={setSidebarOpen} />

          {/* Separator */}
          <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <SearchBar />
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Separator */}
              <div
                className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
                aria-hidden="true"
              />

              <ProfileDropDown />
            </div>
          </div>
        </div>
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </>
  );
};

export default ProtectedMain;
