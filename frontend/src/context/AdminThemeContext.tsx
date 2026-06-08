"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getAdminTheme,
  type AdminThemeClasses,
} from "@/components/admin/admin-theme";

interface AdminThemeContextValue {
  light: boolean;
  toggleTheme: () => void;
  setLight: (on: boolean) => void;
  t: AdminThemeClasses;
}

const AdminThemeContext = createContext<AdminThemeContextValue | null>(null);

export function AdminThemeProvider({ children }: { children: ReactNode }) {
  const [light, setLightState] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("nextray-admin-light");
    if (saved !== null) setLightState(saved === "true");
    setMounted(true);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-admin-active", "true");
    return () => document.documentElement.removeAttribute("data-admin-active");
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("nextray-admin-light", String(light));
    document.documentElement.setAttribute(
      "data-admin-mode",
      light ? "light" : "dark"
    );
  }, [light, mounted]);

  const setLight = useCallback((on: boolean) => setLightState(on), []);
  const toggleTheme = useCallback(() => setLightState((p) => !p), []);

  const t = useMemo(() => getAdminTheme(light), [light]);

  return (
    <AdminThemeContext.Provider value={{ light, toggleTheme, setLight, t }}>
      {children}
    </AdminThemeContext.Provider>
  );
}

export function useAdminTheme() {
  const ctx = useContext(AdminThemeContext);
  if (!ctx) {
    throw new Error("useAdminTheme must be used within AdminThemeProvider");
  }
  return ctx;
}
