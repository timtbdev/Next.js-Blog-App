import MainPostItemDesktopLoading from "@/components/main/post/loading/main-post-item-desktop-loading";
import MainPostItemMobileLoading from "@/components/main/post/loading/main-post-item-mobile-loading";
import React from "react";

const Loading = () => {
  return (
    <>
      {/* LoadingItems */}
      <MainPostItemDesktopLoading />
      <MainPostItemMobileLoading />
    </>
  );
};

export default Loading;
