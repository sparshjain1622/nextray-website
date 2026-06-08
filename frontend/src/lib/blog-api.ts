const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogPostSummary {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  featuredImage?: string;
  author: string;
  seoTitle?: string;
  metaDescription?: string;
  featured: boolean;
  publishedAt?: string;
  tags: BlogTag[];
}

export interface BlogPostDetail extends BlogPostSummary {
  content: string;
  seoKeywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  createdAt: string;
  updatedAt: string;
}

export async function fetchBlogPosts(): Promise<BlogPostSummary[]> {
  try {
    const res = await fetch(`${API_BASE}/api/blog`, {
      next: { revalidate: 60 },
    });
    const json = await res.json();
    return json.success ? json.data : [];
  } catch {
    return [];
  }
}

export async function fetchBlogPost(
  slug: string
): Promise<BlogPostDetail | null> {
  try {
    const res = await fetch(`${API_BASE}/api/blog/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? json.data : null;
  } catch {
    return null;
  }
}
