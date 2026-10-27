import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";
import { Icon } from "@/components/Icon";
import { Navbar } from "@/components/Navbar";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { StarRating } from "@/components/StarRating";
import { TestimonialSlider } from "@/components/sections/TestimonialSlider";
import { useSiteData } from "@/context/SiteDataContext";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials | SOSync Ai Tech IT Solution" },
      {
        name: "description",
        content:
          "What clients across 15+ countries say about working with SOSync Ai Tech IT Solution — rated 4.9/5 for quality, speed and support.",
      },
      { property: "og:title", content: "Testimonials | SOSync Ai Tech IT Solution" },
      {
        property: "og:description",
        content: "Client reviews for SOSync Ai Tech IT Solution — rated 4.9/5 across 150+ engagements.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  const { data } = useSiteData();

  return (
    <>
      <Navbar />
      <main className="bg-navy pt-16 sm:pt-20">
        <TestimonialSlider />

        <section className="section-pad bg-secondary/50">
          <div className="container-site">
            <SectionHeading
              eyebrow="All Reviews"
              title="Every review, unfiltered"
              description="Collected from long-term clients across web, mobile, AI and enterprise engagements."
            />
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.testimonials.map((t, i) => (
                <Reveal key={t.id} delay={(i % 3) * 80} className="h-full">
                  <div className="card-soft flex h-full flex-col p-6">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-brand">
                      <Icon name="quote" className="size-5" />
                    </span>
                    <StarRating rating={t.rating} className="mt-4" />
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">"{t.review}"</p>
                    <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                      <span className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-brand to-cyan font-display text-sm font-bold text-white">
                        {t.initials}
                      </span>
                      <div>
                        <p className="font-display text-sm font-bold text-foreground">{t.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {t.role}, {t.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
