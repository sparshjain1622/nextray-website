import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import WhatsAppButton from "@/components/home/WhatsAppButton";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import PageBanner, { type BreadcrumbItem } from "./PageBanner";

interface PageShellProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  sidebar?: React.ReactNode;
  children: React.ReactNode;
}

export default function PageShell({
  title,
  breadcrumbs,
  sidebar,
  children,
}: PageShellProps) {
  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Header />
      <PageBanner title={title} breadcrumbs={breadcrumbs} />
      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-14">
        {sidebar ? (
          <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-10">
            {sidebar}
            {children}
          </div>
        ) : (
          children
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
