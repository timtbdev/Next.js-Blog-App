import BackIcon from "@/components/icons/back";
import LoginIcon from "@/components/icons/login";
import Balancer from "react-wrap-balancer";
import LoginMenu from "@/components/site/navigations/login-menu";

interface DetailHeaderProps {
  title: string;
  author: string;
  year: string;
  description: string;
  slug: string;
}

const DetailHeader: React.FC<DetailHeaderProps> = ({
  title,
  author,
  year,
  description,
  slug,
}) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-lg bg-gray-50/60 shadow-sm shadow-gray-300 border-y-1 border-black/5">
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between px-2 py-4"
        aria-label="Global"
      >
        <div className="flex flex-1 justify-start">
          <BackIcon />
        </div>
        <div className="flex max-w-3xl w-full">
          <h1 className="font-semibold justify-start text-md sm:text-xl px-10 sm:px-8 tracking-tight text-slate-900">
            <Balancer>{`${title} - ${author} (${year})`}</Balancer>
          </h1>
        </div>
        <div className="flex flex-1 justify-end">
          <LoginMenu />
        </div>
      </nav>
    </header>
  );
};

export default DetailHeader;
