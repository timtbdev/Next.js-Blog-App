'use client';

import { menus } from '@/config/menu';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { v4 } from 'uuid';

const DesktopNav = () => {
    const currentPath = usePathname();
    return (
        <>
            <div className="hidden gap-x-6 md:flex">
                {menus.map((menu) => (
                    <Link
                        href={menu.slug === '/' ? menu.slug : `/category/${menu.slug}`}
                        key={v4()}
                        className={cn(
                            'relative font-semibold tracking-tight [word-spacing:-5px] antialiased inline-flex items-center rounded-full px-4 py-1.5 text-base text-gray-500 ring-1 ring-transparent transition duration-200 active:scale-[96%] active:ring-black/20',
                            {
                                'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-50 px-4 shadow-md shadow-black/5 ring-1 ring-black/10 text-gray-600':
                                    currentPath === (menu.slug === '/' ? menu.slug : `/category/${menu.slug}`),
                            },
                            {
                                'bg-transparent ring-transparent hover:bg-gradient-to-tr hover:from-gray-200 hover:via-gray-100 hover:to-gray-50 hover:shadow-md hover:shadow-black/5 hover:ring-1 hover:ring-black/10':
                                    currentPath !== (menu.slug === '/' ? menu.slug : `/category/${menu.slug}`),
                            }
                        )}
                    >
                        <div className="relative">{menu.title}</div>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default DesktopNav;
