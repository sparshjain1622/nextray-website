const WEAK_SECRETS = new Set([
  "dev-secret-change-me",
  "change-me-in-production",
  "secret",
  "jwt-secret",
]);

export function getJwtSecret(): string {
  return process.env.JWT_SECRET || "dev-secret-change-me";
}

export function validateEnv(): void {
  const isProd = process.env.NODE_ENV === "production";
  const secret = process.env.JWT_SECRET;

  if (isProd) {
    if (!secret || secret.length < 32 || WEAK_SECRETS.has(secret)) {
      throw new Error(
        "JWT_SECRET must be a strong random string (32+ chars) in production"
      );
    }
    if (process.env.ADMIN_PASSWORD === "admin123") {
      console.warn(
        "⚠️  SECURITY: Default ADMIN_PASSWORD detected — change before going live"
      );
    }
  } else if (!secret || WEAK_SECRETS.has(secret)) {
    console.warn(
      "⚠️  Using dev JWT_SECRET — set a strong JWT_SECRET before production"
    );
  }
}
