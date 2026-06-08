"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  /** true = room lights ON = light website theme = unlit product shots */
  lightsOn: boolean;
  theme: Theme;
  toggleLights: () => void;
  setLightsOn: (on: boolean) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [lightsOn, setLightsOnState] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("nextray-lights-on");
    if (saved !== null) setLightsOnState(saved === "true");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const theme: Theme = lightsOn ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("nextray-lights-on", String(lightsOn));
  }, [lightsOn, mounted]);

  const setLightsOn = useCallback((on: boolean) => {
    setLightsOnState(on);
  }, []);

  const toggleLights = useCallback(() => {
    setLightsOnState((prev) => !prev);
  }, []);

  const theme: Theme = lightsOn ? "light" : "dark";

  return (
    <ThemeContext.Provider
      value={{ lightsOn, theme, toggleLights, setLightsOn }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
