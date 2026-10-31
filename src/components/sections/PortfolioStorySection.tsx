"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Sparkles, Check, ChevronLeft, ChevronRight, Phone, ArrowRight } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";

const DEFAULT_SLIDES = [
  { src: "/about-story-slide-2.jpg", alt: "SOSync AI Tech Executive Leadership", title: "Executive Leadership" },
  { src: "/about-story-slide-1.jpg", alt: "SOSync AI Tech Engineers & Team", title: "Engineering Excellence" },
  { src: "/about-story-slide-3.jpg", alt: "SOSync AI Tech Innovations", title: "AI & Cloud Innovation" },
];

const CAPABILITIES = [
  "Website Development",
  "Software Development",
  "Mobile Apps",
  "Cloud Solution",
  "Digital Marketing",
  "IT Solution",
] as const;

export function PortfolioStorySection({ className = "" }: { className?: string } = {}) {
  const { story360Slides, admin360Slides, projects, data } = useSiteData();
  const [mounted, setMounted] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const phoneDisplay = data.company.phones[0] || "+91 91724 03714";
  const phoneClean = phoneDisplay.replace(/[^0-9+]/g, "");

  // Strictly show ONLY:
  // 1. Images added by admin in 360 digital section (Story360)
  // 2. Project images (projects with showIn360 enabled, excluding dummy template projects)
  const dynamicSlides = useMemo(() => {
    // 1. Custom 360 images added by admin
    const custom = (admin360Slides || [])
      .filter((s) => s.active !== false && s.src && !s.src.startsWith("/about-story-slide-") && !s.src.includes("tlnk9z76rpxuhobvirlj"))
      .map((s) => ({
        _id: s._id,
        src: s.src,
        alt: s.alt || s.title || "SOSync 360 Digital Solution",
        title: s.title || "",
        isProject: false,
      }));

    // 2. Project images with showIn360 enabled
    const projectItems = (projects || [])
      .filter((p) => p.showIn360 !== false && Boolean(p.image) && !p.image.includes("tlnk9z76rpxuhobvirlj"))
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
        (s) => s.src && !s.src.startsWith("/about-story-slide-") && !s.src.includes("tlnk9z76rpxuhobvirlj")
      );
      if (filtered.length > 0) return filtered;
      return story360Slides.filter((s) => !s.src.includes("tlnk9z76rpxuhobvirlj"));
    }

    return DEFAULT_SLIDES;
  }, [admin360Slides, projects, story360Slides]);

  // Prevent SSR/client hydration mismatch by using DEFAULT_SLIDES during SSR/first hydrate
  const slides = mounted ? dynamicSlides : DEFAULT_SLIDES;

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
    <section className={`pt-2 sm:pt-3 pb-12 sm:pb-16 lg:pb-20 relative overflow-hidden bg-[#030712] ${className}`.trim()}>
      <div className="dot-grid absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true" />
      <div className="container-site relative">
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: Pure Frameless Edge-to-Edge Screenshot (Zero Corner Radius, No Downside Box) */}
          <div className="relative lg:col-span-6">
            <div
              className="group relative w-full"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              {/* Soft Ambient Floating Backlight Aura */}
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-tr from-amber-500/15 via-blue-600/15 to-transparent blur-2xl pointer-events-none -z-10" />

              {/* Zero-Radius Card (100% Uncropped Corners, Exact Fit Without Downside Box) */}
              <div
                suppressHydrationWarning
                className="relative aspect-video w-full overflow-hidden rounded-none shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] ring-1 ring-white/10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  suppressHydrationWarning
                  alt={currentSlide.alt ?? "SOSync AI Tech Digital Solution"}
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.01]"
                  src={currentSlide.src ?? "/about-story-slide-2.jpg"}
                />

                {/* Minimal Floating Navigation Arrows */}
                <button
                  type="button"
                  aria-label="Previous slide"
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 grid h-8 w-8 sm:h-9 sm:w-9 place-items-center bg-black/75 text-white backdrop-blur-md border border-white/20 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-amber-500 hover:text-black cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next slide"
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 grid h-8 w-8 sm:h-9 sm:w-9 place-items-center bg-black/75 text-white backdrop-blur-md border border-white/20 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-amber-500 hover:text-black cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Minimal Clean Dots Below Screenshot */}
              <div suppressHydrationWarning className="mt-3.5 flex items-center justify-center gap-1.5 overflow-hidden">
                {slides.slice(0, 10).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`Go to slide ${idx + 1}`}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-1.5 sm:h-2 transition-all duration-300 rounded-full cursor-pointer ${
                      activeSlide % slides.length === idx ? "w-6 sm:w-7 bg-amber-500" : "w-1.5 sm:w-2 bg-white/20 hover:bg-white/50"
                    }`}
                  />
                ))}
                {slides.length > 10 && (
                  <span className="text-[10px] text-white/50 font-bold ml-1">+{slides.length - 10}</span>
                )}
              </div>
            </div>
          </div>

          {/* Right: Story Content (Full natural width, no distortion) */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-black uppercase tracking-widest text-amber-400 shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>ABOUT US</span>
            </div>

            <h2 className="mt-4 text-2xl xs:text-3xl font-bold leading-[1.18] text-white sm:text-4xl lg:text-5xl font-display">
              We design, build, and scale{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-200">
                digital products
              </span>
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-blue-100/90 sm:text-base lg:text-lg">
              <span className="font-extrabold text-amber-400">SOSync AI Tech</span> is a trusted{" "}
              <span className="font-extrabold text-amber-400">Software Development &amp; Digital Marketing</span>{" "}
              company in <span className="font-extrabold text-amber-400">Pune</span> focused on high quality, simple design, and fast delivery. We build custom websites, mobile applications, and smart software solutions that help businesses grow and succeed online with ease.
            </p>

            {/* Feature Checklist (6 Services) */}
            <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {CAPABILITIES.map((cap) => (
                <div key={cap} className="flex items-center gap-2.5">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-blue-100">
                    {cap}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col xs:flex-row items-stretch xs:items-center gap-3 sm:gap-4">
              <a
                href={`tel:${phoneClean}`}
                className="btn btn-gradient px-6 py-3 text-sm font-extrabold text-black shadow-lg shadow-amber-500/25 animate-border-glow-orange cursor-pointer inline-flex items-center justify-center gap-2"
                title={`Call: ${phoneDisplay}`}
                aria-label={`Enquiry Now: ${phoneDisplay}`}
              >
                <Phone size={15} />
                <span>Enquiry Now</span>
              </a>
              <Link
                href="/portfolio"
                className="btn btn-secondary-gray px-6 py-3 text-sm font-semibold text-blue-200 hover:text-white cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <span>Explore Portfolio</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
