import SiteDesktopNav from "./site-desktop-nav";
import SiteMobileNav from "./site-mobile-nav";

export default function SiteHeader() {
  return (
    <div className="border-y-1 sticky top-0 z-50 border-black/5 bg-gray-50/60 shadow-sm shadow-gray-300 backdrop-blur-lg">
      <SiteDesktopNav />
      <SiteMobileNav />
    </div>
  );
}
