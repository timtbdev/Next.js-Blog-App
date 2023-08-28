'use client';

import IconWrapperRounded from '@/components/icons/icon-wrapper-rounded';
import LogoIcon from '@/components/icons/logo';
import MobileMenuButton from '@/components/site/navigations/mobile-menu-button';
import MobileNav from '@/components/site/navigations/mobile-navigation';
import { Disclosure } from '@headlessui/react';
import Link from 'next/link';
import React, { Fragment } from 'react';

const SiteMobileNav = () => {
    return (
        <Disclosure>
            {({ open }) => (
                <>
                    <nav className="mx-auto flex max-w-5xl items-center justify-between bg-gray-50 px-6 py-4 md:hidden">
                        {/* Logo */}
                        <div className="flex flex-1 justify-start pl-2">
                            <Link href="/">
                                <IconWrapperRounded>
                                    <LogoIcon className="h-10 w-10" />
                                </IconWrapperRounded>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex flex-1 justify-end pr-2">
                            <MobileMenuButton open={open} />
                        </div>
                    </nav>

                    {/* Mobile Navigation */}
                    <MobileNav fragment={Fragment} />
                </>
            )}
        </Disclosure>
    );
};

export default SiteMobileNav;
