import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PortfolioStorySection } from "@/components/sections/PortfolioStorySection";
import { RecentProjectsSection } from "@/components/sections/RecentProjectsSection";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio | SOSync Ai Tech IT Solution" },
      {
        name: "description",
        content:
          "Explore web, mobile, AI, ERP, CRM and e-commerce projects delivered by SOSync Ai Tech IT Solution, Kharadi Pune.",
      },
      { property: "og:title", content: "Portfolio | SOSync Ai Tech IT Solution" },
      {
        property: "og:description",
        content: "Web, mobile, AI, ERP, CRM and e-commerce projects delivered by SOSync Ai Tech.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  return (
    <>
      <Navbar lightTop />
      <main className="pt-16 sm:pt-20">
        {/* 1st: About Us */}
        <PortfolioStorySection />
        {/* 2nd: Recent Projects / Portfolio */}
        <RecentProjectsSection />
      </main>
      <Footer />
    </>
  );
}
