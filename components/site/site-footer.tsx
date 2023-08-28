import React, { FC } from 'react';
import { footerConfig } from '@/config/footer';
import { v4 } from 'uuid';
import Link from 'next/link';

export default function SiteFooter() {
    return (
        <footer className="border-t border-gray-900/10">
            <div className="mx-auto w-full max-w-3xl px-2 py-3 md:flex md:items-center md:justify-between">
                <div className="flex justify-center space-x-6 md:order-2">
                    {footerConfig.socials.map((item) => (
                        <Link
                            key={v4()}
                            href={item.href}
                            className="text-slate-400 hover:text-slate-500 focus-visible:border-blue-500 dark:text-slate-500 dark:hover:text-slate-400 dark:focus-visible:border-orange-500"
                        >
                            <span className="sr-only">{item.name}</span>
                            <item.icon className="h-6 w-6" aria-hidden="true" />
                        </Link>
                    ))}
                </div>
                <div className="mt-4 md:order-1 md:mt-0">
                    <p className="text-center text-base text-slate-500 dark:text-slate-400">
                        &copy; {footerConfig.copyright}
                    </p>
                </div>
            </div>
        </footer>
    );
}
