import { Link } from "@tanstack/react-router";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { useSiteData } from "@/context/SiteDataContext";

const SOCIALS = ["linkedin", "twitter", "instagram", "facebook", "github"] as const;

export function Footer() {
  const { data } = useSiteData();
  const { company, social, services } = data;

  return (
    <footer className="relative overflow-hidden bg-navy text-slate-300">
      <div className="hero-grid-line absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -right-32 -top-32 size-96 rounded-full bg-brand/25 blur-3xl animate-pulse-glow"
        aria-hidden="true"
      />
      <div className="container-site relative py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.4fr]">
          {/* Brand */}
          <div>
            <Logo tone="light" name={company.name} />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              {company.tagline} We partner with startups and enterprises worldwide to design,
              build and scale intelligent digital products.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s}
                  href={social[s]}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s}
                  className="flex size-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-slate-300 transition-all hover:-translate-y-0.5 hover:border-cyan/60 hover:text-cyan"
                >
                  <Icon name={s} filled className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links">
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                { label: "Home", to: "/" },
                { label: "Portfolio", to: "/portfolio" },
                { label: "Testimonials", to: "/testimonials" },
                { label: "Our Story", to: "/our-story" },
                { label: "Contact", to: "/contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="inline-flex items-center gap-2 transition-colors hover:text-cyan"
                  >
                    <Icon name="chevron-right" className="size-3.5 text-cyan" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services">
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">
              Services
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {services.slice(0, 8).map((s) => (
                <li key={s.id}>
                  <a
                    href="/#services"
                    className="inline-flex items-center gap-2 transition-colors hover:text-cyan"
                  >
                    <Icon name="chevron-right" className="size-3.5 text-cyan" />
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">
              Get in Touch
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <Icon name="pin" className="mt-0.5 size-4 shrink-0 text-cyan" />
                <span className="text-slate-400">
                  {company.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
              {company.phones.map((p) => (
                <li key={p} className="flex gap-3">
                  <Icon name="phone" className="mt-0.5 size-4 shrink-0 text-cyan" />
                  <a href={`tel:${p.replace(/\s/g, "")}`} className="transition-colors hover:text-cyan">
                    {p}
                  </a>
                </li>
              ))}
              <li className="flex gap-3">
                <Icon name="mail" className="mt-0.5 size-4 shrink-0 text-cyan" />
                <a href={`mailto:${company.email}`} className="transition-colors hover:text-cyan">
                  {company.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Icon name="clock" className="mt-0.5 size-4 shrink-0 text-cyan" />
                <span className="text-slate-400">
                  {company.workingDays}, {company.hours}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-xs text-slate-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="transition-colors hover:text-cyan">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-cyan">
              Terms &amp; Conditions
            </a>
            {/* Clearly visible admin redirect, per spec */}
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 font-semibold text-white transition-colors hover:border-cyan/60 hover:text-cyan"
            >
              <Icon name="dashboard" className="size-3.5" />
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
