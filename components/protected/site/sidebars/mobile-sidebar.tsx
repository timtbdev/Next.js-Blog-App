"use client";

import { dashBoardMenu } from "@/config/shared/dashboard";
import { cn, getUrl } from "@/lib/utils";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, FC, Fragment, SetStateAction } from "react";
import { v4 } from "uuid";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface MobileSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatcher<boolean>;
}

const MobileSidebar: FC<MobileSidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const currentPath = usePathname();
  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                  <Link
                    href={getUrl()}
                    className="flex h-16 shrink-0 items-center"
                  >
                    <Image
                      className="h-[40px] w-[40px]"
                      src="/images/logo.png"
                      alt="Logo"
                      height={40}
                      width={40}
                      priority
                    />
                  </Link>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {dashBoardMenu.map((menu) => (
                            <li key={v4()}>
                              <Link
                                href={menu.slug || ""}
                                className={cn(
                                  currentPath === menu.slug
                                    ? "bg-gray-50 text-orange-600"
                                    : "text-gray-700 hover:bg-gray-50 hover:text-orange-600",
                                  "group flex gap-x-3 rounded-md p-2 font-sans text-sm font-semibold leading-6",
                                )}
                              >
                                <menu.icon
                                  className={cn(
                                    currentPath === menu.slug
                                      ? "text-orange-600"
                                      : "text-gray-400 group-hover:text-orange-600",
                                    "h-6 w-6 shrink-0 font-sans",
                                  )}
                                  aria-hidden="true"
                                />
                                {menu.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default MobileSidebar;
