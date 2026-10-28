import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { useSiteData } from "@/context/SiteDataContext";

/** Vertical alternating company-journey timeline. */
export function StoryTimeline() {
  const { data } = useSiteData();
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="dot-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="container-site relative">
        <SectionHeading
          eyebrow="Our Story"
          title="From a co-working desk to a global technology partner"
          description="The milestones that shaped SOSync into the company our clients rely on today."
        />

        <div className="relative mx-auto mt-12 sm:mt-16 max-w-4xl">
          {/* Center rail */}
          <div
            className="absolute left-4 sm:left-5 top-0 h-full w-0.5 bg-gradient-to-b from-brand via-cyan to-sky md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />

          <div className="space-y-8 sm:space-y-10">
            {data.story.map((event, i) => {
              const leftSide = i % 2 === 0;
              return (
                <Reveal key={event.id} delay={i * 80}>
                  <div
                    className={`relative flex flex-col gap-4 pl-11 sm:pl-14 md:w-1/2 md:pl-0 ${
                      leftSide ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
                    }`}
                  >
                    {/* Node */}
                    <span
                      className={`absolute top-1 flex size-8 sm:size-10 items-center justify-center rounded-full bg-gradient-to-br from-brand to-cyan text-white shadow-glow left-0 ${
                        leftSide ? "md:-right-5 md:left-auto" : "md:-left-5"
                      }`}
                      aria-hidden="true"
                    >
                      <Icon name="award" className="size-3.5 sm:size-4" />
                    </span>
                    <div className="card-soft p-4 sm:p-6">
                      <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand">
                        {event.year}
                      </span>
                      <h3 className="mt-2.5 sm:mt-3 font-display text-base sm:text-lg font-bold text-foreground">{event.title}</h3>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">{event.description}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
