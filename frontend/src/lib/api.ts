import type { ApiErrorResponse, ApiSuccessResponse } from "@nextray/shared";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export type FormEndpoint = "contact" | "associates";

export async function submitForm(
  endpoint: FormEndpoint,
  data: Record<string, string>
): Promise<ApiSuccessResponse> {
  const res = await fetch(`${API_BASE}/api/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = (await res.json()) as ApiSuccessResponse | ApiErrorResponse;

  if (!res.ok || !json.success) {
    const err = json as ApiErrorResponse;
    const fieldMsg = err.errors
      ? Object.values(err.errors).flat().join(", ")
      : "";
    throw new Error(fieldMsg || err.message || "Submission failed");
  }

  return json;
}

export async function checkApiHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/api/health`);
    return res.ok;
  } catch {
    return false;
  }
}

export async function trackPageView(path: string, referrer?: string) {
  try {
    await fetch(`${API_BASE}/api/analytics`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, referrer }),
    });
  } catch {
    // non-blocking
  }
}

export interface DownloadFile {
  id: string;
  title: string;
  originalName: string;
  mimeType: string;
  size: number;
  category: string;
}

export async function fetchDownloads(category?: string): Promise<DownloadFile[]> {
  try {
    const q = category ? `?category=${category}` : "";
    const res = await fetch(`${API_BASE}/api/downloads${q}`);
    const json = await res.json();
    return json.success ? json.data : [];
  } catch {
    return [];
  }
}

export function downloadUrl(fileId: string) {
  return `${API_BASE}/api/downloads/${fileId}`;
}
