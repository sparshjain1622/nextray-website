import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import WhatsAppButton from "@/components/home/WhatsAppButton";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import AboutPageBanner from "./AboutPageBanner";
import AboutSidebar from "./AboutSidebar";
import AboutPageContent from "./AboutPageContent";
import type { AboutPageData } from "@/lib/about-data";

interface AboutPageShellProps {
  data: AboutPageData;
}

export default function AboutPageShell({ data }: AboutPageShellProps) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "About Us", href: "/about" },
          { label: data.breadcrumb },
        ]}
      />
      <Header />
      <AboutPageBanner breadcrumb={data.breadcrumb} />
      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-10">
          <AboutSidebar />
          <AboutPageContent data={data} />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
