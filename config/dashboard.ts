import { DashBoardAttributes } from '@/types';
import {
    BookMarkedIcon,
    LayoutGridIcon as DashBoardIcon,
    LogOut,
    FilePlus2Icon as NewIcon,
    FileTextIcon as PostIcon,
    SettingsIcon,
} from 'lucide-react';

export const dashBoardMenus: DashBoardAttributes[] = [
    {
        title: 'Saved Posts',
        slug: 'saved-posts',
        icon: BookMarkedIcon,
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
