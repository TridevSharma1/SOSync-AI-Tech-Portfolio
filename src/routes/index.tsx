import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { TechnologiesSection } from "@/components/sections/TechnologiesSection";
import { PortfolioPreview } from "@/components/sections/PortfolioGrid";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CtaBanner, StatsBand } from "@/components/sections/CtaBanner";
import { TestimonialSlider } from "@/components/sections/TestimonialSlider";
import { TeamSection } from "@/components/sections/TeamSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactSection } from "@/components/sections/ContactSection";

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
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <ServicesSection />
        <WhyChooseUs />
        <StatsBand />
        <TechnologiesSection />
        <PortfolioPreview />
        <ProcessSection />
        <TestimonialSlider />
        <TeamSection />
        <FaqSection />
        <CtaBanner />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
