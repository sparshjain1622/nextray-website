import type { Metadata } from "next";
import { Exo_2, Inter } from "next/font/google";
import ThemeWrapper from "@/components/home/ThemeWrapper";
import GlobalSeo from "@/components/seo/GlobalSeo";
import {
  DEFAULT_KEYWORDS,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site-seo";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nextray Technologies - LED Lighting Solutions | Since 2004",
    template: "%s | Nextray Technologies",
  },
  description:
    "Nextray Technologies Pvt. Ltd. — leading Indian manufacturer of LED lighting solutions with 20+ years of expertise. Vertically integrated manufacturing for indoor, outdoor, industrial, commercial and specialty applications.",
  keywords: [...DEFAULT_KEYWORDS],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Nextray Technologies - LED Lighting Solutions | Since 2004",
    description:
      "Leading Indian LED lighting manufacturer — indoor, outdoor, industrial & Powertronics drivers. Vertically integrated since 2004.",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nextray Technologies - LED Lighting Solutions",
    description:
      "Indian LED lighting manufacturer — indoor, outdoor, industrial solutions since 2004.",
    images: [DEFAULT_OG_IMAGE],
  },
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
        <GlobalSeo />
        <ThemeWrapper>{children}</ThemeWrapper>
      </body>
    </html>
  );
}
