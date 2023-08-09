"use client";

import Health from "@/components/icons/health";
import Home from "@/components/icons/home";
import Marketing from "@/components/icons/marketing";
import Science from "@/components/icons/science";
import Technology from "@/components/icons/technology";
import User from "@/components/icons/user";
import { dashBoardMenus } from "@/config/dashboard";
import { loginMenu, menus } from "@/config/menu";
import { supabase } from "@/utils/supabase-client";
import { Disclosure, Transition } from "@headlessui/react";
import { Session } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ExoticComponent, FC, ReactNode, useEffect, useState } from "react";
import { v4 } from "uuid";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface MobileNavProps {
  fragment: ExoticComponent<{
    children?: ReactNode | undefined;
  }>;
}

const MobileNav: FC<MobileNavProps> = ({ fragment }) => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    }

    router.refresh();
  };

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
        <Disclosure.Panel className="w-full border-t border-black/5 bg-gray-50 lg:hidden">
          {menus.map((menu) => (
            <Disclosure.Button
              key={v4()}
              as="a"
              onClick={() =>
                router.push(
                  menu.slug === "/" ? menu.slug : `/category/${menu.slug}`,
                )
              }
            >
              <div className="group flex items-center gap-x-6 border-b border-black/5 px-8 py-3 text-base font-semibold leading-7 text-gray-600 transition-colors hover:bg-gray-200">
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-black/10 shadow-md shadow-black/5 transition duration-200 group-hover:bg-gray-50">
                  {menu.slug === "/" && <Home className="h-6 w-6" />}
                  {menu.slug === "health" && <Health className="h-6 w-6" />}
                  {menu.slug === "science" && <Science className="h-6 w-6" />}
                  {menu.slug === "technology" && (
                    <Technology className="h-6 w-6" />
                  )}
                  {menu.slug === "marketing" && (
                    <Marketing className="h-6 w-6" />
                  )}
                </div>

                {menu.title}
              </div>
            </Disclosure.Button>
          ))}
          {session ? (
            <>
              {/* Dashboard */}
              <Disclosure.Button
                as="a"
                onClick={() =>
                  router.push(
                    `/${dashBoardMenus[dashBoardMenus.length - 1].slug}`,
                  )
                }
              >
                <div className="bg-gray-00 group flex items-center gap-x-6 border-b border-black/5 bg-gray-200 px-8 py-3 text-base font-semibold leading-7 text-gray-600 transition-colors hover:bg-gray-300">
                  <Image
                    src={
                      session.user.user_metadata.picture ||
                      session.user.user_metadata.avatar_url
                    }
                    height={40}
                    width={40}
                    alt="Profile image"
                    className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-black/10 bg-gray-100 shadow-md shadow-black/5 transition duration-200 group-hover:bg-gray-50"
                  />

                  {dashBoardMenus[dashBoardMenus.length - 1].title}
                </div>
              </Disclosure.Button>
            </>
          ) : (
            // Login button
            <Disclosure.Button
              as="a"
              onClick={() => router.push(`/${loginMenu.slug}`)}
            >
              <div className="group flex items-center gap-x-6 border-b border-black/5 bg-gray-200 px-8 py-3 text-base font-semibold leading-7 text-gray-600 transition-colors hover:bg-gray-200">
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-black/10 shadow-md shadow-black/5 transition duration-200 group-hover:bg-gray-50">
                  <User className="h-6 w-6" />
                </div>

                {loginMenu.title}
              </div>
            </Disclosure.Button>
          )}
        </Disclosure.Panel>
      </Transition>
    </>
  );
};

export default MobileNav;
