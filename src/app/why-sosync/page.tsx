import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WhySOSyncView } from "@/components/why-sosync/WhySOSyncView";

export const metadata: Metadata = {
  title: "Why SOSync AI Tech | Proven Results, Modern Tech & 6 Months Free Support",
  description:
    "Discover why businesses choose SOSync AI Tech for web and software engineering. Explore our track record, 9-phase development process, industry domain experience, and complimentary 6 months support guarantee.",
  openGraph: {
    title: "Why Choose SOSync AI Tech — Reliable Engineering & 6 Months Free Support",
    description:
      "At SOSync AI Tech, we do more than just make websites and software—we work alongside you to help your business succeed. 50+ projects delivered, 8+ specialist engineers, and 6 months included free support.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function WhySOSyncPage() {
  return (
    <>
      <Navbar />
      <main>
        <WhySOSyncView />
      </main>
      <Footer />
    </>
  );
}
