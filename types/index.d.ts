import { Icon } from "lucide-react";
import { string } from "zod";

export type SeoType = {
  title: string;
  subTitle: string;
  absoluteTitle: string;
  ogTitle: string;
  author: { name: string; twitterUrl: string; twitterAddress: string };
  description: string;
  keywords: Array<string>;
  tags: Array<string>;
};

export type FooterType = {
  categories: CategoryType[];
  pages: PageType[];
  socials: SocialType[];
  legals: PageType[];
  copyright: string;
};

export type PageType = {
  title: string;
  slug: string;
};

export type CategoryType = {
  id: string;
  title: string;
  slug: string;
  icon: Icon;
};

export type DashBoardType = {
  title: string;
  slug?: string;
  icon: Icon;
};

export type DashBoardPageType = {
  title: string;
  slug?: string;
  initial: string;
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
  author: definitions["profiles"];
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

export type SocialType = {
  name: string;
  url: string;
  icon: Icon;
};

// Page Policy

export type PolicyPageType = {
  title: string;
  description: string;
  paragraphs: ParagraphWithTitle[];
};

// Page Terms

export type TermsPageType = {
  title: string;
  description: string;
  paragraphs: ParagraphWithoutTitle[];
};

// About Page

export type AboutPageType = {
  general: AboutGeneralType;
  features: AboutFeatureType[];
};

export type AboutGeneralType = {
  title: string;
  subTitle: string;
  description: string;
  paragraphs: ParagraphWithOutTitle[];
};

export type AboutFeatureType = {
  name: string;
  description: string;
  icon: Icon;
};

// Shared

export type ParagraphWithTitle = {
  title: string;
  description: string;
};
export type ParagraphWithoutTitle = {
  description: string;
};
