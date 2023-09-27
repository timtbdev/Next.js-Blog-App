import { Bars3Icon } from "@heroicons/react/20/solid";
import React, { Dispatch, FC, SetStateAction } from "react";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;
interface MobileMenuButtonProps {
  setSidebarOpen: Dispatcher<boolean>;
}

const MobileMenuButton: FC<MobileMenuButtonProps> = ({ setSidebarOpen }) => {
  return (
    <button
      type="button"
      className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
      onClick={() => setSidebarOpen(true)}
    >
      <span className="sr-only">Open sidebar</span>
      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
    </button>
  );
};

export default MobileMenuButton;
