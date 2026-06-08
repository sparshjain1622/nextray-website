import Header from "@/components/home/Header";
import { buildPageMetadata } from "@/lib/seo-metadata";
import Footer from "@/components/home/Footer";
import WhatsAppButton from "@/components/home/WhatsAppButton";
import PageBanner from "@/components/layout/PageBanner";
import ProductCategoryTabs from "@/components/products/ProductCategoryTabs";
import ProductPremiumSidebar from "@/components/products/ProductPremiumSidebar";
import IndoorProductsList from "@/components/products/IndoorProductsList";
import { sixWattDownLight } from "@/lib/products-data";

export const metadata = buildPageMetadata({
  title: "Indoor LED Down Lights | Nextray Technologies — 6W to 60W",
  description:
    "Indoor LED down lights by Nextray Technologies — Whites brand, 6W to 60W, BIS approved control gear. Indian manufacturer since 2004.",
  path: "/products/indoor",
  image: "/images/products/6_watt_down_light.jpg",
  keywords: ["indoor LED lights", "LED downlight India", "BIS downlight", "Whites LED"],
});

export default function IndoorProductsPage() {
  return (
    <>
      <Header />
      <ProductCategoryTabs />
      <PageBanner
        title="Indoor Lights"
        breadcrumbs={[{ label: "Indoor Lights" }]}
      />
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-10">
          <ProductPremiumSidebar product={sixWattDownLight} />
          <IndoorProductsList />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
