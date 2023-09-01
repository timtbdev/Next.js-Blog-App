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
        slug: '/',
        icon: DashBoardIcon,
    },
    {
        title: 'Posts',
        slug: 'posts',
        icon: PostIcon,
    },
    {
        title: 'New Post',
        slug: 'new-post',
        icon: NewIcon,
    },
    {
        title: 'Saved Posts',
        slug: 'saved-posts',
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

export const dashBoardBookmarkTableEmpty = {
    title: 'Empty',
    description: 'There is no bookmark yet',
};
