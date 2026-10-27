interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
}

/** Dark inner-page hero shared by Portfolio, Testimonials, Our Story and Contact. */
export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="hero-grid-line absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -right-24 -top-24 size-96 rounded-full bg-brand/25 blur-3xl animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="absolute -left-32 bottom-0 size-80 rounded-full bg-cyan/20 blur-3xl animate-pulse-glow"
        aria-hidden="true"
      />
      <div className="container-site relative text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky">
          {eyebrow}
        </span>
        <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
