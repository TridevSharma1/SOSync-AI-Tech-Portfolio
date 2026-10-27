import { Link } from "@tanstack/react-router";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { StatCounter } from "@/components/StatCounter";
import { useSiteData } from "@/context/SiteDataContext";

/** Full-width animated statistics band (dark). */
export function StatsBand() {
  const { data } = useSiteData();
  return (
    <section className="relative overflow-hidden bg-navy py-16">
      <div className="hero-grid-line absolute inset-0" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-0 size-[26rem] -translate-x-1/2 rounded-full bg-cyan/15 blur-3xl"
        aria-hidden="true"
      />
      <div className="container-site relative grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
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
          <div className="relative overflow-hidden rounded-4xl px-8 py-14 text-center sm:px-14" style={{ background: "var(--gradient-deep)" }}>
            <div className="dot-grid-light absolute inset-0 opacity-40" aria-hidden="true" />
            <div
              className="absolute -right-20 -top-20 size-72 rounded-full bg-cyan/25 blur-3xl animate-pulse-glow"
              aria-hidden="true"
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl">
                Have a project in mind? Let's turn it into reality.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-slate-300">
                Book a free consultation with our senior engineers — no obligation, just clarity.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="btn btn-gradient">
                  Get a Free Quote
                  <Icon name="arrow-right" className="size-4" />
                </Link>
                <Link to="/portfolio" className="btn btn-ghost-light">
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
