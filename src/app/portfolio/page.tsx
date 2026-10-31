import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PortfolioStorySection } from "@/components/sections/PortfolioStorySection";
import { RecentProjectsSection } from "@/components/sections/RecentProjectsSection";

export const metadata: Metadata = {
  title: "Portfolio | SOSync Ai Tech IT Solution",
  description:
    "Explore web, mobile, AI, ERP, CRM and e-commerce projects delivered by SOSync Ai Tech IT Solution, Kharadi Pune.",
  openGraph: {
    title: "Portfolio | SOSync Ai Tech IT Solution",
    description: "Web, mobile, AI, ERP, CRM and e-commerce projects delivered by SOSync Ai Tech.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#030712]">
        {/* 1st: 360 Digital Solutions / About Us section */}
        <PortfolioStorySection />
        {/* 2nd: Recent Projects / Portfolio */}
        <RecentProjectsSection />
      </main>
      <Footer />
    </>
  );
}
