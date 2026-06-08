import PageShell from "@/components/layout/PageShell";
import { ContentCard, BodyText } from "@/components/layout/ContentCard";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { COMPANY } from "@/lib/site-seo";

export const metadata = buildPageMetadata({
  title: "Privacy Policy | Nextray Technologies",
  description:
    "Privacy policy for Nextray Technologies website — how we collect, use and protect your personal information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <PageShell title="Privacy Policy" breadcrumbs={[{ label: "Privacy Policy" }]}>
      <ContentCard title="Privacy Policy">
        <BodyText>
          <p>
            {COMPANY.legalName} (&quot;Nextray&quot;, &quot;we&quot;, &quot;us&quot;) respects your
            privacy. This policy explains how we handle information submitted through
            our website at {COMPANY.url}.
          </p>
          <p>
            <strong>Information we collect:</strong> When you submit a contact or
            associates form, we collect the details you provide (name, email, phone,
            company, message) to respond to your inquiry.
          </p>
          <p>
            <strong>How we use it:</strong> Form data is used solely to process your
            request, provide customer support and improve our services. We do not sell
            personal data to third parties.
          </p>
          <p>
            <strong>Analytics:</strong> We record anonymous page views (URL path and
            referrer) to understand site usage. No personally identifiable information
            is stored in analytics.
          </p>
          <p>
            <strong>Data retention:</strong> Form submissions are retained as long as
            necessary for business purposes and deleted upon request where legally
            permitted.
          </p>
          <p>
            <strong>Contact:</strong> For privacy-related questions, email{" "}
            <a href={`mailto:${COMPANY.email}`} className="text-nextray-green">
              {COMPANY.email}
            </a>{" "}
            or call {COMPANY.phone}.
          </p>
          <p className="text-sm opacity-70">Last updated: June 2026</p>
        </BodyText>
      </ContentCard>
    </PageShell>
  );
}
