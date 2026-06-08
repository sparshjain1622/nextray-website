import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import WhatsAppButton from "@/components/home/WhatsAppButton";
import ProductPageBanner from "./ProductPageBanner";
import ProductSidebar from "./ProductSidebar";
import ProductDetailContent from "./ProductDetailContent";
import type { ProductDetail } from "@/lib/products-data";

interface ProductPageShellProps {
  product: ProductDetail;
  categoryHref?: string;
}

export default function ProductPageShell({
  product,
  categoryHref = "/products/indoor",
}: ProductPageShellProps) {
  return (
    <>
      <Header />
      <ProductPageBanner
        category={product.category}
        categoryHref={categoryHref}
        breadcrumb={product.breadcrumb}
      />
      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-10">
          <ProductSidebar />
          <ProductDetailContent product={product} />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
