import LoadingPostItemDesktop from "@/components/loading/post/post-item-desktop";
import LoadingPostItemMobile from "@/components/loading/post/post-item-mobile";
import React from "react";

const Loading = () => {
  return (
    <>
      {/* LoadingItems */}
      <LoadingPostItemDesktop />
      <LoadingPostItemMobile />
    </>
  );
};

export default Loading;
