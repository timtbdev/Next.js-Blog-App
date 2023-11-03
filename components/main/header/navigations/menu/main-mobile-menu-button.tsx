"use client";

import { cn } from "@/lib/utils";
import { Disclosure } from "@headlessui/react";
import { FC } from "react";

interface MainMobileMenuButtonProps {
  open: boolean;
}

const MainMobileMenuButton: FC<MainMobileMenuButtonProps> = ({ open }) => {
  return (
    <>
      <Disclosure.Button
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-t from-gray-100 via-gray-50 to-white text-gray-500 shadow-md shadow-black/5 ring-1 ring-black/10 transition duration-200 hover:bg-gradient-to-tr hover:from-gray-100 hover:via-gray-100 hover:to-gray-50 active:scale-[96%] active:ring-black/20",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute block h-0.5 w-5 bg-current transition-transform duration-500 ease-in-out",
            { "rotate-45": open },
            { "-translate-y-1.5": !open },
          )}
        ></span>
        <span
          aria-hidden="true"
          className={cn(
            "absolute block  h-0.5 w-5 bg-current transition-transform duration-500 ease-in-out",
            { "opacity-0": open },
          )}
        ></span>
        <span
          aria-hidden="true"
          className={cn(
            "absolute block  h-0.5 w-5 bg-current  transition-transform duration-500 ease-in-out",
            { "-rotate-45": open },
            { "translate-y-1.5": !open },
          )}
        ></span>
      </Disclosure.Button>
    </>
  );
};

export default MainMobileMenuButton;
