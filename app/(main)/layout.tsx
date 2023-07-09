import SiteFooter from "@/components/site/site-footer";
import SiteGrid from "@/components/site/site-grid";
import SiteHeader from "@/components/site/site-header";
import SiteForm from "@/components/site/site-form";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <SiteGrid>
        <div className="py-10 min-h-full">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">{children}</div>
            <SiteForm />
          </div>
        </div>
      </SiteGrid>
      <SiteFooter />
    </>
  );
}
