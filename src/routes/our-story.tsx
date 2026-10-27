import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/sections/PageHero";
import { StatsBand } from "@/components/sections/CtaBanner";
import { StoryTimeline } from "@/components/sections/StoryTimeline";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title: "Our Story | SOSync Ai Tech IT Solution" },
      {
        name: "description",
        content:
          "From a co-working desk in Kharadi, Pune to a global technology partner — the journey of SOSync Ai Tech IT Solution.",
      },
      { property: "og:title", content: "Our Story | SOSync Ai Tech IT Solution" },
      {
        property: "og:description",
        content: "The company journey of SOSync Ai Tech IT Solution, from founding to global delivery.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OurStoryPage,
});

function OurStoryPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Our Story"
          title="Built on belief, scaled by results"
          description="How three engineers with one conviction grew SOSync into a full-stack technology partner serving 15+ countries."
        />
        <StoryTimeline />
        <StatsBand />
      </main>
      <Footer />
    </>
  );
}
