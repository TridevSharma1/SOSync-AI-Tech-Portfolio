import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { SiteSettingsModel } from "@/models/SiteSettings";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { cdnCacheHeaders, noStoreHeaders } from "@/lib/cdn";

export const dynamic = "force-dynamic";

// Shared in-memory fallback cache so settings & maintenance mode always persist even if MongoDB is not connected
declare global {
  // eslint-disable-next-line no-var
  var __siteSettingsFallback: any | undefined;
}

const defaultSettingsData = {
  maintenanceMode: false,
  maintenanceMessage:
    "SOSync AI Tech is currently undergoing scheduled platform upgrades. We will be back online shortly.",
  social: {
    linkedin: "https://www.linkedin.com/company/sosyncaitech/posts/?feedView=all",
    twitter: "https://twitter.com",
    instagram: "https://www.instagram.com/sosyncaitech_multimediaa?obrf=MWtxODgwdGo2YWpzZg==",
    facebook: "https://facebook.com",
    github: "https://github.com",
    youtube: "https://www.youtube.com/@SOSyncAITech",
  },
  company: {
    name: "SOSync Ai Tech IT Solution",
    shortName: "SOSync Ai Tech",
    tagline:
      "Transforming businesses through modern AI solutions, software development & digital innovation.",
    email: "support@sosyncaitech.in",
    phones: ["+91 91724 03714", "+91 70043 30655"],
    addressLines: [
      "B1, D-Wing, Shiv Complex, Behind Janta Sahakari Bank,",
      "Sinhgad Road, Vadgaon Khurd, Pune 411041, Maharashtra, India",
    ],
    copyright: "SOSync Ai Tech IT Solution. All rights reserved.",
  },
};

if (!globalThis.__siteSettingsFallback) {
  globalThis.__siteSettingsFallback = { ...defaultSettingsData };
}

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    let settings = await SiteSettingsModel.findOne();

    if (!settings) {
      settings = await SiteSettingsModel.create(globalThis.__siteSettingsFallback || defaultSettingsData);
    }

    if (settings) {
      let needsSave = false;
      // Eradicate old phone from existing database records
      if (settings.company?.phones && Array.isArray(settings.company.phones)) {
        const updatedPhones = settings.company.phones.map((p: string) =>
          p.includes("80103") ? "+91 70043 30655" : p
        );
        if (JSON.stringify(updatedPhones) !== JSON.stringify(settings.company.phones)) {
          settings.company.phones = updatedPhones;
          needsSave = true;
        }
      }
      // Migrate missing/placeholder social links
      if (settings.social) {
        if (!settings.social.youtube || settings.social.youtube.includes("@sosync") || settings.social.youtube === "") {
          settings.social.youtube = "https://www.youtube.com/@SOSyncAITech";
          needsSave = true;
        }
        if (
          settings.social.linkedin === "https://linkedin.com" ||
          (settings.social.linkedin?.includes("company/sosync") && !settings.social.linkedin.includes("sosyncaitech"))
        ) {
          settings.social.linkedin = "https://www.linkedin.com/company/sosyncaitech/posts/?feedView=all";
          needsSave = true;
        }
        if (
          settings.social.instagram === "https://instagram.com" ||
          settings.social.instagram?.includes("sosync.in")
        ) {
          settings.social.instagram = "https://www.instagram.com/sosyncaitech_multimediaa?obrf=MWtxODgwdGo2YWpzZg==";
          needsSave = true;
        }
      }
      if (needsSave) {
        try {
          await settings.save();
        } catch (saveErr) {
          console.warn("Could not auto-save sanitized settings:", saveErr);
        }
      }

      globalThis.__siteSettingsFallback = settings.toObject ? settings.toObject() : settings;
    }

    const isAdmin = await isAuthenticatedAdmin(req);
    const headers = isAdmin
      ? noStoreHeaders()
      : cdnCacheHeaders({ sMaxAge: 60, staleWhileRevalidate: 300 });

    return NextResponse.json({ success: true, settings }, { headers });
  } catch (error) {
    console.warn("GET /api/settings - using in-memory fallback:", error);
    return NextResponse.json({
      success: true,
      settings: globalThis.__siteSettingsFallback || defaultSettingsData,
      isFallback: true,
    });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const isAdmin = await isAuthenticatedAdmin(req);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Always update in-memory fallback immediately
    if (!globalThis.__siteSettingsFallback) {
      globalThis.__siteSettingsFallback = { ...defaultSettingsData };
    }

    if (body.maintenanceMode !== undefined) {
      globalThis.__siteSettingsFallback.maintenanceMode = Boolean(body.maintenanceMode);
    }
    if (body.maintenanceMessage !== undefined) {
      globalThis.__siteSettingsFallback.maintenanceMessage = String(body.maintenanceMessage).trim();
    }
    if (body.social) {
      globalThis.__siteSettingsFallback.social = {
        ...globalThis.__siteSettingsFallback.social,
        ...body.social,
      };
    }
    if (body.company) {
      globalThis.__siteSettingsFallback.company = {
        ...globalThis.__siteSettingsFallback.company,
        ...body.company,
      };
    }

    // Try persisting to MongoDB if database is connected
    try {
      await connectToDatabase();
      let settings = await SiteSettingsModel.findOne();

      if (!settings) {
        settings = new SiteSettingsModel(globalThis.__siteSettingsFallback);
      } else {
        if (body.maintenanceMode !== undefined) settings.maintenanceMode = body.maintenanceMode;
        if (body.maintenanceMessage !== undefined) settings.maintenanceMessage = body.maintenanceMessage;
        if (body.social) settings.social = { ...settings.social, ...body.social };
        if (body.company) settings.company = { ...settings.company, ...body.company };
      }

      await settings.save();
      globalThis.__siteSettingsFallback = settings.toObject ? settings.toObject() : settings;
      return NextResponse.json({ success: true, settings });
    } catch (dbError) {
      console.warn("PUT /api/settings - saved to in-memory fallback (DB offline):", dbError);
      return NextResponse.json({
        success: true,
        settings: globalThis.__siteSettingsFallback,
        isFallback: true,
      });
    }
  } catch (error) {
    console.error("PUT /api/settings fatal error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
