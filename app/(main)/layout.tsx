import {
  MainBanner,
  MainFooter,
  MainGrid,
  MainHeader,
} from "@/components/main";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MainBanner />
      <MainHeader />
      <MainGrid>
        <div className="min-h-full py-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">{children}</div>
          </div>
        </div>
      </MainGrid>
      <MainFooter />
    </>
  );
}
