"use client";

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
    <section id="testimonials" className="section-pad relative overflow-hidden bg-[#030712]">
      <div className="dot-grid absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 size-[30rem] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[140px]"
        aria-hidden="true"
      />
      <div className="container-site relative">
        <SectionHeading
          eyebrow="Testimonials"
          title="What our clients say"
          description="Real words from the founders and leaders we build for."
        />

        <Reveal delay={120}>
          <div
            className="mx-auto mt-10 sm:mt-14 max-w-3xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative rounded-3xl border border-blue-900/60 bg-[#0B152B]/90 p-6 sm:p-10 md:p-12 shadow-2xl hover:border-amber-500/50 transition-all duration-300">
              <div key={current.id} className="reveal reveal-visible">
                {/* Header: Quote Badge on left, Star Rating on right */}
                <div className="flex items-center justify-between gap-4 mb-5 sm:mb-6">
                  <span className="flex size-10 sm:size-12 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/20 shadow-xs">
                    <Icon name="quote" className="size-5 sm:size-6" />
                  </span>
                  <StarRating rating={current.rating} />
                </div>
                <p className="text-base sm:text-xl leading-relaxed text-white font-medium">
                  &ldquo;{current.review}&rdquo;
                </p>
                <div className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-4">
                  <span className="flex size-12 sm:size-14 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 font-display text-base sm:text-lg font-bold text-black shadow-md shrink-0">
                    {current.initials}
                  </span>
                  <div className="text-left">
                    <p className="font-display text-sm sm:text-base font-bold text-white">{current.name}</p>
                    <p className="text-xs sm:text-sm text-blue-200/70">
                      {[current.role, current.company].filter(Boolean).join(" · ") || "Client"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-6 sm:mt-7 flex items-center justify-center gap-3 sm:gap-5">
              <button
                aria-label="Previous testimonial"
                onClick={() => setIndex((index - 1 + testimonials.length) % testimonials.length)}
                className="flex size-9 sm:size-10 items-center justify-center rounded-full border border-blue-900/60 bg-[#070F1E] text-blue-200 transition-all hover:border-amber-500 hover:text-white shrink-0 cursor-pointer"
              >
                <Icon name="chevron-right" className="size-4 rotate-180" />
              </button>
              <div className="flex gap-1.5 sm:gap-2 max-w-[160px] sm:max-w-none overflow-x-auto no-scrollbar py-1">
                {testimonials.map((t, i) => (
                  <button
                    key={t.id}
                    aria-label={`Go to testimonial ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 shrink-0 cursor-pointer ${
                      i === index ? "w-6 sm:w-7 bg-amber-500 shadow-xs" : "w-2 sm:w-2.5 bg-blue-950 hover:bg-blue-900"
                    }`}
                  />
                ))}
              </div>
              <button
                aria-label="Next testimonial"
                onClick={() => setIndex((index + 1) % testimonials.length)}
                className="flex size-9 sm:size-10 items-center justify-center rounded-full border border-blue-900/60 bg-[#070F1E] text-blue-200 transition-all hover:border-amber-500 hover:text-white shrink-0 cursor-pointer"
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
