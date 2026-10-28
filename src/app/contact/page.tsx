import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ContactSection } from "@/components/sections/ContactSection";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Contact Us | SOSync Ai Tech IT Solution",
  description:
    "Contact SOSync Ai Tech IT Solution in Kharadi, Pune — call +91 91724 03714 or email support@sosyncaitech.in for a free project consultation.",
  openGraph: {
    title: "Contact Us | SOSync Ai Tech IT Solution",
    description:
      "Get in touch with SOSync Ai Tech IT Solution, Kharadi, Pune — free consultation within one business day.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function ContactPage() {
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
