import path from "path";

const BLOCKED_EXTENSIONS = new Set([
  ".html",
  ".htm",
  ".svg",
  ".js",
  ".mjs",
  ".cjs",
  ".php",
  ".exe",
  ".bat",
  ".cmd",
  ".sh",
  ".ps1",
  ".jar",
  ".msi",
  ".dll",
  ".vbs",
  ".wasm",
]);

export const MEDIA_EXTENSIONS = new Set([
  ".pdf",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".zip",
  ".txt",
  ".csv",
]);

export const MEDIA_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/zip",
  "application/x-zip-compressed",
  "text/plain",
  "text/csv",
  "application/octet-stream",
]);

export const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".avif",
]);

export const IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

function getExtension(filename: string): string {
  return path.extname(filename).toLowerCase();
}

export function isBlockedExtension(filename: string): boolean {
  return BLOCKED_EXTENSIONS.has(getExtension(filename));
}

export function validateMediaUpload(
  filename: string,
  mimetype: string
): string | null {
  const ext = getExtension(filename);
  if (!ext || isBlockedExtension(filename)) {
    return "File type not allowed";
  }
  if (!MEDIA_EXTENSIONS.has(ext)) {
    return `Only document archives allowed (${[...MEDIA_EXTENSIONS].join(", ")})`;
  }
  if (!MEDIA_MIME_TYPES.has(mimetype)) {
    return "MIME type does not match allowed document types";
  }
  return null;
}

export function validateImageUpload(
  filename: string,
  mimetype: string
): string | null {
  const ext = getExtension(filename);
  if (!ext || isBlockedExtension(filename)) {
    return "File type not allowed";
  }
  if (!IMAGE_EXTENSIONS.has(ext)) {
    return `Only image files allowed (${[...IMAGE_EXTENSIONS].join(", ")})`;
  }
  if (!IMAGE_MIME_TYPES.has(mimetype)) {
    return "MIME type does not match allowed image types";
  }
  return null;
}

export function resolveUploadPath(uploadDir: string, filename: string): string | null {
  const base = path.resolve(uploadDir);
  const resolved = path.resolve(base, filename);
  if (!resolved.startsWith(base + path.sep) && resolved !== base) {
    return null;
  }
  return resolved;
}
