import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { AboutView } from "@/components/about/AboutView";

export const metadata: Metadata = {
  title: "About SOSync AI Tech | Engineering Journey, Systems & Work",
  description:
    "Explore the journey, full-stack software architecture, enterprise projects, and technical capability deck of SOSync AI Tech IT Solution, Kharadi, Pune.",
  openGraph: {
    title: "About SOSync AI Tech — Engineering Legacy & Technology Deck",
    description: "Dedicated software engineering team, AI architects, and systems developers based in Pune, India.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutView />
      </main>
      <Footer />
    </>
  );
}
