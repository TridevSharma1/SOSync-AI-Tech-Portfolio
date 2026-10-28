interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
}

/** Dark inner-page hero shared by Portfolio, Testimonials, Our Story and Contact. */
export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy pt-24 pb-12 sm:pt-32 sm:pb-16 md:pt-40 md:pb-20">
      <div className="hero-grid-line absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-brand/25 blur-3xl animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-0 size-80 rounded-full bg-cyan/20 blur-3xl animate-pulse-glow"
        aria-hidden="true"
      />
      <div className="container-site relative text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-sky">
          {eyebrow}
        </span>
        <h1 className="mx-auto mt-4 sm:mt-5 max-w-3xl text-2xl xs:text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mx-auto mt-3 sm:mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
