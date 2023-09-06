'use client';

import Health from '@/components/icons/health';
import Home from '@/components/icons/home';
import Marketing from '@/components/icons/marketing';
import Science from '@/components/icons/science';
import Technology from '@/components/icons/technology';
import { categories } from '@/config/categories';
import { Disclosure, Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { ExoticComponent, FC, ReactNode } from 'react';
import { v4 } from 'uuid';

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
                <Disclosure.Panel className="w-full border-t border-black/5 bg-gray-50 lg:hidden">
                    {categories.map((category) => (
                        <Disclosure.Button
                            key={v4()}
                            as="a"
                            onClick={() =>
                                router.push(category.slug === '/' ? category.slug : `/category/${category.slug}`)
                            }
                        >
                            <div className="group flex items-center gap-x-6 border-b border-black/5 px-8 py-3 text-base font-semibold leading-7 text-gray-600 transition-colors hover:bg-gray-200">
                                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-black/10 shadow-md shadow-black/5 transition duration-200 group-hover:bg-gray-50">
                                    {category.slug === '/' && <Home className="h-6 w-6" />}
                                    {category.slug === 'health' && <Health className="h-6 w-6" />}
                                    {category.slug === 'science' && <Science className="h-6 w-6" />}
                                    {category.slug === 'technology' && <Technology className="h-6 w-6" />}
                                    {category.slug === 'marketing' && <Marketing className="h-6 w-6" />}
                                </div>

                                {category.title}
                            </div>
                        </Disclosure.Button>
                    ))}
                </Disclosure.Panel>
            </Transition>
        </>
    );
};

export default MobileNav;
