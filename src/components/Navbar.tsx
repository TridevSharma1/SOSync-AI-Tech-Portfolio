"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useSiteData } from "@/context/SiteDataContext";

const NAV_LINKS = [
  { label: "Portfolio", to: "/portfolio" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Why SOSync", to: "/why-sosync" },
  { label: "Our Story", to: "/our-story" },
] as const;

interface NavbarProps {
  lightTop?: boolean;
}

/**
 * Floating Capsule Navigation Header
 * Features theatrical floating frosted capsule,
 * laser underline border, glowing active pills, and shimmering live call button.
 */
export function Navbar({ lightTop: _lightTop = false }: NavbarProps) {
  const { data } = useSiteData();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const phoneDisplay = data.company.phones[0] || "+91 91724 03714";
  const phoneClean = phoneDisplay.replace(/[^0-9+]/g, "");

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#030712]/90 backdrop-blur-2xl border-b border-amber-500/30 shadow-[0_8px_32px_rgba(0,0,0,0.6)] py-2 sm:py-2.5"
          : "bg-[#030712]/75 backdrop-blur-xl border-b border-blue-900/40 py-3 sm:py-3.5"
      }`}
    >
      {/* Subtle Glowing Laser Ambient Accent Line at Bottom of Navbar */}
      <div className="absolute bottom-0 inset-x-0 h-[1.5px] animate-navbar-laser pointer-events-none opacity-85" />

      <div className="container-site flex items-center justify-between gap-3 sm:gap-6">
        {/* 1. Left: Brand Logo */}
        <Link
          href="/portfolio"
          className="flex items-center gap-3 shrink-0 py-0.5 group focus-visible:outline-none"
          aria-label="SOSync home"
        >
          <div className="relative py-0.5">
            <Logo tone="light" name={data.company.name} />
          </div>
        </Link>

        {/* 2. Center: Floating Frosted Glass Capsule Navigation */}
        <nav
          className="hidden md:flex items-center p-1.5 rounded-full bg-[#0B152B]/70 border border-blue-900/60 backdrop-blur-xl shadow-lg shadow-black/20 gap-1.5 relative overflow-visible group/nav"
          aria-label="Primary navigation"
        >
          {/* Ambient light shimmer effect across capsule */}
          <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent opacity-0 group-hover/nav:opacity-100 transition-opacity duration-500 overflow-hidden -z-0" />

          {NAV_LINKS.map((link) => {
            const isActive =
              link.to === "/portfolio"
                ? pathname === "/" || pathname === "/portfolio" || pathname === "/our-work"
                : link.to === "/why-sosync"
                ? pathname === "/why-sosync" || pathname === "/why-choose-us"
                : link.to === "/our-story"
                ? pathname === "/our-story" || pathname === "/about"
                : pathname === link.to || pathname.startsWith(link.to);

            return (
              <Link
                key={link.to}
                href={link.to}
                className={`relative px-4 py-1.5 rounded-full text-xs lg:text-sm font-extrabold tracking-wide transition-all duration-300 cursor-pointer select-none inline-flex items-center gap-1.5 ${
                  isActive
                    ? "bg-gradient-to-r from-orange-600 to-orange-500 text-black shadow-lg shadow-orange-500/35 scale-105 animate-nav-active-pill z-10 font-black"
                    : "text-blue-100/80 hover:text-white hover:bg-white/10 hover:shadow-[0_0_12px_rgba(245,158,11,0.15)] hover:scale-105"
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 rounded-full bg-orange-400 blur-[2px] -z-10" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* 3. Right: Live Call Button with Border Glow */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <a
            href={`tel:${phoneClean}`}
            className="relative overflow-hidden group/call inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-600 via-[#FF6B00] to-orange-500 hover:brightness-110 text-black px-3.5 sm:px-5 h-9 sm:h-10 font-black shadow-lg shadow-orange-500/35 hover:shadow-orange-500/50 hover:scale-[1.04] active:scale-95 transition-all text-xs sm:text-sm cursor-pointer border border-orange-300/70 animate-border-glow-call"
            title={`Call: ${phoneDisplay}`}
            aria-label={`Call: ${phoneDisplay}`}
          >
            {/* Sweeping metallic light sheen */}
            <span className="pointer-events-none absolute inset-0 -top-1 -bottom-1 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-demo-shimmer -z-0" />

            <span className="relative flex size-2 shrink-0 z-10">
              <span className="animate-ping absolute inline-flex size-full rounded-full bg-white opacity-90"></span>
              <span className="relative inline-flex rounded-full size-2 bg-white"></span>
            </span>
            <Phone size={13} className="shrink-0 z-10 group-hover/call:animate-phone-ring" />
            <span className="hidden sm:inline font-mono font-extrabold tracking-tight z-10">{phoneDisplay}</span>
            <span className="sm:hidden font-bold z-10">Call</span>
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            className={`md:hidden text-foreground hover:bg-[#0B152B] size-9 rounded-full border border-blue-900/60 flex items-center justify-center cursor-pointer transition-transform duration-300 ${
              mobileOpen ? "rotate-90 bg-[#0B152B]" : "rotate-0"
            }`}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={19} className="text-amber-400" /> : <Menu size={19} className="text-white" />}
          </button>
        </div>
      </div>

      {/* 4. Mobile Navigation Dropdown Sheet */}
      {mobileOpen && (
        <div className="container-site mt-3 border-t border-amber-500/30 bg-[#030712]/95 backdrop-blur-2xl py-4 md:hidden animate-in fade-in-50 slide-in-from-top-4 duration-300 rounded-b-3xl shadow-2xl shadow-black/60 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {NAV_LINKS.map((link, idx) => {
              const isActive =
                link.to === "/portfolio"
                  ? pathname === "/" || pathname === "/portfolio" || pathname === "/our-work"
                  : link.to === "/why-sosync"
                  ? pathname === "/why-sosync" || pathname === "/why-choose-us"
                  : link.to === "/our-story"
                  ? pathname === "/our-story" || pathname === "/about"
                  : pathname === link.to || pathname.startsWith(link.to);

              return (
                <Link
                  onClick={() => setMobileOpen(false)}
                  key={link.to}
                  href={link.to}
                  style={{ animationDelay: `${idx * 40}ms` }}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 font-extrabold text-xs sm:text-sm transition-all border duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-orange-600 to-orange-500 text-black border-orange-300 shadow-md shadow-orange-500/35 animate-border-glow-orange font-black"
                      : "bg-[#0B152B]/60 text-white border-blue-900/60 hover:bg-[#0B152B] hover:border-amber-500/40 hover:text-amber-400"
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={14} className={isActive ? "text-black" : "opacity-60"} />
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-blue-900/40">
            <a
              href={`tel:${phoneClean}`}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-600 via-[#FF6B00] to-orange-500 hover:brightness-110 text-black py-3 font-extrabold text-xs uppercase tracking-wider shadow-md shadow-orange-500/30"
            >
              <Phone size={14} />
              <span>Call Direct ({phoneDisplay})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
