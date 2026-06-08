import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import WhatsAppButton from "@/components/home/WhatsAppButton";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import ProductJsonLd from "@/components/seo/ProductJsonLd";
import ProductCategoryTabs from "./ProductCategoryTabs";
import ProductPremiumSidebar from "./ProductPremiumSidebar";
import ProductDetailContent from "./ProductDetailContent";
import type { ProductDetail } from "@/lib/products-data";

interface ProductPageShellProps {
  product: ProductDetail;
}

export default function ProductPageShell({ product }: ProductPageShellProps) {
  const breadcrumbItems = product.breadcrumbs.map((crumb) => ({
    label: crumb.label,
    href: crumb.href,
  }));

  return (
    <>
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <Header />
      <ProductCategoryTabs />
      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-10">
          <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-10">
            <ProductPremiumSidebar product={product} />
            <ProductDetailContent product={product} />
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
