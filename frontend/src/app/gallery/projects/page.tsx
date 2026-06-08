import PageShell from "@/components/layout/PageShell";
import GreenSidebar from "@/components/layout/GreenSidebar";
import { ContentCard } from "@/components/layout/ContentCard";
import ImageGallery from "@/components/gallery/ImageGallery";
import { gallerySubnav, projectGalleryItems } from "@/lib/site-pages-data";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata = buildPageMetadata({
  title: "LED Lighting Projects Gallery | Nextray Technologies",
  description:
    "Explore Nextray Technologies LED lighting projects across residential, commercial, industrial and government installations in India.",
  path: "/gallery/projects",
  image: "/images/project/project-01.webp",
  keywords: [
    "LED projects India",
    "commercial LED installation",
    "street light projects",
    "Nextray gallery",
  ],
});

export default function GalleryProjectsPage() {
  return (
    <PageShell
      title="Projects"
      breadcrumbs={[
        { label: "Gallery", href: "/gallery/projects" },
        { label: "Projects" },
      ]}
      sidebar={<GreenSidebar heading="Gallery" items={gallerySubnav} />}
    >
      <ContentCard title="Our Projects">
        <ImageGallery items={projectGalleryItems} />
      </ContentCard>
    </PageShell>
  );
}
