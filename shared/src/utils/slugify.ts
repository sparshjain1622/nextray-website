/** Convert display text to a URL-safe slug (lowercase, hyphens). */
export function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const SLUG_PATTERN = /^[a-z0-9-]+$/;

/** Use explicit slug when provided; otherwise derive from source text. */
export function resolveSlug(
  explicit: string | undefined | null,
  sourceText: string
): string {
  const trimmed = explicit?.trim();
  if (trimmed && trimmed.length >= 2) {
    return trimmed;
  }
  return slugify(sourceText);
}

export function isValidSlug(slug: string): boolean {
  return slug.length >= 2 && SLUG_PATTERN.test(slug);
}
