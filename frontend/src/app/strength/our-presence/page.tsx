import PageShell from "@/components/layout/PageShell";
import GreenSidebar from "@/components/layout/GreenSidebar";
import { ContentCard, BodyText, HighlightGrid } from "@/components/layout/ContentCard";
import { strengthSubnav, strengthPresence } from "@/lib/site-pages-data";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata = buildPageMetadata({
  title: "Our Presence — Pan-India LED Lighting | Nextray Technologies",
  description:
    "Nextray Technologies serves clients across India and global markets — LED lighting solutions from Vadodara, Gujarat with nationwide distribution.",
  path: "/strength/our-presence",
  keywords: ["Nextray presence", "LED lighting India", "pan-India LED supplier"],
});


export default function StrengthPresencePage() {
  return (
    <PageShell
      title="Our Presence"
      breadcrumbs={[
        { label: "Our Strength", href: "/strength/infrastructure" },
        { label: "Our Presence" },
      ]}
      sidebar={<GreenSidebar heading="Our Strength" items={strengthSubnav} />}
    >
      <ContentCard title="Our Presence">
        {strengthPresence.intro.map((paragraph) => (
          <BodyText key={paragraph}>{paragraph}</BodyText>
        ))}
        <HighlightGrid items={strengthPresence.highlights} />
      </ContentCard>
    </PageShell>
  );
}
