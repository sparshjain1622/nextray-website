import { describe, it, expect } from "vitest";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

describe("frontend API helpers", () => {
  it("downloadUrl builds correct path", async () => {
    const { downloadUrl } = await import("../src/lib/api");
    expect(downloadUrl("abc123")).toBe(`${API_BASE}/api/downloads/abc123`);
  });

  it("checkApiHealth returns boolean", async () => {
    const { checkApiHealth } = await import("../src/lib/api");
    const result = await checkApiHealth();
    expect(typeof result).toBe("boolean");
  });
});
