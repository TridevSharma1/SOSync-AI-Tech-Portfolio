import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ContactSection } from "@/components/sections/ContactSection";
import { PageHero } from "@/components/sections/PageHero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | SOSync Ai Tech IT Solution" },
      {
        name: "description",
        content:
          "Contact SOSync Ai Tech IT Solution in Kharadi, Pune — call +91 91724 03714 or email support@sosyncaitech.in for a free project consultation.",
      },
      { property: "og:title", content: "Contact Us | SOSync Ai Tech IT Solution" },
      {
        property: "og:description",
        content: "Get in touch with SOSync Ai Tech IT Solution, Kharadi, Pune — free consultation within one business day.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Contact"
          title="Let's talk about your next big thing"
          description="Call, email or drop us a message — a senior engineer replies within one business day."
        />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
