import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { StarRating } from "@/components/StarRating";
import { useSiteData } from "@/context/SiteDataContext";

const AUTOPLAY_MS = 5000;

/** Auto-sliding featured testimonial carousel with manual controls. */
export function TestimonialSlider() {
  const { data } = useSiteData();
  const testimonials = data.testimonials;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || testimonials.length < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, testimonials.length]);

  if (testimonials.length === 0) return null;
  const current = testimonials[index] ?? testimonials[0];
  if (!current) return null;

  return (
    <section id="testimonials" className="section-pad relative overflow-hidden bg-navy">
      <div className="dot-grid-light absolute inset-0 opacity-40" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-1/3 size-[30rem] -translate-x-1/2 rounded-full bg-brand/15 blur-3xl animate-pulse-glow"
        aria-hidden="true"
      />
      <div className="container-site relative">
        <SectionHeading
          tone="light"
          eyebrow="Testimonials"
          title="What our clients say"
          description="Real words from the founders and leaders we build for."
        />

        <Reveal delay={120}>
          <div
            className="mx-auto mt-14 max-w-3xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="glass-dark relative rounded-3xl border border-white/10 p-8 sm:p-12">
              <Icon name="quote" className="absolute left-8 top-8 size-10 text-cyan/30" />
              <div key={current.id} className="reveal reveal-visible">
                <StarRating rating={current.rating} className="justify-center sm:justify-start" />
                <p className="mt-6 text-center text-lg leading-relaxed text-slate-100 sm:text-left sm:text-xl">
                  "{current.review}"
                </p>
                <div className="mt-8 flex items-center justify-center gap-4 sm:justify-start">
                  <span className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-brand to-cyan font-display text-lg font-bold text-white">
                    {current.initials}
                  </span>
                  <div>
                    <p className="font-display text-base font-bold text-white">{current.name}</p>
                    <p className="text-sm text-slate-300">
                      {current.role}, {current.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-7 flex items-center justify-center gap-5">
              <button
                aria-label="Previous testimonial"
                onClick={() => setIndex((index - 1 + testimonials.length) % testimonials.length)}
                className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-cyan/60 hover:text-cyan"
              >
                <Icon name="chevron-right" className="size-4 rotate-180" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((t, i) => (
                  <button
                    key={t.id}
                    aria-label={`Go to testimonial ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === index ? "w-7 bg-gradient-to-r from-brand to-cyan" : "w-2.5 bg-white/25 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
              <button
                aria-label="Next testimonial"
                onClick={() => setIndex((index + 1) % testimonials.length)}
                className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-cyan/60 hover:text-cyan"
              >
                <Icon name="chevron-right" className="size-4" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
