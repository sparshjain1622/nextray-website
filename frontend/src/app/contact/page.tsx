import PageShell from "@/components/layout/PageShell";
import { ContentCard } from "@/components/layout/ContentCard";
import SiteForm from "@/components/forms/SiteForm";
import ContactInfo from "@/components/contact/ContactInfo";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata = buildPageMetadata({
  title: "Contact Us | Nextray Technologies — Vadodara, Gujarat",
  description:
    "Get in touch with Nextray Technologies for sales, purchase, government projects and general inquiries. Call 7096015151 or email sales@nextray-tech.com. Vadodara, Gujarat.",
  path: "/contact",
  keywords: [
    "contact Nextray",
    "LED lighting inquiry",
    "Nextray Vadodara",
    "LED sales India",
  ],
});

const inquiryFields = [
  {
    name: "name",
    label: "Name",
    type: "text" as const,
    required: true,
    placeholder: "Your name",
  },
  {
    name: "email",
    label: "Email",
    type: "email" as const,
    required: true,
    placeholder: "you@company.com",
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel" as const,
    required: true,
    placeholder: "+91 XXXXX XXXXX",
  },
  {
    name: "subject",
    label: "Subject",
    type: "text" as const,
    required: true,
    placeholder: "Inquiry subject",
  },
  {
    name: "message",
    label: "Message",
    type: "textarea" as const,
    required: true,
    placeholder: "How can we help you?",
    rows: 5,
    colSpan: 2 as const,
  },
];

export default function ContactPage() {
  return (
    <PageShell title="Contact Us" breadcrumbs={[{ label: "Contact Us" }]}>
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <ContentCard title="Send Us a Message">
          <SiteForm
            endpoint="contact"
            fields={inquiryFields}
            submitLabel="Send Message"
            onSubmitMessage="We have received your message and will get back to you shortly."
            note="Fields marked with * are required."
          />
        </ContentCard>
        <ContactInfo />
      </div>
    </PageShell>
  );
}
