"use client";

import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { useSiteData } from "@/context/SiteDataContext";

const SOCIALS = ["linkedin", "twitter", "instagram", "facebook", "github"] as const;

/**
 * Modern, cohesive footer matching the website's clean white, obsidian & tech-orange design language.
 */
export function Footer() {
  const { data } = useSiteData();
  const { company, social } = data;

  return (
    <footer className="relative border-t border-border/70 bg-white text-muted-foreground overflow-hidden">
      {/* Top brand gradient accent line */}
      <div className="h-[2px] w-full bg-gradient-brand" />

      {/* Subtle ambient glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-primary/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-site relative py-10 sm:py-12 lg:py-14">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
          {/* Brand & Location */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Logo tone="dark" name={company.name} />
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-muted-foreground">
              {company.tagline}
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Icon name="pin" className="size-3.5 text-primary shrink-0" />
              <span>{company.addressLines[1] || company.addressLines[0] || "Pune, Maharashtra, India"}</span>
            </div>
          </div>

          {/* Navigation Links with pill hover states */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-foreground/80"
          >
            <Link
              href="/portfolio"
              className="rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 transition-all hover:bg-primary-soft hover:text-primary"
            >
              Portfolio
            </Link>
            <Link
              href="/testimonials"
              className="rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 transition-all hover:bg-primary-soft hover:text-primary"
            >
              Testimonials
            </Link>
            <Link
              href="/our-story"
              className="rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 transition-all hover:bg-primary-soft hover:text-primary"
            >
              Our Story
            </Link>
            <Link
              href="/contact"
              className="rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 transition-all hover:bg-primary-soft hover:text-primary"
            >
              Contact
            </Link>
          </nav>

          {/* Contact Pills & Social Buttons */}
          <div className="flex flex-col items-center gap-3 lg:items-end w-full sm:w-auto">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <a
                href={`tel:${company.phones[0]?.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground transition-all hover:border-primary hover:text-primary hover:shadow-xs"
              >
                <span className="flex size-5 items-center justify-center rounded-full bg-primary-soft text-primary shrink-0">
                  <Icon name="phone" className="size-3" />
                </span>
                <span className="truncate max-w-[150px] sm:max-w-none">{company.phones[0]}</span>
              </a>
              <a
                href={`mailto:${company.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground transition-all hover:border-primary hover:text-primary hover:shadow-xs"
              >
                <span className="flex size-5 items-center justify-center rounded-full bg-primary-soft text-primary shrink-0">
                  <Icon name="mail" className="size-3" />
                </span>
                <span className="truncate max-w-[160px] sm:max-w-none">{company.email}</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s}
                  href={social[s]}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s}
                  className="flex size-8 items-center justify-center rounded-full border border-border/80 bg-surface text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white hover:shadow-xs"
                >
                  <Icon name={s} filled className="size-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center justify-between gap-3 sm:gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row text-center sm:text-left">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <span className="truncate max-w-[280px] sm:max-w-none">{company.addressLines.join(" · ") || "Kharadi, Pune – 411014"}</span>
            <span className="text-border hidden sm:inline">|</span>
            <Link href="/contact" className="font-semibold text-primary hover:underline">
              Get in Touch →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
