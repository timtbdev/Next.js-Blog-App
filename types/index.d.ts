import { Icon } from "lucide-react";

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
  icon: Icon;
};
