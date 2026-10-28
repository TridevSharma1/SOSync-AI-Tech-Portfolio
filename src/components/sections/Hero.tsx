"use client";

import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { StatCounter } from "@/components/StatCounter";
import { useSiteData } from "@/context/SiteDataContext";

/** Home hero: dark gradient banner image, floating glass cards and animated stats band. */
export function Hero() {
  const { data } = useSiteData();
  const { hero, company, stats } = data;
  const heroStats = stats.slice(0, 4);

  return (
    <section className="relative overflow-hidden bg-navy pt-24 sm:pt-28 md:pt-36">
      {/* Ambient layers */}
      <div className="hero-grid-line absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-40 top-24 size-[28rem] rounded-full bg-brand/30 blur-3xl animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 size-[24rem] rounded-full bg-cyan/25 blur-3xl animate-pulse-glow"
        aria-hidden="true"
      />

      <div className="container-site relative">
        <div className="grid items-center gap-10 pb-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-20">
          {/* Copy */}
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-sky">
              <Icon name="sparkles" className="size-3.5" />
              {hero.badge}
            </span>
            <h1 className="mt-5 text-3xl font-bold leading-[1.12] text-white xs:text-4xl sm:text-5xl lg:text-[3.4rem]">
              {hero.heading}
            </h1>
            <p className="mt-4 sm:mt-6 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-lg">
              {hero.subheading}
            </p>
            <div className="mt-7 sm:mt-8 flex flex-col xs:flex-row items-stretch xs:items-center gap-3 sm:gap-4">
              <Link href="/contact" className="btn btn-gradient justify-center">
                {hero.primaryCta}
                <Icon name="arrow-right" className="size-4" />
              </Link>
              <a href={`tel:${company.phones[0]?.replace(/\s/g, "")}`} className="btn btn-ghost-light justify-center">
                <Icon name="phone" className="size-4" />
                {hero.secondaryCta}
              </a>
            </div>
          </Reveal>

          {/* Banner image with floating glass cards */}
          <Reveal delay={150} className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-white/15 shadow-lift">
              <img
                src="/images/hero-banner.jpg"
                alt="SOSync engineers building AI-powered software"
                width={1920}
                height={1088}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
            </div>
            <div className="glass-dark animate-float absolute -left-4 top-8 hidden items-center gap-3 rounded-2xl px-4 py-3 sm:flex">
              <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-cyan text-white">
                <Icon name="sparkles" className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">AI-Driven Delivery</p>
                <p className="text-xs text-slate-300">Smarter builds, faster launches</p>
              </div>
            </div>
            <div className="glass-dark animate-float-slow absolute -bottom-5 right-6 hidden items-center gap-3 rounded-2xl px-4 py-3 sm:flex">
              <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan to-sky text-white">
                <Icon name="award" className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">4.9/5 Client Rating</p>
                <p className="text-xs text-slate-300">Across 150+ engagements</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Stats band */}
        <Reveal delay={100}>
          <div className="grid grid-cols-2 gap-4 border-t border-white/10 py-8 sm:gap-8 sm:py-10 md:grid-cols-4">
            {heroStats.map((stat) => (
              <StatCounter key={stat.id} value={stat.value} suffix={stat.suffix} label={stat.label} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
