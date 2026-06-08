"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import PageViewTracker from "@/components/analytics/PageViewTracker";

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <PageViewTracker />
      {children}
    </ThemeProvider>
  );
}
