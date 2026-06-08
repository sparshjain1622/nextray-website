const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export interface PublicCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  sortOrder: number;
  _count?: { products: number };
}

export function categoryPath(slug: string): string {
  return `/products/${slug}`;
}

export async function fetchPublicCategories(): Promise<PublicCategory[]> {
  try {
    const res = await fetch(`${API_BASE}/api/categories`, {
      next: { revalidate: 60 },
    });
    const json = await res.json();
    return json.success ? json.data : [];
  } catch {
    return [];
  }
}

export async function fetchCategoryBySlug(
  slug: string
): Promise<PublicCategory | null> {
  try {
    const res = await fetch(`${API_BASE}/api/categories/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? json.data : null;
  } catch {
    return null;
  }
}
