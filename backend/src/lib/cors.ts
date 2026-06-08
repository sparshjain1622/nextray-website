const PRODUCTION_ORIGIN_PATTERNS = [
  /^https:\/\/[\w-]+\.vercel\.app$/,
  /^https:\/\/(www\.)?nextray-tech\.com$/,
];

export function parseFrontendOrigins(frontendUrl: string): string[] {
  const origins = frontendUrl
    .split(",")
    .map((value) => value.trim().replace(/\/$/, ""))
    .filter(Boolean);

  if (process.env.NODE_ENV !== "production") {
    origins.push("http://localhost:3000", "http://localhost:3001");
  }

  return [...new Set(origins)];
}

export function isAllowedCorsOrigin(
  origin: string | undefined,
  allowedOrigins: string[]
): boolean {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;

  if (process.env.NODE_ENV === "production") {
    return PRODUCTION_ORIGIN_PATTERNS.some((pattern) => pattern.test(origin));
  }

  return false;
}
