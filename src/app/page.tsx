import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PortfolioStorySection } from "@/components/sections/PortfolioStorySection";
import { RecentProjectsSection } from "@/components/sections/RecentProjectsSection";

export const metadata: Metadata = {
  title: "SOSync Ai Tech IT Solution | AI, Software & Digital Innovation",
  description:
    "SOSync Ai Tech IT Solution, Kharadi Pune: web & mobile apps, AI solutions, cloud, ERP, CRM and custom software for growing businesses.",
  openGraph: {
    title: "SOSync Ai Tech IT Solution",
    description: "Transforming businesses through AI, software and digital innovation.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar lightTop />
      <main className="pt-14 sm:pt-16">
        {/* 1st: About Us */}
        <PortfolioStorySection />
        {/* 2nd: Recent Projects / Portfolio */}
        <RecentProjectsSection />
      </main>
      <Footer />
    </>
  );
}
