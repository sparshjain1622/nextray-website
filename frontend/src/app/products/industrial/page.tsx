import Header from "@/components/home/Header";
import { buildPageMetadata } from "@/lib/seo-metadata";
import Footer from "@/components/home/Footer";
import WhatsAppButton from "@/components/home/WhatsAppButton";
import PageBanner from "@/components/layout/PageBanner";
import ProductCategoryTabs from "@/components/products/ProductCategoryTabs";
import Link from "next/link";

export const metadata = buildPageMetadata({
  title: "Industrial LED High Bay Lights | Nextray Technologies",
  description:
    "Industrial LED high bay lights by Nextray Technologies — 50W to 300W for warehouses, factories and manufacturing facilities.",
  path: "/products/industrial",
  keywords: ["industrial LED", "high bay light India", "warehouse lighting"],
});

export default function IndustrialProductsPage() {
  return (
    <>
      <Header />
      <ProductCategoryTabs />
      <PageBanner
        title="Industrial Lights"
        breadcrumbs={[{ label: "Industrial Lights" }]}
      />
      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-14">
        <div className="rounded-xl border border-white/10 bg-card p-8 text-center md:p-12">
          <p className="mb-8 text-white/60">
            High bay and industrial luminaire pages are being added. Browse our
            featured products on the homepage.
          </p>
          <Link
            href="/#featured-projects"
            className="inline-flex items-center gap-2 rounded-lg bg-nextray-green px-6 py-3 text-sm font-bold uppercase tracking-wider text-black"
          >
            View Featured Products
          </Link>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
