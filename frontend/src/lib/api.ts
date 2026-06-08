import type { ApiErrorResponse, ApiSuccessResponse } from "@nextray/shared";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const FETCH_TIMEOUT_MS = 60_000;

export type FormEndpoint = "contact" | "associates";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithTimeout(url: string, options: RequestInit = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}

async function wakeApi(): Promise<void> {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/api/health`);
      if (res.ok) return;
    } catch {
      /* retry */
    }
    if (attempt < 2) await sleep(3000);
  }
}

export async function submitForm(
  endpoint: FormEndpoint,
  data: Record<string, string>
): Promise<ApiSuccessResponse> {
  await wakeApi();

  let res: Response;
  try {
    res = await fetchWithTimeout(`${API_BASE}/api/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch {
    throw new Error(
      "Could not reach the server. Please wait a moment and try again."
    );
  }

  let json: ApiSuccessResponse | ApiErrorResponse;
  try {
    json = (await res.json()) as ApiSuccessResponse | ApiErrorResponse;
  } catch {
    throw new Error(
      res.status >= 500
        ? "Server is starting up. Please try again in a few seconds."
        : "Unexpected response from server."
    );
  }

  if (!res.ok || !json.success) {
    const err = json as ApiErrorResponse;
    const fieldMsg = err.errors
      ? Object.values(err.errors).flat().join(", ")
      : "";
    throw new Error(fieldMsg || err.message || "Submission failed");
  }

  return {
    ...json,
    message: json.message || "Your form has been submitted successfully.",
  };
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
