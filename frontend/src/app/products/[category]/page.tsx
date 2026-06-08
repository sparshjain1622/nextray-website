import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import WhatsAppButton from "@/components/home/WhatsAppButton";
import PageBanner from "@/components/layout/PageBanner";
import ProductCategoryTabs from "@/components/products/ProductCategoryTabs";
import ApiCategoryProductsList from "@/components/products/ApiCategoryProductsList";
import { categoryPath, fetchCategoryBySlug } from "@/lib/categories-api";
import { fetchProductsByCategory } from "@/lib/products-api";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  const cat = await fetchCategoryBySlug(category);
  if (!cat) return {};

  return buildPageMetadata({
    title: cat.seoTitle || `${cat.name} | Nextray Technologies`,
    description:
      cat.seoDescription ||
      cat.description ||
      `Browse ${cat.name} from Nextray Technologies — Indian LED lighting manufacturer.`,
    path: categoryPath(cat.slug),
  });
}

export default async function DynamicCategoryPage({ params }: PageProps) {
  const { category } = await params;
  const cat = await fetchCategoryBySlug(category);
  if (!cat) notFound();

  const products = await fetchProductsByCategory(category);

  return (
    <>
      <Header />
      <ProductCategoryTabs />
      <PageBanner
        title={cat.name}
        breadcrumbs={[{ label: cat.name }]}
      />
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-10">
        {cat.description && (
          <p className="mb-8 max-w-3xl text-white/60">{cat.description}</p>
        )}
        <ApiCategoryProductsList
          products={products}
          categorySlug={category}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
