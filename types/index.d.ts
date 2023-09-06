import { Icon } from 'lucide-react';
import { string } from 'zod';

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

export type CategoryAttributes = {
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

export type PolicyAttributes = {
    title: string;
    description: string;
    paragraphs: ParagraphWithTitle[];
};

export type TermsAttributes = {
    title: string;
    description: string;
    paragraphs: ParagraphWithoutTitle[];
};

export type AboutAttributes = {
    title: string;
    subTitle: string;
    description: string;
    paragraphs: ParagraphWithOutTitle[];
};

export type ParagraphWithTitle = {
    title: string;
    description: string;
};
export type ParagraphWithoutTitle = {
    description: string;
};
