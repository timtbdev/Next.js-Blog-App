import { dashBoardLogout, dashBoardMenusLoop } from "@/config/dashboard";
import { cn, getUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { v4 } from "uuid";

const DesktopSidebar = () => {
  const currentPath = usePathname();
  const path = currentPath.split("/");
  const pathSlug = `/${path.slice(1, 3).join("/")}`;
  return (
    <>
      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <Link href={getUrl()} className="flex h-16 shrink-0 items-center">
            <Image
              className="h-[40px]w-[40px]w-auto"
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
                  {dashBoardMenusLoop.map((menu) => (
                    <li key={v4()}>
                      <Link
                        href={menu.slug || ""}
                        className={cn(
                          currentPath === menu.slug ||
                            (path.length > 3 && pathSlug === menu.slug)
                            ? "bg-gray-50 text-orange-600"
                            : "text-gray-700 hover:bg-gray-50 hover:text-orange-600",
                          "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                        )}
                      >
                        <menu.icon
                          className={cn(
                            currentPath === menu.slug
                              ? "text-orange-600"
                              : "text-gray-400 group-hover:text-orange-600",
                            "h-6 w-6 shrink-0",
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
      </div>
    </>
  );
};

export default DesktopSidebar;
