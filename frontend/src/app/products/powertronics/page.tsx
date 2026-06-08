import { redirect } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata = buildPageMetadata({
  title: "Powertronics LED Drivers | Nextray Technologies",
  description:
    "Powertronics isolated and non-isolated LED drivers — in-house design and manufacturing by Nextray Technologies, Vadodara.",
  path: "/products/powertronics",
  keywords: ["LED driver India", "Powertronics", "isolated LED driver"],
});

export default function PowertronicsPage() {
  redirect("/products/powertronics/isolated");
}
