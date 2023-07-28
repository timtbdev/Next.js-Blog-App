import BackButton from "@/components/buttons/back-button";
import LoginMenu from "@/components/site/navigations/login-menu";
import Balancer from "react-wrap-balancer";

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
    <header className="border-y-1 sticky top-0 z-40 border-black/5 bg-gray-50/60 shadow-sm shadow-gray-300 backdrop-blur-lg">
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4"
        aria-label="Global"
      >
        <div className="flex flex-1 items-center justify-start">
          <BackButton />
        </div>
        <div className="flex w-full max-w-3xl">
          <h1 className="text-md justify-start px-4 font-semibold tracking-tight text-slate-900 sm:px-0 sm:text-xl">
            <Balancer>{`${title} - ${author} (${year})`}</Balancer>
          </h1>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <LoginMenu />
        </div>
      </nav>
    </header>
  );
};

export default DetailHeader;
