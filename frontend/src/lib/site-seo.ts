/** Canonical site URL — set NEXT_PUBLIC_SITE_URL in production */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.nextray-tech.com";

export const SITE_NAME = "Nextray Technologies Pvt. Ltd.";

export const DEFAULT_OG_IMAGE = "/images/nextray-logo.png";

export const COMPANY = {
  name: SITE_NAME,
  legalName: "Nextray Technologies Pvt. Ltd.",
  url: SITE_URL,
  logo: `${SITE_URL}/images/nextray-logo.png`,
  phone: "+91-7096015151",
  email: "sales@nextray-tech.com",
  address: {
    street: "908/3 GIDC Makarpura, Opp. to Kiran Motors Service Center",
    city: "Vadodara",
    region: "Gujarat",
    postalCode: "390010",
    country: "IN",
  },
  foundingDate: "2004",
  sameAs: [
    "https://www.linkedin.com/company/nextray-technologies",
    "https://www.facebook.com/nextraytech",
    "https://www.instagram.com/nextraytech",
    "https://www.youtube.com/@nextraytech",
  ],
} as const;

export const DEFAULT_KEYWORDS = [
  "LED lighting",
  "LED manufacturer India",
  "LED downlight",
  "LED street light",
  "Nextray Technologies",
  "Vadodara",
  "Make in India",
] as const;

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
