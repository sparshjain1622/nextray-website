const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export interface ApiProduct {
  id: string;
  title: string;
  slug: string;
  brand: string;
  seoTitle?: string | null;
  metaDescription?: string | null;
  imageUnlit?: string | null;
  imageLit?: string | null;
  description?: string | null;
  modelNumber?: string | null;
  category?: { slug: string; name: string };
}

export async function fetchProductBySlug(
  slug: string
): Promise<ApiProduct | null> {
  try {
    const res = await fetch(`${API_BASE}/api/products/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? json.data : null;
  } catch {
    return null;
  }
}

export async function fetchProductsByCategory(
  categorySlug: string
): Promise<ApiProduct[]> {
  try {
    const res = await fetch(
      `${API_BASE}/api/products?category=${encodeURIComponent(categorySlug)}`,
      { next: { revalidate: 60 } }
    );
    const json = await res.json();
    return json.success ? json.data : [];
  } catch {
    return [];
  }
}

export async function fetchAllProductSlugs(): Promise<
  { slug: string; categorySlug: string }[]
> {
  try {
    const res = await fetch(`${API_BASE}/api/products`, {
      next: { revalidate: 300 },
    });
    const json = await res.json();
    if (!json.success) return [];
    return json.data.map((p: ApiProduct) => ({
      slug: p.slug,
      categorySlug: p.category?.slug || "indoor",
    }));
  } catch {
    return [];
  }
}

const CATEGORY_PATH: Record<string, string> = {
  indoor: "/products/indoor",
  outdoor: "/products/outdoor",
  powertronics: "/products/powertronics",
  industrial: "/products/industrial",
};

export function productPath(categorySlug: string, productSlug: string): string {
  const base = CATEGORY_PATH[categorySlug] || "/products/indoor";
  return `${base}/${productSlug}`;
}
