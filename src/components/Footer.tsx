"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { useSiteData } from "@/context/SiteDataContext";

const SOCIAL_LINKS = [
  { name: "linkedin", href: "https://www.linkedin.com/company/sosync", label: "LinkedIn" },
  { name: "twitter", href: "https://x.com/sosync_in", label: "X" },
  { name: "instagram", href: "https://www.instagram.com/sosync.in", label: "Instagram" },
  { name: "youtube", href: "https://www.youtube.com/@sosync", label: "YouTube" },
  { name: "facebook", href: "https://www.facebook.com/sosync.in", label: "Facebook" },
] as const;

export function Footer() {
  const { data } = useSiteData();
  const { company } = data;
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 4000);
  };

  const primaryPhone = company.phones?.[0] || "+91 91724 03714";
  const secondaryPhone = company.phones?.[1] || "+91 70043 30655";
  const supportEmail = company.email || "support@sosync.in";

  const socialLinks = [
    { name: "linkedin", href: data.social?.linkedin || "https://www.linkedin.com/company/sosync", label: "LinkedIn" },
    { name: "twitter", href: data.social?.twitter || "https://x.com/sosync_in", label: "X" },
    { name: "instagram", href: data.social?.instagram || "https://www.instagram.com/sosync.in", label: "Instagram" },
    { name: "youtube", href: "https://www.youtube.com/@sosync", label: "YouTube" },
    { name: "facebook", href: data.social?.facebook || "https://www.facebook.com/sosync.in", label: "Facebook" },
  ];

  return (
    <footer className="border-t border-border bg-gradient-warm text-muted-foreground relative overflow-hidden">
      {/* Top Brand Accent Line */}
      <div className="h-[2px] w-full bg-gradient-brand" />

      <div className="container-px mx-auto max-w-7xl py-12 sm:py-16">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Column 1: Brand Info & Socials */}
          <div className="flex flex-col">
            <Logo tone="dark" name={company.name} />
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              An AI-native digital solutions firm helping ambitious teams design, build and scale modern software, brands and experiences.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-8 w-8 place-items-center rounded-full border border-border bg-white text-foreground/70 transition-all hover:border-primary hover:text-primary hover:-translate-y-0.5 hover:shadow-xs"
                >
                  <Icon name={s.name} className="size-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links (Only Portfolio, Testimonials, Our Story) */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">Quick Links</h4>
            <ul className="mt-3.5 space-y-2.5 text-xs text-muted-foreground">
              <li>
                <Link className="hover:text-primary transition-colors font-medium" href="/portfolio">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors font-medium" href="/testimonials">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors font-medium" href="/our-story">
                  Our Story
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Office */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">Contact</h4>
            <ul className="mt-3.5 space-y-3 text-xs text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <Icon name="phone" className="mt-0.5 size-3.5 shrink-0 text-primary" />
                <div className="flex flex-col gap-1">
                  <a
                    href={`tel:${primaryPhone.replace(/\s+/g, "")}`}
                    className="hover:text-primary transition-colors whitespace-nowrap"
                  >
                    {primaryPhone}
                  </a>
                  <a
                    href={`tel:${secondaryPhone.replace(/\s+/g, "")}`}
                    className="hover:text-primary transition-colors whitespace-nowrap"
                  >
                    {secondaryPhone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="mail" className="mt-0.5 size-3.5 shrink-0 text-primary" />
                <a
                  href={`mailto:${supportEmail}`}
                  className="hover:text-primary transition-colors break-all"
                >
                  {supportEmail}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="pin" className="mt-0.5 size-3.5 shrink-0 text-primary" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Rushub+Biiz+Bay,+Sprint+Workspace,+Above+Motherhood+Hospital,+Thite+Nagar,+Kharadi,+Pune,+Maharashtra+411014"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors leading-snug"
                >
                  Unit No. 416A, 4th Floor, Rushub Biiz Bay, Sprint Workspace, Above Motherhood Hospital, Thite Nagar, Kharadi, Pune, Maharashtra – 411014
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Interactive Location Map */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-foreground">Newsletter</h4>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Monthly insights on AI & product engineering.
              </p>
              <div className="mt-3">
                <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-full border border-border bg-white px-4 py-2 text-xs sm:text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-brand px-4 py-2 text-xs sm:text-sm font-semibold text-primary-foreground shadow-soft transition-all duration-200 hover:-translate-y-0.5"
                  >
                    {subscribed ? "Subscribed! ✓" : "Subscribe"}
                    {!subscribed && <Icon name="arrow-right" className="size-3.5" />}
                  </button>
                </form>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-foreground mb-1.5">Location</h4>
              <div className="relative h-28 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-xs group">
                <iframe
                  title="Office Location Map"
                  src="https://maps.google.com/maps?q=Unit%20No.%20416A%2C%204th%20Floor%2C%20Rushub%20Biiz%20Bay%2C%20Sprint%20Workspace%2C%20Above%20Motherhood%20Hospital%2C%20Thite%20Nagar%2C%20Kharadi%2C%20Pune%2C%20Maharashtra%20%E2%80%93%20411014&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="h-full w-full border-0 grayscale-[10%] group-hover:grayscale-0 transition-all duration-300 pointer-events-none"
                  loading="lazy"
                />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Rushub+Biiz+Bay,+Sprint+Workspace,+Above+Motherhood+Hospital,+Thite+Nagar,+Kharadi,+Pune,+Maharashtra+411014"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-2 left-2 z-10 inline-flex items-center gap-1 rounded-lg bg-white/95 px-2.5 py-1 text-[11px] font-bold text-[#1a73e8] shadow-md border border-slate-200/90 backdrop-blur-xs transition hover:bg-white hover:scale-105"
                >
                  Maps
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-external-link size-3 text-[#1a73e8]"
                  >
                    <path d="M15 3h6v6" />
                    <path d="M10 14 21 3" />
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="mt-12 sm:mt-14 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row text-center sm:text-left">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <span className="text-border">|</span>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
          <p className="text-foreground/70 font-medium">Innovate. Integrate. Elevate.</p>
        </div>
      </div>
    </footer>
  );
}
