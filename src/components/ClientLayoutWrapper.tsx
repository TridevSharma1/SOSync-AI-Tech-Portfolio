"use client";

import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSiteData } from "@/context/SiteDataContext";
import { MaintenanceScreen } from "@/components/MaintenanceScreen";
import { FloatingActions } from "@/components/FloatingActions";

export function ClientLayoutWrapper({ children }: { children: ReactNode }) {
  const { settings, isAdmin, authReady, toggleMaintenanceMode } = useSiteData();
  const pathname = usePathname();
  const [toggling, setToggling] = useState(false);

  const isAdminLoginRoute = pathname === "/admin/login";
  const isAdminRoute = pathname.startsWith("/admin");
  const isPreview = typeof window !== "undefined" && window.location.search.includes("preview_maintenance=true");

  // Show maintenance screen to regular visitors on ALL pages when maintenanceMode is active:
  // - Authenticated admins (isAdmin === true) can view the site and admin portal.
  // - The /admin/login route remains available strictly for the administrator to sign in.
  // - ALL other pages (/, /portfolio, /our-story, /why-sosync, /admin, etc.) are blocked.
  if (
    isPreview ||
    ((authReady || typeof window !== "undefined") &&
      settings.maintenanceMode &&
      !isAdmin &&
      !isAdminLoginRoute)
  ) {
    return <MaintenanceScreen />;
  }

  return (
    <>
      {/* Admin Maintenance Banner */}
      {isAdmin && settings.maintenanceMode && !isAdminRoute && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2 text-center text-xs sm:text-sm font-bold sticky top-0 z-[100] shadow-md flex flex-wrap items-center justify-center gap-2">
          <span>⚠️ Maintenance Mode is currently ACTIVE — Public visitors are seeing the maintenance screen.</span>
          <button
            type="button"
            disabled={toggling}
            onClick={async () => {
              setToggling(true);
              try {
                await toggleMaintenanceMode();
              } finally {
                setToggling(false);
              }
            }}
            className="cursor-pointer bg-slate-950 text-white px-3 py-0.5 rounded-full text-xs font-bold hover:bg-slate-900 transition-colors shadow-xs disabled:opacity-50"
          >
            {toggling ? "Turning OFF..." : "Turn OFF Now"}
          </button>
          <Link
            href="/admin"
            className="underline ml-1 text-slate-950 hover:text-black text-xs font-semibold"
          >
            Manage in Admin
          </Link>
          <a
            href="/?preview_maintenance=true"
            target="_blank"
            rel="noreferrer"
            className="ml-1 bg-amber-700 text-white px-2.5 py-0.5 rounded-full text-xs hover:bg-amber-800 transition-colors"
          >
            Preview Screen ↗
          </a>
        </div>
      )}
      {children}
      <FloatingActions />
    </>
  );
}
