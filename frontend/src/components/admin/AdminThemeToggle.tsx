"use client";

import { Moon, Sun } from "lucide-react";
import { useAdminTheme } from "@/context/AdminThemeContext";

export default function AdminThemeToggle() {
  const { light, toggleTheme } = useAdminTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
        light
          ? "text-[#6b6b6b] hover:bg-nextray-green/8 hover:text-nextray-green"
          : "text-[#c0c0c0] hover:bg-white/5 hover:text-white"
      }`}
    >
      {light ? (
        <Moon size={18} className="shrink-0" aria-hidden />
      ) : (
        <Sun size={18} className="shrink-0" aria-hidden />
      )}
      <span>{light ? "Dark Mode" : "Light Mode"}</span>
    </button>
  );
}
