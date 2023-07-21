"use client";
import { menus } from "@/config/menu";
import { Disclosure, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { ExoticComponent, FC, ReactNode } from "react";
import { v4 } from "uuid";

interface MobileNavProps {
  fragment: ExoticComponent<{
    children?: ReactNode | undefined;
  }>;
}

const MobileNav: FC<MobileNavProps> = ({ fragment }) => {
  const router = useRouter();

  return (
    <>
      <Transition
        as={fragment}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-300"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Disclosure.Panel className="border-t w-full border-dashed border-slate-400 lg:hidden">
          {menus.map((menu) => (
            <Disclosure.Button
              key={v4()}
              as="a"
              onClick={() =>
                router.push(
                  menu.slug === "/" ? menu.slug : `/category/${menu.slug}`
                )
              }
            >
              <div className="group flex items-center gap-x-6 border-b border-dashed border-black/30 bg-gray-50 px-8 py-3 text-base font-semibold leading-7 text-gray-600 transition-colors hover:bg-gray-200">
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-black/10 bg-gray-100 shadow-md shadow-black/5 transition duration-200 group-hover:bg-gray-50">
                  <menu.icon
                    className="h-6 w-6 text-gray-600"
                    aria-hidden="true"
                  />
                </div>

                {menu.title}
              </div>
            </Disclosure.Button>
          ))}
        </Disclosure.Panel>
      </Transition>
    </>
  );
};

export default MobileNav;
