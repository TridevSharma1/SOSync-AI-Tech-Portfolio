import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PortfolioStorySection } from "@/components/sections/PortfolioStorySection";
import { RecentProjectsSection } from "@/components/sections/RecentProjectsSection";

export const metadata: Metadata = {
  title: "Portfolio | SOSync Ai Tech IT Solution",
  description:
    "Explore web, mobile, AI, ERP, CRM and e-commerce projects delivered by SOSync Ai Tech IT Solution, Kharadi Pune.",
};

export default function OurWorkPage() {
  return (
    <>
      <Navbar lightTop />
      <main className="pt-14 sm:pt-16">
        <PortfolioStorySection />
        <RecentProjectsSection />
      </main>
      <Footer />
    </>
  );
}
