import PageShell from "@/components/layout/PageShell";
import GreenSidebar from "@/components/layout/GreenSidebar";
import { ContentCard } from "@/components/layout/ContentCard";
import ImageGallery from "@/components/gallery/ImageGallery";
import { gallerySubnav, eventItems } from "@/lib/site-pages-data";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata = buildPageMetadata({
  title: "Events & Exhibitions Gallery | Nextray Technologies",
  description:
    "Nextray Technologies events, celebrations and exhibitions including LED Expo, Acetech, Smart City Expo and D-Arc Build.",
  path: "/gallery/events",
  image: "/images/gallery/6.jpg",
  keywords: ["LED Expo", "Nextray events", "lighting exhibition India"],
});

export default function GalleryEventsPage() {
  return (
    <PageShell
      title="Events"
      breadcrumbs={[
        { label: "Gallery", href: "/gallery/projects" },
        { label: "Events" },
      ]}
      sidebar={<GreenSidebar heading="Gallery" items={gallerySubnav} />}
    >
      <ContentCard title="Events & Exhibitions">
        <ImageGallery items={eventItems} />
      </ContentCard>
    </PageShell>
  );
}
