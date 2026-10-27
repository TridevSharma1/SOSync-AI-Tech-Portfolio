import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PortfolioStorySection } from "@/components/sections/PortfolioStorySection";
import { RecentProjectsSection } from "@/components/sections/RecentProjectsSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SOSync Ai Tech IT Solution | AI, Software & Digital Innovation" },
      {
        name: "description",
        content:
          "SOSync Ai Tech IT Solution, Kharadi Pune: web & mobile apps, AI solutions, cloud, ERP, CRM and custom software for growing businesses.",
      },
      { property: "og:title", content: "SOSync Ai Tech IT Solution" },
      {
        property: "og:description",
        content: "Transforming businesses through AI, software and digital innovation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
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
