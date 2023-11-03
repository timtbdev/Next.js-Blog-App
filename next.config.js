/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: [
      "icons",
      "icons/categories",
      "icons/socials",
      "components/main",
      "components/main/error",
      "components/login",
      "components/shared",
      "components/shared/login/button",
      "components/detail/post",
      "components/detail/post/buttons",
      "components/detail/post/comment",
      "components/protected/editor/upload",
      "config/main",
      "config/detail",
      "config/shared",
      "config/shared/dashboard",
      "config/main/pages",
      "config/protected",
      "components/main/header/navigations",
      "components/main/header/navigations/menu",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "iskzuogcmkzumadqjnbv.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
