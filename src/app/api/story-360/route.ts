import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Story360Model } from "@/models/Story360";
import { ProjectModel } from "@/models/Project";
import { isAuthenticatedAdmin } from "@/lib/auth";

// Shared in-memory fallback cache so 360 slides always persist even if MongoDB is not connected
declare global {
  // eslint-disable-next-line no-var
  var __story360Fallback: Array<{
    _id: string;
    src: string;
    alt: string;
    title: string;
    active: boolean;
    order: number;
    createdAt?: Date;
  }> | undefined;
}

if (!globalThis.__story360Fallback) {
  globalThis.__story360Fallback = [];
}

const INITIAL_PROJECT_TITLES = new Set([
  "phoolrani sarees",
  "sp art hubs",
  "karyon college",
  "sonai residential world school",
  "sonai school erp software",
  "erudition infinite",
  "suraj naturo dry fruits",
  "finsight ai",
  "medicare+ mobile app",
  "salessync crm",
  "manufactpro erp",
  "nova brand identity system",
  "pixelcraft ui kit & graphics",
]);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const includeProjects = searchParams.get("includeProjects") !== "false";

    let customSlides: any[] = [];
    let adminSlides: any[] = [];
    let projectSlides: any[] = [];

    try {
      await connectToDatabase();

      // 1. Fetch custom 360 slides from DB
      const dbCustomSlides = await Story360Model.find({ active: true }).sort({ order: 1, createdAt: -1 }).lean();
      adminSlides = await Story360Model.find({}).sort({ order: 1, createdAt: -1 }).lean();

      // Filter out dummy placeholder assets (/about-story-slide-) if real custom slides exist
      const hasRealCustom = dbCustomSlides.some((s: any) => s.src && !s.src.startsWith("/about-story-slide-"));
      customSlides = hasRealCustom
        ? dbCustomSlides.filter((s: any) => s.src && !s.src.startsWith("/about-story-slide-"))
        : dbCustomSlides;

      // 2. Fetch projects configured for 360 display
      if (includeProjects) {
        const allProjects = await ProjectModel.find({ showIn360: true }).sort({ order: 1, createdAt: -1 }).lean();

        // Check if real admin-created projects exist
        const hasAdminProjects = allProjects.some((p: any) => {
          const t = (p.title || "").trim().toLowerCase();
          return !INITIAL_PROJECT_TITLES.has(t);
        });

        // Filter out initial dummy projects if real projects exist
        const filteredProjects = allProjects.filter((p: any) => {
          const t = (p.title || "").trim().toLowerCase();
          if (hasAdminProjects && INITIAL_PROJECT_TITLES.has(t)) {
            return false;
          }
          return Boolean(p.image);
        });

        projectSlides = filteredProjects.map((p: any) => ({
          _id: `proj-${p._id}`,
          src: p.image,
          alt: `${p.title} — ${p.category}`,
          title: p.title,
          isProject: true,
          projectHref: p.href,
        }));
      }
    } catch (dbErr) {
      console.warn("GET /api/story-360 MongoDB unavailable, using fallback:", dbErr);
      const fallbackActive = (globalThis.__story360Fallback || []).filter((s) => s.active !== false);
      customSlides = fallbackActive;
      adminSlides = globalThis.__story360Fallback || [];
    }

    // Combine slides: Custom 360 images added by admin + Project images
    const allSlides = [
      ...customSlides.map((s: any) => ({
        _id: s._id ? s._id.toString() : `slide-${Date.now()}`,
        src: s.src,
        alt: s.alt || s.title || "SOSync 360 Digital Solution",
        title: s.title || "",
        isProject: false,
        active: s.active !== false,
        order: s.order || 0,
      })),
      ...projectSlides,
    ];

    return NextResponse.json({
      success: true,
      slides: allSlides,
      adminSlides: adminSlides.length > 0 ? adminSlides : customSlides,
    });
  } catch (error) {
    console.error("GET /api/story-360 fatal error:", error);
    return NextResponse.json({
      success: true,
      slides: globalThis.__story360Fallback || [],
      adminSlides: globalThis.__story360Fallback || [],
      isFallback: true,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const isAdmin = await isAuthenticatedAdmin(req);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { src, alt, title, active, order } = await req.json();

    if (!src) {
      return NextResponse.json({ error: "Image source (src) is required" }, { status: 400 });
    }

    const newSlideData = {
      _id: `slide-${Date.now()}`,
      src: src.trim(),
      alt: alt?.trim() || title?.trim() || "SOSync 360 Showcase",
      title: title?.trim() || "",
      active: active !== false,
      order: order !== undefined ? Number(order) : 0,
      createdAt: new Date(),
    };

    // Update in-memory fallback
    if (!globalThis.__story360Fallback) globalThis.__story360Fallback = [];
    globalThis.__story360Fallback.unshift(newSlideData);

    try {
      await connectToDatabase();
      const count = await Story360Model.countDocuments();
      const slide = await Story360Model.create({
        src: src.trim(),
        alt: alt?.trim() || title?.trim() || "SOSync 360 Showcase",
        title: title?.trim() || "",
        active: active !== false,
        order: order !== undefined ? Number(order) : count + 1,
      });

      return NextResponse.json({ success: true, slide }, { status: 201 });
    } catch (dbErr) {
      console.warn("POST /api/story-360 DB offline, saved to in-memory fallback:", dbErr);
      return NextResponse.json({ success: true, slide: newSlideData, isFallback: true }, { status: 201 });
    }
  } catch (error) {
    console.error("POST /api/story-360 error:", error);
    return NextResponse.json({ error: "Failed to create 360 slide" }, { status: 500 });
  }
}
