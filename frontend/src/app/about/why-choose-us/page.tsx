import AboutPageShell from "@/components/about/AboutPageShell";
import { aboutPages } from "@/lib/about-data";
import { aboutPageMetadata } from "@/lib/about-seo";

const data = aboutPages['why-choose-us'];

export const metadata = aboutPageMetadata(data, "/about/why-choose-us");

export default function AboutSubPage() {
  return <AboutPageShell data={data} />;
}
