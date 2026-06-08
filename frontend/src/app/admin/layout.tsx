import type { Metadata } from "next";
import { AdminThemeProvider } from "@/context/AdminThemeContext";
import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Admin | Nextray Technologies",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminThemeProvider>
      <AdminShell>{children}</AdminShell>
    </AdminThemeProvider>
  );
}
