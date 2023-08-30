import { Icon } from 'lucide-react';

export type MetaAttributes = {
    title: string;
    subTitle: string;
    absoluteTitle: string;
    ogTitle: string;
    author: { name: string; twitterUrl: string; twitterAddress: string };
    description: string;
    keywords: Array<string>;
    tags: Array<string>;
};

export type MenuAttributes = {
    id: string;
    title: string;
    slug: string;
};

export type DashBoardAttributes = {
    title: string;
    slug?: string;
    icon: Icon;
};

// Types for comment section

export interface CommentType {
    id: number;
    slug: string;
    title: string;
    content: string;
    authorId: string;
    parentId: number;
    createdAt: string;
    isPublished: boolean;
    updatedAt: string;
    author: definitions['profiles'];
    isPinned: boolean;
    responsesCount: number;
    responses: CommentType[];
    parent?: CommentType;
    live: boolean;
    depth: number;
    justAuthored?: boolean;
    continueThread?: boolean;
    highlight?: boolean;
    isDeleted: boolean;
    isApproved: boolean;
    totalChildrenCount?: number;
    pageIndex?: number;
    path: number[];
    votes: number;
    upvotes: number;
    downvotes: number;
    userVoteValue: number;
    pathVotesRecent: number[];
    pathLeastRecent: number[];
    pathMostRecent: number[];
}

export interface User {
    handle?: string;
    name?: string;
    role?: any;
    id: string;
    image?: string;
}

export interface PostKvDataAttributes {
    views: number;
    likes: number;
    comments: number;
    error: boolean;
}

interface FooterAttributes {
    socials: Social[];
    copyright: string;
    menus: FooterMenu[];
}

export type Social = {
    name: string;
    href: string;
    icon: Icon;
};

export type FooterMenu = {
    name: string;
    href: string;
};
