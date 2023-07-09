import { footer } from "@/config/site";

export default function SiteFooter() {
  return (
    <footer className="border-y-1 sticky bottom-0 z-50 border-black/5 bg-gray-50 shadow-t-sm shadow-gray-300">
      <div className="border-t border-gray-900/10 py-4 md:flex md:items-center md:justify-between">
        <div className="flex space-x-6 md:order-2"></div>
        <p className="text-gray-500 text-base tracking-tighter [word-spacing:-3px] px-5 max-w-3xl text-center mx-auto">
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
