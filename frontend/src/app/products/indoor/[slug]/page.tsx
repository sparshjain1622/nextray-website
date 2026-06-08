import Link from "next/link";
import ProductPageShell from "@/components/products/ProductPageShell";
import { productDetails } from "@/lib/products-data";
import { generateProductPageMetadata } from "@/lib/product-seo";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import WhatsAppButton from "@/components/home/WhatsAppButton";
import ProductCategoryTabs from "@/components/products/ProductCategoryTabs";
import ProductPremiumSidebar from "@/components/products/ProductPremiumSidebar";
import { sixWattDownLight } from "@/lib/products-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const CATEGORY_HREF = "/products/indoor";

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return generateProductPageMetadata(slug, CATEGORY_HREF);
}

export default async function IndoorProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = productDetails[slug];

  if (!product || product.categoryHref !== CATEGORY_HREF) {
    return (
      <>
        <Header />
        <ProductCategoryTabs />
        <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-10">
            <ProductPremiumSidebar product={sixWattDownLight} />
            <div className="rounded-xl border border-white/10 bg-card p-8 text-center">
              <h2 className="mb-4 font-heading text-2xl font-bold text-white">
                Product page coming soon
              </h2>
              <Link
                href="/products/indoor"
                className="text-nextray-green hover:underline"
              >
                ← Back to Indoor Lights
              </Link>
            </div>
          </div>
        </main>
        <Footer />
        <WhatsAppButton />
      </>
    );
  }

  return <ProductPageShell product={product} />;
}
