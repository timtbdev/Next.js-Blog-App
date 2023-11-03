import {
  MainPostItemDesktopLoading,
  MainPostItemMobileLoading,
} from "./loading";

const MainPostItemLoading = () => {
  return (
    <>
      {/* LoadingItems */}
      <MainPostItemDesktopLoading />
      <MainPostItemMobileLoading />
    </>
  );
};

export default MainPostItemLoading;
