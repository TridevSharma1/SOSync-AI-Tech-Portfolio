"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { useSiteData } from "@/context/SiteDataContext";
import { MapPin, ExternalLink } from "lucide-react";

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
    {
      name: "whatsapp",
      iconSrc: "/icons/whatsapp-96.png",
      href: "https://wa.me/919172403714",
      label: "WhatsApp",
      hoverClass: "hover:border-[#25D366] hover:shadow-[0_0_14px_rgba(37,211,102,0.4)]",
    },
    {
      name: "linkedin",
      iconSrc: "/icons/linkedin-96.png",
      href: data.social?.linkedin || "https://www.linkedin.com/company/sosync",
      label: "LinkedIn",
      hoverClass: "hover:border-[#0A66C2] hover:shadow-[0_0_14px_rgba(10,102,194,0.4)]",
    },
    {
      name: "instagram",
      iconSrc: "/icons/instagram-96.png",
      href: data.social?.instagram || "https://www.instagram.com/sosync.in",
      label: "Instagram",
      hoverClass: "hover:border-[#E4405F] hover:shadow-[0_0_14px_rgba(228,64,95,0.4)]",
    },
    {
      name: "facebook",
      iconSrc: "/icons/facebook-96.png",
      href: data.social?.facebook || "https://www.facebook.com/sosync.in",
      label: "Facebook",
      hoverClass: "hover:border-[#1877F2] hover:shadow-[0_0_14px_rgba(24,119,242,0.4)]",
    },
    {
      name: "youtube",
      iconSrc: "/icons/youtube-96.png",
      href: "https://www.youtube.com/@sosync",
      label: "YouTube",
      hoverClass: "hover:border-[#FF0000] hover:shadow-[0_0_14px_rgba(255,0,0,0.4)]",
    },
    {
      name: "x",
      iconSrc: "/icons/x-96.png",
      href: data.social?.twitter || "https://x.com/sosync_in",
      label: "X",
      hoverClass: "hover:border-white hover:shadow-[0_0_14px_rgba(255,255,255,0.4)]",
    },
  ];

  return (
    <footer className="border-t border-blue-900/50 bg-[#030712] text-blue-200/80 relative overflow-hidden">
      {/* Top Brand Accent Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400" />

      {/* Atmospheric ambient blue & orange glows */}
      <div className="pointer-events-none absolute -bottom-24 -left-24 size-80 rounded-full bg-blue-600/10 blur-[130px]" />
      <div className="pointer-events-none absolute top-10 right-10 size-72 rounded-full bg-amber-500/10 blur-[120px]" />

      <div className="container-px mx-auto max-w-7xl py-12 sm:py-16 relative z-10">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Column 1: Brand Info & Socials */}
          <div className="flex flex-col items-start">
            <Logo tone="light" name={company.name} />
            <p className="mt-4 text-xs leading-relaxed text-blue-200/70">
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
                  className={`grid size-8 sm:size-8.5 place-items-center rounded-full border border-blue-900/70 bg-[#070F1E] p-1.5 transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 cursor-pointer shadow-md ${s.hoverClass}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.iconSrc}
                    alt={s.label}
                    className="size-full object-contain"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white tracking-wide uppercase text-[12px]">Quick Links</h4>
            <ul className="mt-3.5 space-y-2.5 text-xs text-blue-200/70">
              <li>
                <a
                  className="hover:text-amber-400 transition-colors font-medium inline-flex items-center gap-1 group"
                  href="https://www.sosyncaitech.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Main Site
                  <span className="text-[10px] text-amber-400/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                </a>
              </li>
              <li>
                <Link className="hover:text-amber-400 transition-colors font-medium" href="/portfolio">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link className="hover:text-amber-400 transition-colors font-medium" href="/testimonials">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link className="hover:text-amber-400 transition-colors font-medium" href="/why-sosync">
                  Why SOSync
                </Link>
              </li>
              <li>
                <Link className="hover:text-amber-400 transition-colors font-medium" href="/our-story">
                  Our Story
                </Link>
              </li>
              <li>
                <Link className="hover:text-amber-400 transition-colors font-medium" href="/contact">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Office */}
          <div>
            <h4 className="text-sm font-bold text-white tracking-wide uppercase text-[12px]">Contact</h4>
            <ul className="mt-3.5 space-y-3 text-xs text-blue-200/70">
              <li className="flex items-start gap-2.5">
                <Icon name="phone" className="mt-0.5 size-3.5 shrink-0 text-amber-400" />
                <div className="flex flex-col gap-1">
                  <a
                    href={`tel:${primaryPhone.replace(/\s+/g, "")}`}
                    className="hover:text-amber-400 transition-colors whitespace-nowrap"
                  >
                    {primaryPhone}
                  </a>
                  <a
                    href={`tel:${secondaryPhone.replace(/\s+/g, "")}`}
                    className="hover:text-amber-400 transition-colors whitespace-nowrap"
                  >
                    {secondaryPhone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="mail" className="mt-0.5 size-3.5 shrink-0 text-amber-400" />
                <a
                  href={`mailto:${supportEmail}`}
                  className="hover:text-amber-400 transition-colors break-all"
                >
                  {supportEmail}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="pin" className="mt-0.5 size-3.5 shrink-0 text-amber-400" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Rushub+Biiz+Bay,+Sprint+Workspace,+Above+Motherhood+Hospital,+Thite+Nagar,+Kharadi,+Pune,+Maharashtra+411014"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors leading-snug"
                >
                  Unit No. 416A, 4th Floor, Rushub Biiz Bay, Sprint Workspace, Above Motherhood Hospital, Thite Nagar, Kharadi, Pune, Maharashtra – 411014
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Interactive Location Map */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide uppercase text-[12px]">Newsletter</h4>
              <p className="mt-1 text-xs text-blue-200/70 leading-relaxed">
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
                    className="w-full rounded-full border border-blue-900/60 bg-[#070F1E] px-4 py-2 text-xs sm:text-sm text-white outline-none transition placeholder:text-blue-300/40 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 px-4 py-2 text-xs sm:text-sm font-extrabold text-black shadow-lg shadow-amber-500/20 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                  >
                    {subscribed ? "Subscribed! ✓" : "Subscribe"}
                    {!subscribed && <Icon name="arrow-right" className="size-3.5" />}
                  </button>
                </form>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-white/90 mb-1.5 uppercase tracking-wider text-[11px] text-blue-200/80">
                Location
              </h4>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Rushub+Biiz+Bay,+Sprint+Workspace,+Above+Motherhood+Hospital,+Thite+Nagar,+Kharadi,+Pune,+Maharashtra+411014"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block w-full h-32 sm:h-36 overflow-hidden rounded-2xl border border-blue-900/60 hover:border-amber-500/50 bg-[#070F1E] shadow-[0_10px_30px_rgba(0,0,0,0.6)] ring-1 ring-amber-500/20 transition-all duration-300 hover:scale-[1.01] cursor-pointer"
              >
                {/* Location Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/footer_direction.webp"
                  alt="SOSync AI Tech Office Location"
                  className="size-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark Gradient Vignette for Readability (Website Theme) */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/95 via-[#030712]/35 to-black/35 pointer-events-none" />

                {/* Top Location Pill Badge (Our Story Capsule Style) */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0B152B]/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-amber-400 border border-amber-500/30 shadow-md">
                    <span className="size-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <span>Kharadi, Pune HQ</span>
                  </span>
                </div>

                {/* Bottom "Get Directions" Banner Button (SOSync Brand Gradient) */}
                <div className="absolute bottom-2.5 inset-x-2.5 z-10">
                  <div className="flex items-center justify-between w-full px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-black font-extrabold text-xs shadow-lg shadow-amber-500/20 group-hover:brightness-110 transition-all">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={13} className="stroke-[2.5]" />
                      <span>Get Directions</span>
                    </div>
                    <ExternalLink size={13} className="stroke-[2.5]" />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="mt-12 sm:mt-14 flex flex-col items-center justify-between gap-4 border-t border-blue-900/40 pt-6 text-xs text-blue-200/60 sm:flex-row text-center sm:text-left">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>

          

          <div className="flex items-center gap-4">
            <Link href="/contact" className="hover:text-amber-400 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-blue-900">|</span>
            <Link href="/admin" className="hover:text-amber-400 transition-colors font-medium">
              Admin Access →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
