const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const TOKEN_KEY = "nextray_admin_token";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(TOKEN_KEY);
}

async function adminFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_BASE}/api/admin${path}`, {
    ...options,
    headers: {
      ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || "Request failed");
  }
  return json as T;
}

export async function adminLogin(email: string, password: string) {
  const res = await fetch(`${API_BASE}/api/admin/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || "Login failed");
  }
  sessionStorage.setItem(TOKEN_KEY, json.token);
  return json;
}

export async function adminMe() {
  return adminFetch<{ admin: { id: string; email: string; name: string } }>(
    "/auth/me"
  );
}

export function adminLogout() {
  sessionStorage.removeItem(TOKEN_KEY);
}

export async function fetchDashboard() {
  return adminFetch<{ data: DashboardStats }>("/analytics/dashboard");
}

export async function fetchProducts() {
  return adminFetch<{ data: AdminProduct[] }>("/products");
}

export async function fetchProduct(id: string) {
  return adminFetch<{ data: AdminProduct }>(`/products/${id}`);
}

export async function saveProduct(id: string | null, data: Record<string, unknown>) {
  if (id) {
    return adminFetch(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }
  return adminFetch("/products", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteProduct(id: string) {
  return adminFetch(`/products/${id}`, { method: "DELETE" });
}

export async function fetchCategories() {
  return adminFetch<{ data: AdminCategory[] }>("/categories");
}

export async function saveCategory(id: string | null, data: Record<string, unknown>) {
  if (id) {
    return adminFetch(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }
  return adminFetch("/categories", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteCategory(id: string) {
  return adminFetch(`/categories/${id}`, { method: "DELETE" });
}

export async function fetchSubmissions(type?: string) {
  const q = type ? `?type=${type}` : "";
  return adminFetch<{ data: FormSubmission[] }>(`/submissions${q}`);
}

export async function markSubmissionRead(id: string) {
  return adminFetch(`/submissions/${id}/read`, { method: "PATCH" });
}

export async function deleteSubmission(id: string) {
  return adminFetch(`/submissions/${id}`, { method: "DELETE" });
}

export async function fetchMediaFiles() {
  return adminFetch<{ data: MediaFile[] }>("/media");
}

export async function uploadFile(file: File, title: string, category: string) {
  const form = new FormData();
  form.append("file", file);
  form.append("title", title);
  form.append("category", category);
  return adminFetch<{ data: MediaFile }>("/media/upload", {
    method: "POST",
    body: form,
  });
}

export async function deleteMediaFile(id: string) {
  return adminFetch(`/media/${id}`, { method: "DELETE" });
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

export async function fetchHomepageImages() {
  return adminFetch<{ data: AdminHomepageImage[] }>("/homepage");
}

export async function updateHomepageImage(
  id: string,
  data: Partial<AdminHomepageImage>
) {
  return adminFetch(`/homepage/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export interface AdminBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  author: string;
  seoTitle?: string;
  metaDescription?: string;
  seoKeywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  published: boolean;
  featured: boolean;
  publishedAt?: string;
  tags?: { tag: { id: string; name: string; slug: string } }[];
}

export async function fetchBlogPosts() {
  return adminFetch<{ data: AdminBlogPost[] }>("/blog");
}

export async function fetchBlogPost(id: string) {
  return adminFetch<{ data: AdminBlogPost }>(`/blog/${id}`);
}

export async function saveBlogPost(id: string | null, data: Record<string, unknown>) {
  if (id) {
    return adminFetch(`/blog/${id}`, { method: "PUT", body: JSON.stringify(data) });
  }
  return adminFetch("/blog", { method: "POST", body: JSON.stringify(data) });
}

export async function deleteBlogPost(id: string) {
  return adminFetch(`/blog/${id}`, { method: "DELETE" });
}

export async function uploadHomepageImage(file: File) {
  const form = new FormData();
  form.append("file", file);
  return adminFetch<{ data: { path: string } }>("/homepage/upload", {
    method: "POST",
    body: form,
  });
}

export interface DashboardStats {
  totalViews: number;
  weekViews: number;
  monthViews: number;
  totalSubmissions: number;
  unreadSubmissions: number;
  totalProducts: number;
  topPages: { path: string; views: number }[];
}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  seoTitle?: string;
  seoDescription?: string;
  sortOrder: number;
  published: boolean;
  _count?: { products: number };
}

export interface AdminProduct {
  id: string;
  title: string;
  slug: string;
  brand: string;
  categoryId: string;
  description?: string;
  metaDescription?: string;
  seoTitle?: string;
  imageUnlit?: string;
  imageLit?: string;
  modelNumber?: string;
  modelNumbers?: string;
  specs?: string;
  applications?: string;
  features?: string;
  keyHighlights?: string;
  pageType: string;
  published: boolean;
  featured: boolean;
  sortOrder: number;
  category?: AdminCategory;
  tags?: { tag: { id: string; name: string; slug: string } }[];
}

export interface FormSubmission {
  id: string;
  type: string;
  data: Record<string, string>;
  read: boolean;
  ip?: string;
  createdAt: string;
}

export interface MediaFile {
  id: string;
  title: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  category: string;
  public: boolean;
  createdAt: string;
}
