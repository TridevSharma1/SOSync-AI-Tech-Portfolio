import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { useSiteData } from "@/context/SiteDataContext";

const NAV_LINKS = [
  { label: "Portfolio", to: "/portfolio" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Our Story", to: "/our-story" },
] as const;

interface NavbarProps {
  /** When true, renders a clean glass navbar with dark text even before scrolling (for pages with light top sections). */
  lightTop?: boolean;
}

/** Sticky navbar: transparent over dark hero, glass with dark text once scrolled or on light pages. */
export function Navbar({ lightTop = false }: NavbarProps) {
  const { data } = useSiteData();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isGlass = lightTop || scrolled;
  const tone: "light" | "dark" = isGlass ? "dark" : "light";
  const phoneHref = `tel:${(data.company.phones[0] ?? "").replace(/\s/g, "")}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isGlass ? "glass py-2 shadow-soft border-b border-border/40" : "bg-transparent py-4"
      }`}
    >
      <div className="container-site flex items-center justify-between gap-4">
        <Link to="/" aria-label="SOSync home" onClick={() => setMenuOpen(false)}>
          <Logo tone={tone} name={data.company.name} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-full px-4 py-2 text-sm font-medium transition-colors [&.active]:bg-brand/10 [&.active]:text-brand"
              style={{ color: isGlass ? "var(--ink)" : "#fff" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={phoneHref}
            className="btn btn-gradient btn-sm hidden sm:inline-flex"
            aria-label={`Call ${data.company.phones[0]}`}
          >
            <Icon name="phone" className="size-4" />
            Call Now
          </a>

          {/* Hamburger */}
          <button
            className="rounded-lg p-2 lg:hidden"
            style={{ color: isGlass ? "var(--ink)" : "#fff" }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Icon name={menuOpen ? "close" : "menu"} className="size-6" />
          </button>
        </div>
      </div>

      {/* Mobile slide menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!menuOpen}
      >
        <div
          className={`absolute inset-0 bg-navy/60 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />
        <nav
          className={`absolute right-0 top-0 flex h-full w-80 max-w-[85vw] flex-col gap-1 bg-navy p-6 pt-24 shadow-lift transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          aria-label="Mobile"
        >
          <button
            className="absolute right-5 top-6 rounded-lg p-2 text-white"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <Icon name="close" className="size-6" />
          </button>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 font-display text-base font-semibold text-white transition-colors hover:bg-white/10 [&.active]:bg-white/10 [&.active]:text-brand"
            >
              {link.label}
            </Link>
          ))}
          <a href={phoneHref} className="btn btn-gradient mt-4 w-full">
            <Icon name="phone" className="size-4" />
            Call Now — {data.company.phones[0]}
          </a>
        </nav>
      </div>
    </header>
  );
}
