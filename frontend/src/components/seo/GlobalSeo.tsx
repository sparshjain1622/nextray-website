import OrganizationJsonLd from "./OrganizationJsonLd";
import WebSiteJsonLd from "./WebSiteJsonLd";

/** Sitewide structured data — rendered on all public pages */
export default function GlobalSeo() {
  return (
    <>
      <OrganizationJsonLd />
      <WebSiteJsonLd />
    </>
  );
}
