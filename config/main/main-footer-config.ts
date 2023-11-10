import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/icons/socials";
import { FooterType } from "@/types";
import { default as mainCategoryConfig } from "./main-category-config";

const mainFooterConfig: FooterType = {
  categories: mainCategoryConfig,
  pages: [
    {
      title: "Home",
      slug: "/",
    },
    {
      title: "About",
      slug: "/about",
    },
    {
      title: "Docs",
      slug: "/docs",
    },
    {
      title: "Changelogs",
      slug: "/changelogs",
    },
    {
      title: "Contact",
      slug: "/contact",
    },
  ],

  socials: [
    {
      name: "Facebook",
      url: "https://facebook.com",
      icon: FacebookIcon,
    },
    {
      name: "Github",
      url: "https://github.com/timtbdev",
      icon: GithubIcon,
    },
    {
      name: "Instagram",
      url: "https://instagram.com",
      icon: InstagramIcon,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/timtbdev",
      icon: TwitterIcon,
    },
    {
      name: "Youtube",
      url: "https://youtube.com",
      icon: YoutubeIcon,
    },
  ],
  legals: [
    {
      title: "Terms",
      slug: "/terms",
    },
    {
      title: "Policy",
      slug: "/policy",
    },
  ],
  copyright: "© 2023 Fullstack Blogging App. All rights reserved.",
};

export default mainFooterConfig;
