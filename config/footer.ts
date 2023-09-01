import TwitterIcon from '@/components/icons/twitter-contact-icon';
import GithubIcon from '@/components/icons/github-contact-icon';

import { FooterAttributes } from 'types';

export const footerConfig: FooterAttributes = {
    copyright: '2023 Blog App. All rights reserved.',
    menus: [
        {
            name: 'Home',
            href: '/',
        },
        {
            name: 'About',
            href: '/about',
        },
        {
            name: 'Terms',
            href: '/terms',
        },
        {
            name: 'Policy',
            href: '/policy',
        },
        {
            name: 'Contact',
            href: '/contact',
        },
    ],
    socials: [
        {
            name: 'Twitter',
            href: 'https://twitter.com/timtbdev',
            icon: TwitterIcon,
        },
        {
            name: 'GitHub',
            href: 'https://github.com/timtbdev/projects',
            icon: GithubIcon,
        },
    ],
};
