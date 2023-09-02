import { DashBoardAttributes } from '@/types';
import {
    BookMarkedIcon,
    LayoutGridIcon as DashBoardIcon,
    LogOut,
    FilePlus2Icon as NewIcon,
    FileTextIcon as PostIcon,
    SettingsIcon,
    HeartIcon as LikeIcon,
} from 'lucide-react';

export const dashBoardMenus: DashBoardAttributes[] = [
    {
        title: 'Dashboard',
        slug: 'dashboard',
        icon: DashBoardIcon,
    },
    {
        title: 'Posts',
        slug: 'editor/posts',
        icon: PostIcon,
    },
    {
        title: 'Bookmarks',
        slug: 'bookmarks',
        icon: BookMarkedIcon,
    },
    {
        title: 'Settings',
        slug: 'settings',
        icon: SettingsIcon,
    },
    {
        title: 'Sign out',
        slug: 'logout',
        icon: LogOut,
    },
];

export const dashBoardConfig = {
    title: 'Dashboard',
    description: 'Dashboard',
    slug: 'dashboard',
};
