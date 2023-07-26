import { footer } from "@/config/site";

export default function SiteFooter() {
  return (
    <footer className="border-y-1 shadow-t-sm border-black/5 bg-gray-50 shadow-gray-300">
      <div className="border-t border-gray-900/10 py-4 md:flex md:items-center md:justify-between">
        <div className="flex space-x-6 md:order-2"></div>
        <p className="mx-auto max-w-3xl px-5 text-center text-base tracking-tighter text-gray-500 [word-spacing:-3px]">
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
