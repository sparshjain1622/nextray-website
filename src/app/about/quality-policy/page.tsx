import type { Metadata } from "next";
import AboutPageShell from "@/components/about/AboutPageShell";
import { aboutPages } from "@/lib/about-data";

const data = aboutPages["quality-policy"];

export const metadata: Metadata = {
  title: `${data.title} | Nextray Technologies`,
  description: data.metaDescription,
};

export default function QualityPolicyPage() {
  return <AboutPageShell data={data} />;
}
