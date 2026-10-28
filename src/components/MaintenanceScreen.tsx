"use client";

import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { useSiteData } from "@/context/SiteDataContext";

export function MaintenanceScreen() {
  const { settings, data } = useSiteData();
  const { company } = data;
  const phone = company.phones[0] || "+91 91724 03714";
  const cleanPhone = phone.replace(/\s+/g, "");

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-navy text-white px-4 py-12">
      {/* Background ambient lighting & grid */}
      <div className="hero-grid-line absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 size-[36rem] rounded-full bg-brand/20 blur-3xl animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-10 size-80 rounded-full bg-cyan/15 blur-3xl animate-pulse-glow"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-xl w-full text-center">
        {/* Brand Logo */}
        <div className="flex justify-center mb-6">
          <Logo tone="light" name={company.name} />
        </div>

        {/* Maintenance Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 backdrop-blur-md mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          Scheduled Maintenance & Upgrade
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          We&apos;ll be back <span className="text-gradient-brand">shortly</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
          {settings.maintenanceMessage ||
            "SOSync AI Tech is currently undergoing scheduled platform upgrades and database optimizations to serve you better."}
        </p>

        {/* Urgent Contact Box */}
        <div className="card-soft bg-navy-soft/80 border-white/10 p-6 mt-8 rounded-3xl backdrop-blur-md text-left">
          <h2 className="text-sm font-bold uppercase tracking-wider text-sky mb-3 flex items-center gap-2">
            <Icon name="phone" className="size-4" /> Need Immediate Assistance?
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            Our engineering & support desk is operating 24/7. Reach out directly for project inquiries or support emergencies:
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:${cleanPhone}`}
              className="btn btn-gradient btn-sm flex-1 sm:flex-initial"
            >
              <Icon name="phone" className="size-4" />
              Call {phone}
            </a>
            <a
              href={`mailto:${company.email || "support@sosyncaitech.in"}`}
              className="btn btn-ghost-light btn-sm flex-1 sm:flex-initial"
            >
              <Icon name="mail" className="size-4" />
              Email Us
            </a>
          </div>
        </div>

        {/* Admin Gateway */}
        <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>© {new Date().getFullYear()} {company.shortName || "SOSync AI Tech"}</span>
          <Link
            href="/admin/login"
            className="text-slate-400 hover:text-brand transition-colors underline"
          >
            Admin Panel Login →
          </Link>
        </div>
      </div>
    </div>
  );
}
