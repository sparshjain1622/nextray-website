import type { Metadata } from "next";
import { Exo_2, Inter } from "next/font/google";
import ThemeWrapper from "@/components/home/ThemeWrapper";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const exo = Exo_2({
  variable: "--font-exo",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Nextray Technologies - LED Lighting Solutions | Since 2004",
  description:
    "Nextray Technologies Pvt. Ltd. — leading Indian manufacturer of LED lighting solutions with 20+ years of expertise. Vertically integrated manufacturing for indoor, outdoor, industrial, commercial and specialty applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${exo.variable} h-full`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased">
        <ThemeWrapper>{children}</ThemeWrapper>
      </body>
    </html>
  );
}
