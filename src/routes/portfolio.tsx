import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/sections/PageHero";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";

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
      <Navbar />
      <main>
        <PageHero
          eyebrow="Portfolio"
          title="Work we're proud of"
          description="Platforms, apps and AI systems shipped for clients across e-commerce, healthcare, fintech, manufacturing and education."
        />
        <PortfolioGrid />
      </main>
      <Footer />
    </>
  );
}
