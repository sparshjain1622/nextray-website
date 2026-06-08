import PageShell from "@/components/layout/PageShell";
import GreenSidebar from "@/components/layout/GreenSidebar";
import { ContentCard, BodyText, BulletList } from "@/components/layout/ContentCard";
import { strengthSubnav, strengthInfrastructure } from "@/lib/site-pages-data";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata = buildPageMetadata({
  title: "Manufacturing Infrastructure | Nextray Technologies",
  description:
    "Nextray Technologies manufacturing infrastructure — 10,000+ sq. ft. facility with state-of-the-art machinery for LED lighting production in Vadodara.",
  path: "/strength/infrastructure",
  keywords: ["LED manufacturing facility", "Nextray infrastructure", "Vadodara factory"],
});

export default function StrengthInfrastructurePage() {
  return (
    <PageShell
      title="Infrastructure"
      breadcrumbs={[
        { label: "Our Strength", href: "/strength/infrastructure" },
        { label: "Infrastructure" },
      ]}
      sidebar={<GreenSidebar heading="Our Strength" items={strengthSubnav} />}
    >
      <ContentCard title="Infrastructure">
        {strengthInfrastructure.intro.map((paragraph) => (
          <BodyText key={paragraph}>{paragraph}</BodyText>
        ))}

        <h3 className="mb-4 mt-6 font-heading text-lg font-bold text-inherit">
          Machinery and Equipment
        </h3>
        <BulletList items={strengthInfrastructure.machinery} />
      </ContentCard>
    </PageShell>
  );
}
