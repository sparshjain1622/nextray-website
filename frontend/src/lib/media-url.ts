const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export function resolveMediaUrl(src: string): string {
  if (!src) return src;
  if (src.startsWith("/uploads")) {
    return `${API_BASE}${src}`;
  }
  return src;
}
