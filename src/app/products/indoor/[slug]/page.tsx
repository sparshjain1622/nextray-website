import type { Metadata } from "next";
import Link from "next/link";
import ProductPageShell from "@/components/products/ProductPageShell";
import { productDetails } from "@/lib/products-data";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import WhatsAppButton from "@/components/home/WhatsAppButton";
import ProductPageBanner from "@/components/products/ProductPageBanner";
import ProductSidebar from "@/components/products/ProductSidebar";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = productDetails[slug];
  if (!product) {
    return { title: "Product | Nextray Technologies" };
  }
  return {
    title: `${product.title} | Nextray Technologies`,
    description: product.metaDescription,
  };
}

export default async function IndoorProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = productDetails[slug];

  if (!product) {
    return (
      <>
        <Header />
        <ProductPageBanner
          category="Indoor Lights"
          categoryHref="/products/indoor"
          breadcrumb="Product"
        />
        <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-10">
            <ProductSidebar />
            <div className="rounded-xl border border-white/10 bg-card p-8 text-center">
              <h2 className="mb-4 font-heading text-2xl font-bold text-white">
                Product page coming soon
              </h2>
              <p className="mb-6 text-white/60">
                Full specifications for this product are being added.
              </p>
              <Link
                href="/products/indoor"
                className="inline-flex items-center gap-2 text-nextray-green hover:underline"
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
