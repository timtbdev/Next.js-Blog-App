import React, { FC } from 'react';
import { footerConfig } from '@/config/footer';
import { v4 } from 'uuid';
import Link from 'next/link';

export default function SiteFooter() {
    return (
        // <footer className="border-t border-gray-900/10">
        //     <div className="mx-auto w-full max-w-3xl px-2 py-3 md:flex md:items-center md:justify-between">
        //         <div className="flex justify-center space-x-6 md:order-2">
        //             {footerConfig.socials.map((item) => (
        //                 <Link
        //                     key={v4()}
        //                     href={item.href}
        //                     className="text-slate-400 hover:text-slate-500 focus-visible:border-blue-500 dark:text-slate-500 dark:hover:text-slate-400 dark:focus-visible:border-orange-500"
        //                 >
        //                     <span className="sr-only">{item.name}</span>
        //                     <item.icon className="h-6 w-6" aria-hidden="true" />
        //                 </Link>
        //             ))}
        //         </div>
        //         <div className="mt-4 md:order-1 md:mt-0">
        //             <p className="text-center text-base text-slate-500 dark:text-slate-400">
        //                 &copy; {footerConfig.copyright}
        //             </p>
        //         </div>
        //     </div>
        // </footer>

        <footer className="border-t border-gray-900/10 bg-white">
            <div className="mx-auto max-w-7xl overflow-hidden px-6 py-5 lg:px-8">
                <nav className="flex justify-center space-x-12" aria-label="Footer">
                    {footerConfig.menus.map((item) => (
                        <div key={item.name}>
                            <a href={item.href} className="text-md leading-6 text-gray-600 hover:text-gray-900">
                                {item.name}
                            </a>
                        </div>
                    ))}
                </nav>
                <div className="mt-5 flex justify-center space-x-10">
                    {footerConfig.socials.map((item) => (
                        <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
                            <span className="sr-only">{item.name}</span>
                            <item.icon className="h-6 w-6" aria-hidden="true" />
                        </a>
                    ))}
                </div>
                <p className="text-md mt-5 text-center leading-5 text-gray-500">&copy; {footerConfig.copyright}</p>
            </div>
        </footer>
    );
}
