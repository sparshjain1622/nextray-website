import PageShell from "@/components/layout/PageShell";
import AssociatesContent from "@/components/associates/AssociatesContent";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata = buildPageMetadata({
  title: "Be Our Associates | Nextray Technologies — Distributor & Agent",
  description:
    "Partner with Nextray Technologies as an agent or distributor. Join our nationwide network of LED lighting associates across India.",
  path: "/associates",
  keywords: [
    "LED distributor India",
    "Nextray dealer",
    "LED lighting agent",
    "become Nextray associate",
  ],
});

export default function AssociatesPage() {
  return (
    <PageShell
      title="Be Our Associates"
      breadcrumbs={[{ label: "Be Our Associates" }]}
    >
      <AssociatesContent />
    </PageShell>
  );
}
