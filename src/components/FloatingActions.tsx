"use client";

import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";

export function InstagramIcon({ size = 26, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer rounded square */}
      <rect
        x="5.5"
        y="5.5"
        width="21"
        height="21"
        rx="6"
        stroke="white"
        strokeWidth="2.3"
      />
      {/* Center camera lens circle */}
      <circle
        cx="16"
        cy="16"
        r="5.2"
        stroke="white"
        strokeWidth="2.3"
      />
      {/* Flash dot */}
      <circle
        cx="21.8"
        cy="10.2"
        r="1.3"
        fill="white"
      />
    </svg>
  );
}

export function WhatsAppIcon({ size = 26, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Speech bubble outline */}
      <path
        d="M16 4C9.37 4 4 9.37 4 16c0 2.37.69 4.59 1.88 6.46L4.5 27.5l5.24-1.37A11.93 11.93 0 0016 28c6.63 0 12-5.37 12-12S22.63 4 16 4z"
        stroke="white"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Phone handset */}
      <path
        d="M12.2 10.6c-.3-.6-.6-.6-.9-.6h-.8c-.3 0-.7.1-1 .5-.4.4-1.3 1.3-1.3 3.2s1.4 3.7 1.6 4c.2.3 2.7 4.1 6.5 5.7 3.2 1.3 3.8 1 4.5 1 .7-.1 2.2-.9 2.5-1.7.3-.8.3-1.6.2-1.7-.1-.2-.4-.3-.7-.5s-2.2-1.1-2.5-1.2c-.4-.1-.6-.2-.8.2-.3.4-1 1.2-1.2 1.5-.2.2-.5.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.3-2.1-2.7-.2-.4 0-.6.2-.8.2-.2.4-.4.6-.7.2-.2.3-.4.4-.7.1-.2 0-.5-.1-.7-.1-.2-.9-2.1-1.2-2.8z"
        fill="white"
      />
    </svg>
  );
}

/**
 * Floating Action Buttons - Bottom Right:
 * 1. Instagram (Signature gradient, full-circle fill, white outline glyph, warm glow)
 * 2. WhatsApp (Vibrant green, full-circle fill, white outline speech bubble, emerald glow)
 * 3. Phone Call (Vibrant amber/gold, full-circle fill, white phone icon, golden glow)
 */
export function FloatingActions() {
  const pathname = usePathname();
  const { data } = useSiteData();

  if (pathname.startsWith("/admin")) return null;

  const rawPhone = data.company.phones[0] || "+91 91724 03714";
  const phoneClean = rawPhone.replace(/[^0-9+]/g, "");
  const whatsappNumber = rawPhone.replace(/[^0-9]/g, "");
  const instagramUrl = data.social?.instagram || "https://www.instagram.com/sosync.in";

  return (
    <aside
      aria-label="Quick contact shortcuts"
      className="fixed bottom-6 right-5 sm:right-6 z-40 flex flex-col items-center gap-3.5 print:hidden animate-in fade-in slide-in-from-bottom-6 duration-500"
    >
      {/* 1. Instagram Button (Top) */}
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow SOSync on Instagram"
        title="Instagram SOSync"
        className="group relative flex size-13 sm:size-14 items-center justify-center rounded-full bg-[linear-gradient(45deg,#f77737_0%,#fd1d1d_35%,#e1306c_65%,#c13584_100%)] text-white shadow-[0_4px_22px_rgba(225,48,108,0.55),0_0_8px_rgba(247,119,55,0.3)] ring-1 ring-white/20 hover:scale-110 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(225,48,108,0.75),0_0_12px_rgba(247,119,55,0.45)] active:scale-95 transition-all duration-300 ease-out cursor-pointer"
      >
        <InstagramIcon size={25} className="shrink-0 transition-transform duration-300 group-hover:scale-105" />
      </a>

      {/* 2. WhatsApp Button (Middle) */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=Hello%20SOSync%20AI%20Tech%2C%20I%20would%20like%20to%20connect!`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="WhatsApp SOSync"
        className="group relative flex size-13 sm:size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_22px_rgba(37,211,102,0.55),0_0_8px_rgba(37,211,102,0.3)] ring-1 ring-white/20 hover:bg-[#22c55e] hover:scale-110 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(37,211,102,0.75),0_0_12px_rgba(37,211,102,0.45)] active:scale-95 transition-all duration-300 ease-out cursor-pointer"
      >
        <WhatsAppIcon size={25} className="shrink-0 transition-transform duration-300 group-hover:scale-105" />
      </a>

      {/* 3. Phone Call Button (Bottom) */}
      <a
        href={`tel:${phoneClean}`}
        aria-label={`Call SOSync (${rawPhone})`}
        title={`Call SOSync: ${rawPhone}`}
        className="group relative flex size-13 sm:size-14 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-amber-400 text-white shadow-[0_4px_22px_rgba(245,158,11,0.5),0_0_8px_rgba(245,158,11,0.25)] ring-1 ring-white/20 hover:scale-110 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(245,158,11,0.7),0_0_12px_rgba(245,158,11,0.4)] active:scale-95 transition-all duration-300 ease-out cursor-pointer"
      >
        <span className="pointer-events-none absolute inset-0 rounded-full animate-ping bg-amber-400/30 opacity-75" />
        <Phone size={22} className="relative z-10 shrink-0 text-white transition-transform duration-300 group-hover:rotate-12" />
      </a>
    </aside>
  );
}
