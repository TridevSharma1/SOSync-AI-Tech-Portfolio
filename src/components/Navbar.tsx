"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { useSiteData } from "@/context/SiteDataContext";

const NAV_LINKS = [
  { label: "Portfolio", to: "/portfolio" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Our Story", to: "/our-story" },
  { label: "Contact", to: "/contact" },
] as const;

interface NavbarProps {
  /** When true, renders a clean glass navbar with dark text even before scrolling (for pages with light top sections). */
  lightTop?: boolean;
}

/** Sticky navbar: transparent over dark hero, glass with dark text once scrolled or on light pages. */
export function Navbar({ lightTop = false }: NavbarProps) {
  const { data } = useSiteData();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isGlass = lightTop || scrolled;
  const tone: "dark" | "light" = isGlass ? "dark" : "light";
  const phoneHref = `tel:${(data.company.phones[0] ?? "+91 91724 03714").replace(/\s/g, "")}`;
  const phoneDisplay = data.company.phones[0] || "+91 91724 03714";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 transition-all duration-300">
        <div
          className={`w-full transition-all duration-300 ${
            isGlass
              ? "glass py-2.5 shadow-soft border-b border-border/40"
              : "bg-transparent py-3 sm:py-4"
          }`}
        >
          <div className="container-site flex items-center justify-between gap-4">
            <Link
              href="/"
              aria-label="SOSync home"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-lg"
              onClick={() => setMenuOpen(false)}
            >
              <Logo tone={tone} name={data.company.name} />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    href={link.to}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isActive ? "bg-brand/10 text-brand font-semibold" : ""
                    }`}
                    style={{ color: isActive ? "var(--brand)" : isGlass ? "var(--ink)" : "#fff" }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href={phoneHref}
                className="btn btn-gradient btn-sm hidden sm:inline-flex"
                aria-label={`Call ${phoneDisplay}`}
              >
                <Icon name="phone" className="size-4" />
                Call Now
              </a>

              {/* Hamburger Button */}
              <button
                className={`grid size-10 place-items-center rounded-xl p-2 transition-colors lg:hidden ${
                  isGlass
                    ? "text-foreground hover:bg-black/5"
                    : "text-white hover:bg-white/10"
                }`}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
              >
                <Icon name={menuOpen ? "close" : "menu"} className="size-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile slide menu - Standalone full-screen overlay outside the glass header */}
      <div
        className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${
          menuOpen ? "pointer-events-auto opacity-100 visible" : "pointer-events-none opacity-0 invisible"
        }`}
        aria-hidden={!menuOpen}
      >
        {/* Full-screen backdrop */}
        <div
          className="fixed inset-0 bg-navy/80 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer panel */}
        <nav
          className={`fixed right-0 top-0 bottom-0 flex h-full h-[100dvh] w-full max-w-[320px] flex-col justify-between bg-navy p-6 shadow-2xl transition-transform duration-300 ease-out overflow-y-auto ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          aria-label="Mobile Navigation"
        >
          {/* Drawer Header */}
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <Logo tone="light" name={data.company.name} />
              <button
                className="grid size-9 place-items-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                <Icon name="close" className="size-5" />
              </button>
            </div>

            {/* Links */}
            <div className="mt-6 flex flex-col gap-1.5">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    href={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 font-display text-base font-semibold transition-all ${
                      isActive
                        ? "bg-brand text-white shadow-md shadow-brand/30"
                        : "text-slate-200 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span>{link.label}</span>
                    <Icon name="arrow-right" className="size-4 opacity-70" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div className="mt-8 border-t border-white/10 pt-6 space-y-3">
            <a
              href={phoneHref}
              className="btn btn-gradient w-full py-3.5 flex items-center justify-center gap-2 text-sm font-bold shadow-glow"
            >
              <Icon name="phone" className="size-4" />
              <span className="truncate">Call Now — {phoneDisplay}</span>
            </a>

            <div className="flex items-center justify-between gap-2 px-1 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 truncate">
                <Icon name="pin" className="size-3.5 text-brand shrink-0" />
                <span className="truncate">Kharadi, Pune</span>
              </div>
              <span className="shrink-0 text-slate-500">•</span>
              <a
                href={`mailto:${data.company.email}`}
                className="truncate text-slate-300 hover:text-brand transition-colors"
              >
                {data.company.email}
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
