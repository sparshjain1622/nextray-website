import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import { aboutSubnav } from "@/lib/about-data";
import { allProducts } from "@/lib/products-catalog";
import { fetchBlogPosts } from "@/lib/blog-api";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata = buildPageMetadata({
  title: "HTML Sitemap | Nextray Technologies",
  description:
    "Complete sitemap of Nextray Technologies website — products, blog, about pages, gallery and contact.",
  path: "/sitemap",
});

export default async function HtmlSitemapPage() {
  const posts = await fetchBlogPosts();

  const sections = [
    {
      title: "Main Pages",
      links: [
        { label: "Home", href: "/" },
        { label: "Blog", href: "/blog" },
        { label: "Contact Us", href: "/contact" },
        { label: "Be Our Associates", href: "/associates" },
      ],
    },
    {
      title: "About Us",
      links: aboutSubnav.map((l) => ({ label: l.label, href: l.href })),
    },
    {
      title: "Products",
      links: [
        { label: "Indoor Lights", href: "/products/indoor" },
        { label: "Outdoor Lights", href: "/products/outdoor" },
        { label: "Industrial Lights", href: "/products/industrial" },
        { label: "Powertronics", href: "/products/powertronics" },
        ...allProducts.map((p) => ({
          label: p.title,
          href: `${p.categoryHref}/${p.slug}`,
        })),
      ],
    },
    {
      title: "Gallery & Strength",
      links: [
        { label: "Projects Gallery", href: "/gallery/projects" },
        { label: "Events Gallery", href: "/gallery/events" },
        { label: "Infrastructure", href: "/strength/infrastructure" },
        { label: "Our Presence", href: "/strength/our-presence" },
      ],
    },
    {
      title: "Blog Posts",
      links: posts.map((p) => ({ label: p.title, href: `/blog/${p.slug}` })),
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Use", href: "/terms-of-use" },
        { label: "XML Sitemap", href: "/sitemap.xml" },
      ],
    },
  ];

  return (
    <PageShell title="Sitemap" breadcrumbs={[{ label: "Sitemap" }]}>
      <p className="text-theme-body mb-8 text-sm">
        Browse all pages on the Nextray Technologies website. For search engines,
        see also{" "}
        <Link href="/sitemap.xml" className="text-nextray-green hover:underline">
          sitemap.xml
        </Link>
        .
      </p>
      <div className="grid gap-8 md:grid-cols-2">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="mb-3 font-heading text-lg font-bold text-nextray-green">
              {section.title}
            </h2>
            <ul className="space-y-1.5">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-theme-body hover:text-nextray-green"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
