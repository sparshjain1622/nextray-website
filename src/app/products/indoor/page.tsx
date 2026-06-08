import type { Metadata } from "next";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import WhatsAppButton from "@/components/home/WhatsAppButton";
import ProductPageBanner from "@/components/products/ProductPageBanner";
import ProductSidebar from "@/components/products/ProductSidebar";
import IndoorProductsList from "@/components/products/IndoorProductsList";

export const metadata: Metadata = {
  title: "Indoor Lights | Nextray Technologies",
  description:
    "Indoor LED down lights by Nextray Technologies — Whites brand, 6W to 60W, BIS approved control gear.",
};

export default function IndoorProductsPage() {
  return (
    <>
      <Header />
      <ProductPageBanner
        category="Products Range"
        categoryHref="/products/indoor"
        breadcrumb="Indoor Lights"
      />
      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-10">
          <ProductSidebar />
          <IndoorProductsList />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
