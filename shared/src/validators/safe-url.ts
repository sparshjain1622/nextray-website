import { z } from "zod";

/** Relative site paths: /blog/foo, /products/indoor */
export const safeRelativePath = z
  .string()
  .max(500)
  .refine(
    (v) => v.startsWith("/") && !v.startsWith("//") && !v.includes(".."),
    "Must be a safe relative path"
  );

/** In-page anchors: #section */
export const safeHref = z
  .string()
  .max(500)
  .refine((v) => {
    if (!v) return true;
    if (v.startsWith("#")) return !v.includes(" ");
    if (safeRelativePath.safeParse(v).success) return true;
    try {
      const url = new URL(v);
      return url.protocol === "https:";
    } catch {
      return false;
    }
  }, "href must be a relative path, anchor, or HTTPS URL")
  .optional();

/** External HTTPS URLs for canonical / OG images */
export const safeHttpsUrl = z
  .string()
  .max(2000)
  .refine((v) => {
    if (!v) return true;
    try {
      const url = new URL(v);
      return url.protocol === "https:";
    } catch {
      return false;
    }
  }, "Must be a valid HTTPS URL")
  .optional();

/** Image reference: relative path or HTTPS URL */
export const safeImageRef = z
  .string()
  .max(2000)
  .refine((v) => {
    if (!v) return true;
    if (v.startsWith("/uploads/") || v.startsWith("/images/")) {
      return !v.includes("..");
    }
    return safeHttpsUrl.safeParse(v).success;
  }, "Image must be a site path (/uploads, /images) or HTTPS URL")
  .optional();
