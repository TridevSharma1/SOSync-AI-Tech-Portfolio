import { useState } from "react";
import { Link } from "@tanstack/react-router";

const SLIDES = [
  { src: "/about-story-slide-2.jpg", alt: "SOSync AI Tech Executive Leadership" },
  { src: "/about-story-slide-1.jpg", alt: "SOSync AI Tech Engineers & Team" },
  { src: "/about-story-slide-3.jpg", alt: "SOSync AI Tech Innovations" },
];

const CAPABILITIES = [
  "Search Engine Optimization",
  "Creative and Graphic Design",
  "Social Media Marketing",
  "Website & Custom Software Design",
  "Google Ads & PPC",
  "Multimedia & Influencer Marketing",
] as const;

export function PortfolioStorySection() {
  const [activeSlide, setActiveSlide] = useState(0);

  const prevSlide = () => setActiveSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  const nextSlide = () => setActiveSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));

  return (
    <section className="section-pad relative overflow-hidden bg-background">
      <div className="dot-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="container-site relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: Circular Image Carousel + 360 Badge */}
          <div className="relative lg:col-span-5">
            <div className="group relative mx-auto flex max-w-[420px] items-center justify-center lg:max-w-none">
              <div className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-tr from-primary/25 via-orange-100/40 to-amber-100/30 blur-2xl" />
              <div className="relative aspect-square w-full max-w-[360px] sm:max-w-[420px] overflow-hidden rounded-full border-[6px] border-white bg-card shadow-2xl ring-8 ring-primary/15">
                <img
                  alt={SLIDES[activeSlide]?.alt ?? "SOSync AI Tech"}
                  className="h-full w-full object-cover object-top transition-opacity duration-500"
                  src={SLIDES[activeSlide]?.src ?? "/about-story-slide-2.jpg"}
                />

                {/* Dots */}
                <div className="absolute bottom-5 left-0 right-0 z-30 flex items-center justify-center gap-1.5">
                  {SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      aria-label={`Go to slide ${idx + 1}`}
                      onClick={() => setActiveSlide(idx)}
                      className={`h-2 transition-all duration-300 rounded-full shadow-xs ${
                        activeSlide === idx ? "w-7 bg-primary" : "w-2 bg-white/80 hover:bg-white"
                      }`}
                    />
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  type="button"
                  aria-label="Previous slide"
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-30 grid h-8 w-8 place-items-center rounded-full bg-white/80 text-foreground shadow-md opacity-0 transition-all duration-300 hover:bg-primary hover:text-white group-hover:opacity-100"
                >
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
                    className="lucide lucide-chevron-left h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Next slide"
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-30 grid h-8 w-8 place-items-center rounded-full bg-white/80 text-foreground shadow-md opacity-0 transition-all duration-300 hover:bg-primary hover:text-white group-hover:opacity-100"
                >
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
                    className="lucide lucide-chevron-right h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>

              {/* 360 Degree Digital Solutions Badge */}
              <div className="absolute -top-3 -left-3 sm:-top-5 sm:-left-4 z-30 flex h-28 w-28 sm:h-36 sm:w-36 flex-col items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-orange-500 via-orange-600 to-amber-500 p-2 sm:p-3 text-center text-white shadow-[0_14px_35px_rgba(249,115,22,0.45)] transition-transform duration-300 hover:scale-105">
                <div className="text-2xl sm:text-3xl font-black tracking-tight leading-none text-white drop-shadow-sm">
                  360°
                </div>
                <div className="mt-1 text-[10px] sm:text-xs font-bold leading-tight uppercase tracking-wider text-white/95">
                  Digital<br />Solutions
                </div>
              </div>
            </div>
          </div>

          {/* Right: Story Content */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-soft px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary shadow-xs">
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

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-[2.65rem] lg:leading-[1.18]">
              Story of <span className="text-gradient-brand">SOSync AI Tech</span>
            </h2>

            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">
              <strong className="font-semibold text-foreground">SOSync AI Tech</strong> is a trusted{" "}
              <strong className="font-semibold text-foreground">Software Development &amp; Digital Marketing</strong>{" "}
              company in <strong className="font-semibold text-foreground">Pune</strong> focused on high quality, simple design, and fast delivery. We use modern tools and smart ideas to build digital solutions that help our clients grow their businesses smoothly. We value honest work, clear communication, and real results that you can see. We specialize in building fast websites, custom business software, and clean marketing campaigns that give your brand a strong presence online.
            </p>

            <h3 className="mt-7 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Your Trusted Software &amp; Digital Marketing Partner for Business Growth
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Just like a good recipe needs the right ingredients, your business needs the right mix of technology, clean design, and smart marketing to succeed. We are here to help you achieve that.
            </p>

            {/* 6 Capabilities Grid */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {CAPABILITIES.map((cap) => (
                <div
                  key={cap}
                  className="group flex items-center gap-3 rounded-xl border border-border/70 bg-card/90 px-3.5 py-2.5 shadow-xs transition-all hover:border-primary/40 hover:bg-primary-soft/30 hover:shadow-sm"
                >
                  <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 border-primary/40 bg-primary-soft text-primary transition-transform group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
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
                      className="lucide lucide-arrow-right h-3.5 w-3.5 stroke-[2.5]"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-foreground/90 transition-colors group-hover:text-primary">
                    {cap}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-8 flex items-center">
              <Link
                to="/our-story"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:bg-primary/90 hover:shadow-elegant hover:gap-3"
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
