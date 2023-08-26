import BackButton from "@/components/buttons/back-button";
import LoginMenu from "@/components/site/navigations/login-menu";

const ProtectedHeader = () => {
  return (
    <header className="border-y-1 sticky top-0 z-40 border-black/5 bg-gray-50/60 shadow-sm shadow-gray-300 backdrop-blur-lg">
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4"
        aria-label="Global"
      >
        <div className="flex flex-1 items-center justify-start">
          <BackButton url="/dashboard" />
        </div>
        <div className="flex w-full max-w-3xl"></div>
        <div className="flex flex-1 items-center justify-end">
          <LoginMenu />
        </div>
      </nav>
    </header>
  );
};

export default ProtectedHeader;
