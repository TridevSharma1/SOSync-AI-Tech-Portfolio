"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSiteData } from "@/context/SiteDataContext";

const INITIAL_PROJECT_TITLES = new Set([
  "phoolrani sarees",
  "sp art hubs",
  "karyon college",
  "sonai residential world school",
  "sonai school erp software",
  "erudition infinite",
  "suraj naturo dry fruits",
  "finsight ai",
  "medicare+ mobile app",
  "salessync crm",
  "manufactpro erp",
  "nova brand identity system",
  "pixelcraft ui kit & graphics",
]);

const DEFAULT_SLIDES = [
  { src: "/about-story-slide-2.jpg", alt: "SOSync AI Tech Executive Leadership", title: "Executive Leadership" },
  { src: "/about-story-slide-1.jpg", alt: "SOSync AI Tech Engineers & Team", title: "Engineering Excellence" },
  { src: "/about-story-slide-3.jpg", alt: "SOSync AI Tech Innovations", title: "AI & Cloud Innovation" },
];

const CAPABILITIES = [
  "Search Engine Optimization",
  "Creative and Graphic Design",
  "Social Media Marketing",
  "Website & Custom Software Design",
  "Google Ads & PPC",
  "Multimedia & Influencer Marketing",
] as const;

export function PortfolioStorySection({ className = "" }: { className?: string } = {}) {
  const { story360Slides, admin360Slides, projects } = useSiteData();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Strictly show ONLY:
  // 1. Images added by admin in 360 digital section (Story360)
  // 2. Project images (projects with showIn360 enabled, excluding dummy template projects)
  const slides = useMemo(() => {
    // 1. Custom 360 images added by admin
    const custom = (admin360Slides || [])
      .filter((s) => s.active !== false && s.src && !s.src.startsWith("/about-story-slide-"))
      .map((s) => ({
        _id: s._id,
        src: s.src,
        alt: s.alt || s.title || "SOSync 360 Digital Solution",
        title: s.title || "",
        isProject: false,
      }));

    // Check if real admin projects exist
    const hasAdminProjects = (projects || []).some((p) => {
      const t = (p.title || "").trim().toLowerCase();
      return !INITIAL_PROJECT_TITLES.has(t);
    });

    // 2. Project images with showIn360 enabled
    const projectItems = (projects || [])
      .filter((p) => {
        if (p.showIn360 === false) return false;
        const t = (p.title || "").trim().toLowerCase();
        // Exclude initial template dummy projects if real admin projects exist
        if (hasAdminProjects && INITIAL_PROJECT_TITLES.has(t)) {
          return false;
        }
        return Boolean(p.image);
      })
      .map((p) => ({
        _id: `proj-${p._id || p.id}`,
        src: p.image,
        alt: `${p.title} — ${p.category}`,
        title: p.title,
        isProject: true,
        projectHref: p.href,
      }));

    // Combine: 360 images added by admin + Project images
    const combined = [...custom, ...projectItems];

    if (combined.length > 0) {
      return combined;
    }

    // Fallback: If story360Slides from API exists and has non-dummy slides
    if (story360Slides && story360Slides.length > 0) {
      const filtered = story360Slides.filter(
        (s) => s.src && !s.src.startsWith("/about-story-slide-")
      );
      if (filtered.length > 0) return filtered;
      return story360Slides;
    }

    return DEFAULT_SLIDES;
  }, [admin360Slides, projects, story360Slides]);

  const currentSlide = slides[activeSlide % slides.length] || slides[0] || DEFAULT_SLIDES[0];

  // Auto-slide effect (advances every 3.5 seconds, pauses on hover/touch)
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const prevSlide = () => setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () => setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  return (
    <section className={`pt-2 sm:pt-3 pb-12 sm:pb-16 lg:pb-20 relative overflow-hidden bg-background ${className}`.trim()}>
      <div className="dot-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="container-site relative">
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: Circular Image Carousel + 360 Badge */}
          <div className="relative lg:col-span-5">
            <div
              className="group relative mx-auto flex max-w-[320px] xs:max-w-[360px] sm:max-w-[420px] items-center justify-center lg:max-w-none"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              <div className="absolute -inset-3 sm:-inset-6 rounded-full bg-gradient-to-tr from-primary/25 via-orange-100/40 to-amber-100/30 blur-xl sm:blur-2xl" />
              <div className="relative aspect-square w-full max-w-[270px] xs:max-w-[310px] sm:max-w-[360px] md:max-w-[420px] overflow-hidden rounded-full border-4 sm:border-[6px] border-white bg-card shadow-xl sm:shadow-2xl ring-4 sm:ring-8 ring-primary/15">
                <img
                  alt={currentSlide.alt ?? "SOSync AI Tech 360 Digital Solution"}
                  className="h-full w-full object-cover object-top transition-opacity duration-500"
                  src={currentSlide.src ?? "/about-story-slide-2.jpg"}
                />

                {/* Project / Slide Title Overlay Badge */}
                {currentSlide.title && (
                  <div className="absolute bottom-10 sm:bottom-12 inset-x-4 sm:inset-x-8 z-20 flex justify-center pointer-events-none">
                    <span className="rounded-full bg-navy/85 backdrop-blur-md px-3 py-1 text-[11px] sm:text-xs font-semibold text-white shadow-md border border-white/20 truncate max-w-[90%] text-center">
                      {currentSlide.title}
                    </span>
                  </div>
                )}

                {/* Dots */}
                <div className="absolute bottom-3 sm:bottom-5 left-0 right-0 z-20 flex items-center justify-center gap-1.5 px-4 overflow-hidden">
                  {slides.slice(0, 10).map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      aria-label={`Go to slide ${idx + 1}`}
                      onClick={() => setActiveSlide(idx)}
                      className={`h-2 transition-all duration-300 rounded-full shadow-xs ${
                        activeSlide % slides.length === idx ? "w-6 sm:w-7 bg-primary" : "w-2 bg-white/80 hover:bg-white"
                      }`}
                    />
                  ))}
                  {slides.length > 10 && (
                    <span className="text-[10px] text-white/90 font-bold ml-1">+{slides.length - 10}</span>
                  )}
                </div>

                {/* Navigation Arrows - Accessible on mobile touch screens */}
                <button
                  type="button"
                  aria-label="Previous slide"
                  onClick={prevSlide}
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full bg-white/90 text-foreground shadow-md opacity-90 transition-all duration-300 hover:bg-primary hover:text-white sm:opacity-0 sm:group-hover:opacity-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-left h-3.5 w-3.5 sm:h-4 sm:w-4"
                    aria-hidden="true"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Next slide"
                  onClick={nextSlide}
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full bg-white/90 text-foreground shadow-md opacity-90 transition-all duration-300 hover:bg-primary hover:text-white sm:opacity-0 sm:group-hover:opacity-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-right h-3.5 w-3.5 sm:h-4 sm:w-4"
                    aria-hidden="true"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>

              {/* 360 Degree Digital Solutions Badge */}
              <div className="absolute -top-2 -left-2 sm:-top-5 sm:-left-4 z-20 flex h-20 w-20 xs:h-24 xs:w-24 sm:h-32 sm:w-32 md:h-36 md:w-36 flex-col items-center justify-center rounded-full border-2 sm:border-4 border-white bg-gradient-to-br from-orange-500 via-orange-600 to-amber-500 p-1.5 sm:p-3 text-center text-white shadow-[0_8px_25px_rgba(249,115,22,0.45)] transition-transform duration-300 hover:scale-105">
                <div className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-black tracking-tight leading-none text-white drop-shadow-sm">
                  360°
                </div>
                <div className="mt-0.5 sm:mt-1 text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs font-bold leading-tight uppercase tracking-wider text-white/95">
                  Digital<br />Solutions
                </div>
              </div>
            </div>
          </div>

          {/* Right: Story Content */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-soft px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-primary shadow-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-sparkles h-3.5 w-3.5"
                aria-hidden="true"
              >
                <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                <path d="M20 2v4" />
                <path d="M22 4h-4" />
                <circle cx="4" cy="20" r="2" />
              </svg>
              {" "}ABOUT US
            </div>

            <h2 className="mt-4 text-2xl xs:text-3xl font-bold leading-[1.18] text-foreground sm:text-4xl lg:text-5xl">
              We design, build, and scale{" "}
              <span className="text-gradient-brand">digital products</span>
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-lg">
              SOSync AI Tech is a full-cycle software development and digital innovation company based in Kharadi, Pune. We partner with fast-growing startups and established enterprises to engineer scalable web platforms, high-performance mobile apps, and robust enterprise software.
            </p>

            {/* Feature Checklist */}
            <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {CAPABILITIES.map((cap) => (
                <div key={cap} className="flex items-center gap-2.5">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-check h-3 w-3"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-foreground/90">
                    {cap}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col xs:flex-row items-stretch xs:items-center gap-3 sm:gap-4">
              <Link
                href="/our-story"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:bg-primary/90 hover:shadow-elegant"
              >
                Learn more about us
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-all text-center"
              >
                Explore Projects ({projects.length})
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
