import type { HomepageContent } from "@nextray/shared";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function fetchHomepageContent(): Promise<HomepageContent | null> {
  try {
    const res = await fetch(`${API_BASE}/api/homepage`, {
      next: { revalidate: 60 },
    });
    const json = await res.json();
    return json.success ? json.data : null;
  } catch {
    return null;
  }
}

export interface AdminHomepageImage {
  id: string;
  section: string;
  key: string;
  title?: string;
  description?: string;
  imageUnlit?: string;
  imageLit?: string;
  image?: string;
  href?: string;
  sortOrder: number;
  published: boolean;
}
