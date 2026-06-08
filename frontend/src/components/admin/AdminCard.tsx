"use client";

import { useAdminTheme } from "@/context/AdminThemeContext";

export default function AdminCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { t } = useAdminTheme();
  return (
    <div
      className={`rounded-xl border p-6 ${t.card} ${t.cardBorder} ${className}`}
    >
      {children}
    </div>
  );
}
