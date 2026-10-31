"use client";

import { usePathname } from "next/navigation";
import { Phone, Instagram } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";

/**
 * Floating Action Buttons - Bottom Right:
 * 1. Instagram (Morpankh 5-stop radial gradient, floating-action bobbing, floating-ring pulse, Lucide Instagram icon)
 * 2. WhatsApp (Morpankh floating-action bobbing, floating-ring pulse, 100% opaque badge image)
 * 3. Phone Call (Untouched existing amber button with ping ring)
 */
export function FloatingActions() {
  const pathname = usePathname();
  const { data } = useSiteData();

  if (pathname.startsWith("/admin")) return null;

  const rawPhone = data.company.phones[0] || "+91 91724 03714";
  const phoneClean = rawPhone.replace(/[^0-9+]/g, "");
  const whatsappNumber = rawPhone.replace(/[^0-9]/g, "");
  const instagramUrl =
    data.social?.instagram ||
    "https://www.instagram.com/sosyncaitech_multimediaa?obrf=MWtxODgwdGo2YWpzZg==";

  return (
    <>
      <style>{`
        @keyframes floatAttention {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes pulseRing {
          0% { transform: scale(0.95); opacity: 0.55; }
          70% { transform: scale(1.35); opacity: 0; }
          100% { transform: scale(1.35); opacity: 0; }
        }
        .floating-action {
          animation: floatAttention 2.6s ease-in-out infinite;
        }
        .floating-action:hover {
          animation-play-state: paused;
        }
        .floating-action:hover .floating-ring {
          animation-play-state: paused;
        }
        .floating-ring {
          animation: pulseRing 2.2s ease-out infinite;
        }
      `}</style>

      <aside
        aria-label="Quick contact shortcuts"
        className="fixed bottom-6 right-5 sm:right-6 z-50 flex flex-col items-center gap-3.5 print:hidden animate-in fade-in slide-in-from-bottom-6 duration-500"
      >
        {/* 1. Instagram Button (Top) - Morpankh Style */}
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow SOSync on Instagram"
          title="Instagram SOSync"
          className="floating-action relative h-12 w-12 sm:h-13 sm:w-13 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-105 cursor-pointer"
          style={{
            background:
              "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
            color: "white",
          }}
        >
          <span
            className="floating-ring absolute inset-0 rounded-full"
            style={{ boxShadow: "0 0 0 0 rgba(214, 36, 159, 0.55)" }}
          />
          <Instagram className="h-6 w-6 text-white relative z-10" />
        </a>

        {/* 2. WhatsApp Button (Middle) - Morpankh Style + 100% Opaque */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=Hello%20SOSync%20AI%20Tech%2C%20I%20would%20like%20to%20connect!`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          title="WhatsApp SOSync"
          className="floating-action relative h-12 w-12 sm:h-13 sm:w-13 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-105 cursor-pointer bg-[#25D366] text-white"
        >
          <span
            className="floating-ring absolute inset-0 rounded-full"
            style={{ boxShadow: "0 0 0 0 rgba(37, 211, 102, 0.55)" }}
          />
          <img
            src="/wp_icon_opaque.png"
            alt="WhatsApp"
            className="w-full h-full object-contain relative z-10"
          />
        </a>

        {/* 3. Phone Call Button (Bottom) - Completely Untouched */}
        <a
          href={`tel:${phoneClean}`}
          aria-label={`Call SOSync (${rawPhone})`}
          title={`Call SOSync: ${rawPhone}`}
          className="group relative flex size-13 sm:size-14 items-center justify-center rounded-full bg-gradient-to-tr from-orange-600 to-[#FF6B00] text-white shadow-[0_4px_22px_rgba(255,107,0,0.55),0_0_8px_rgba(255,85,0,0.3)] ring-1 ring-white/20 hover:scale-110 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,107,0,0.75),0_0_12px_rgba(255,85,0,0.45)] active:scale-95 transition-all duration-300 ease-out cursor-pointer"
        >
          <span className="pointer-events-none absolute inset-0 rounded-full animate-ping bg-orange-500/35 opacity-75" />
          <Phone size={22} className="relative z-10 shrink-0 text-white transition-transform duration-300 group-hover:rotate-12" />
        </a>
      </aside>
    </>
  );
}
