import PageShell from "@/components/layout/PageShell";
import { ContentCard, BodyText } from "@/components/layout/ContentCard";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { COMPANY } from "@/lib/site-seo";

export const metadata = buildPageMetadata({
  title: "Terms of Use | Nextray Technologies",
  description:
    "Terms of use for the Nextray Technologies website — usage guidelines, intellectual property and disclaimers.",
  path: "/terms-of-use",
});

export default function TermsOfUsePage() {
  return (
    <PageShell title="Terms of Use" breadcrumbs={[{ label: "Terms of Use" }]}>
      <ContentCard title="Terms of Use">
        <BodyText>
          <p>
            By accessing {COMPANY.url}, you agree to these terms. If you do not agree,
            please do not use this website.
          </p>
          <p>
            <strong>Website content:</strong> Product specifications, images and
            descriptions are provided for informational purposes. Nextray reserves the
            right to modify products and specifications without prior notice.
          </p>
          <p>
            <strong>Intellectual property:</strong> All content, trademarks, logos and
            materials on this site are owned by {COMPANY.legalName} or its licensors
            and may not be reproduced without written permission.
          </p>
          <p>
            <strong>Disclaimer:</strong> This website is provided &quot;as is&quot;.
            Nextray makes no warranties regarding accuracy or availability. We are not
            liable for damages arising from use of this site.
          </p>
          <p>
            <strong>Governing law:</strong> These terms are governed by the laws of
            India. Disputes are subject to the jurisdiction of courts in Vadodara,
            Gujarat.
          </p>
          <p>
            <strong>Contact:</strong> {COMPANY.email} | {COMPANY.phone}
          </p>
          <p className="text-sm opacity-70">Last updated: June 2026</p>
        </BodyText>
      </ContentCard>
    </PageShell>
  );
}
