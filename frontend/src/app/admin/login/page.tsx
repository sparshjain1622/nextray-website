"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/lib/admin-api";
import { useAdminTheme } from "@/context/AdminThemeContext";
import AdminThemeToggle from "@/components/admin/AdminThemeToggle";
import { adminInputBase } from "@/components/admin/admin-theme";
import { Lock, Mail } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { light, t } = useAdminTheme();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    try {
      await adminLogin(
        String(fd.get("email")),
        String(fd.get("password"))
      );
      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `${adminInputBase} ${t.input} py-3 pl-11 pr-4`;

  return (
    <div
      className={`flex min-h-screen items-center justify-center px-4 ${t.loginPage}`}
      data-admin-theme={light ? "light" : "dark"}
    >
      <div className="absolute right-6 top-6 w-44">
        <AdminThemeToggle />
      </div>

      <div className={`w-full max-w-md rounded-2xl border p-8 ${t.loginCard}`}>
        <div className="mb-8 text-center">
          <p className={`font-heading text-2xl font-bold ${t.heading}`}>
            Nextray
          </p>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.25em] text-nextray-green">
            Admin Login
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className={`mb-2 block text-xs font-bold uppercase tracking-wider ${t.label}`}
            >
              Email
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-nextray-green/60"
              />
              <input
                name="email"
                type="email"
                required
                autoComplete="username"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label
              className={`mb-2 block text-xs font-bold uppercase tracking-wider ${t.label}`}
            >
              Password
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-nextray-green/60"
              />
              <input
                name="password"
                type="password"
                required
                className={inputClass}
              />
            </div>
          </div>

          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-nextray-green py-3.5 text-sm font-bold uppercase tracking-wider text-black transition-colors hover:bg-nextray-green-bright disabled:opacity-60"
          >
            {loading ? "Connecting to API..." : "Sign In"}
          </button>

          <p className={`text-center text-xs leading-relaxed ${t.label}`}>
            First login after idle may take up to 60 seconds while the API
            wakes up on Render&apos;s free plan.
          </p>
        </form>
      </div>
    </div>
  );
}
