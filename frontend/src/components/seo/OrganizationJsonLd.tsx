import { COMPANY, SITE_URL } from "@/lib/site-seo";

export default function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: COMPANY.legalName,
        url: SITE_URL,
        logo: COMPANY.logo,
        email: COMPANY.email,
        telephone: COMPANY.phone,
        foundingDate: COMPANY.foundingDate,
        sameAs: COMPANY.sameAs,
      },
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#localbusiness`,
        name: COMPANY.legalName,
        image: COMPANY.logo,
        url: SITE_URL,
        telephone: COMPANY.phone,
        email: COMPANY.email,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: COMPANY.address.street,
          addressLocality: COMPANY.address.city,
          addressRegion: COMPANY.address.region,
          postalCode: COMPANY.address.postalCode,
          addressCountry: COMPANY.address.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 22.2338,
          longitude: 73.1887,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "09:00",
            closes: "18:00",
          },
        ],
      },
    ],
  };

  const safeJson = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson }}
    />
  );
}
