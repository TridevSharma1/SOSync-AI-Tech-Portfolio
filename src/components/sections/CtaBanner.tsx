"use client";

import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { StatCounter } from "@/components/StatCounter";
import { useSiteData } from "@/context/SiteDataContext";

/** Full-width animated statistics band (dark). */
export function StatsBand() {
  const { data } = useSiteData();
  return (
    <section className="relative overflow-hidden bg-navy py-12 sm:py-16">
      <div className="hero-grid-line absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 size-[26rem] -translate-x-1/2 rounded-full bg-cyan/15 blur-3xl"
        aria-hidden="true"
      />
      <div className="container-site relative grid grid-cols-2 gap-4 sm:gap-8 md:grid-cols-3 lg:grid-cols-6">
        {data.stats.map((stat, i) => (
          <Reveal key={stat.id} delay={i * 70}>
            <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/** Gradient call-to-action banner shown before the footer. */
export function CtaBanner() {
  return (
    <section className="section-pad">
      <div className="container-site">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl sm:rounded-4xl px-5 py-10 sm:px-14 sm:py-14 text-center" style={{ background: "var(--gradient-deep)" }}>
            <div className="dot-grid-light absolute inset-0 opacity-40 pointer-events-none" aria-hidden="true" />
            <div
              className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-cyan/25 blur-3xl animate-pulse-glow"
              aria-hidden="true"
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-2xl xs:text-3xl font-bold leading-tight text-white sm:text-4xl">
                Have a project in mind? Let&apos;s turn it into reality.
              </h2>
              <p className="mx-auto mt-3 sm:mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                Book a free consultation with our senior engineers — no obligation, just clarity.
              </p>
              <div className="mt-7 sm:mt-8 flex flex-col xs:flex-row justify-center items-stretch xs:items-center gap-3 sm:gap-4">
                <Link href="/contact" className="btn btn-gradient justify-center">
                  Get a Free Quote
                  <Icon name="arrow-right" className="size-4" />
                </Link>
                <Link href="/portfolio" className="btn btn-ghost-light justify-center">
                  See Our Work
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
