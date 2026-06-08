import AboutPageShell from "@/components/about/AboutPageShell";
import { aboutPages } from "@/lib/about-data";
import { aboutPageMetadata } from "@/lib/about-seo";

const data = aboutPages['vision-mission'];

export const metadata = aboutPageMetadata(data, "/about/vision-mission");

export default function AboutSubPage() {
  return <AboutPageShell data={data} />;
}
