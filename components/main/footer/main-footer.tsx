import { mainFooterConfig } from "@/config/main";
import Link from "next/link";
import { v4 } from "uuid";
import MainNewsletter from "./main-newsletter";

const MainFooter = () => {
  return (
    <footer
      className="border-t border-gray-900/10 bg-white shadow-sm"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-5xl px-6 pb-8 pt-20 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  Categories
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {mainFooterConfig.categories.map((category) => (
                    <li key={v4()}>
                      <Link
                        href={
                          category.slug === "/"
                            ? category.slug
                            : `/category/${category.slug}`
                        }
                        className="text-sm leading-6 text-gray-600 hover:text-gray-900 hover:underline"
                      >
                        {category.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  Pages
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {mainFooterConfig.pages.map((page) => (
                    <li key={v4()}>
                      <Link
                        href={page.slug}
                        className="text-sm leading-6 text-gray-600 hover:text-gray-900 hover:underline"
                      >
                        {page.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  Socials
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {mainFooterConfig.socials.map((social) => (
                    <li key={v4()}>
                      <Link
                        href={social.url}
                        target="_blank"
                        className="text-sm leading-6 text-gray-600 hover:text-gray-900 hover:underline"
                      >
                        {social.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  Legal
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {mainFooterConfig.legals.map((legal) => (
                    <li key={v4()}>
                      <Link
                        href={legal.slug}
                        className="text-sm leading-6 text-gray-600 hover:text-gray-900 hover:underline"
                      >
                        {legal.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <MainNewsletter />
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24">
          <div className="flex space-x-6 md:order-2">
            {mainFooterConfig.socials.map((item) => (
              <a
                key={item.name}
                href={item.url}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-sm leading-5 text-gray-500 md:order-1 md:mt-0">
            {mainFooterConfig.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
