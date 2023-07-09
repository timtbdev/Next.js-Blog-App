import SiteMobileNav from "./site-mobile-nav";
import SiteDesktopNav from "./site-desktop-nav";

export default function SiteHeader() {
  return (
    <div className="border-y-1 sticky top-0 z-50 border-black/5 bg-gray-50 shadow-sm shadow-gray-300">
      <SiteDesktopNav />
      <SiteMobileNav />
    </div>
  );
}
