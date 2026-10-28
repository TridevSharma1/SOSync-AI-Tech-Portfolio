"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSiteData } from "@/context/SiteDataContext";
import { MaintenanceScreen } from "@/components/MaintenanceScreen";

export function ClientLayoutWrapper({ children }: { children: ReactNode }) {
  const { settings, isAdmin, authReady } = useSiteData();
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith("/admin");

  // Show maintenance screen to regular visitors if maintenanceMode is active
  if (authReady && settings.maintenanceMode && !isAdmin && !isAdminRoute) {
    return <MaintenanceScreen />;
  }

  return (
    <>
      {/* Admin Maintenance Banner */}
      {isAdmin && settings.maintenanceMode && !isAdminRoute && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2 text-center text-xs sm:text-sm font-bold sticky top-0 z-[100] shadow-md flex items-center justify-center gap-2">
          <span>⚠️ Maintenance Mode is currently ACTIVE — Public visitors are seeing the maintenance screen.</span>
          <Link
            href="/admin"
            className="underline ml-2 bg-slate-950 text-white px-2.5 py-0.5 rounded-full text-xs hover:bg-slate-900"
          >
            Manage in Admin
          </Link>
        </div>
      )}
      {children}
    </>
  );
}
