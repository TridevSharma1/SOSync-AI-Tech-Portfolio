import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Story360Model } from "@/models/Story360";
import { ProjectModel } from "@/models/Project";
import { isAuthenticatedAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const includeProjects = searchParams.get("includeProjects") !== "false";

    // 1. Fetch custom 360 slides
    const customSlides = await Story360Model.find({ active: true }).sort({ order: 1, createdAt: -1 });

    // 2. Fetch project images configured for 360 display
    let projectSlides: Array<{
      _id: string;
      src: string;
      alt: string;
      title: string;
      isProject: boolean;
      projectHref?: string;
    }> = [];

    if (includeProjects) {
      const projects = await ProjectModel.find({ showIn360: true }).sort({ order: 1, createdAt: -1 });
      projectSlides = projects.map((p) => ({
        _id: `proj-${p._id}`,
        src: p.image,
        alt: `${p.title} — ${p.category}`,
        title: p.title,
        isProject: true,
        projectHref: p.href,
      }));
    }

    // Combine slides
    const allSlides = [
      ...customSlides.map((s) => ({
        _id: s._id.toString(),
        src: s.src,
        alt: s.alt,
        title: s.title,
        isProject: false,
        active: s.active,
        order: s.order,
      })),
      ...projectSlides,
    ];

    // Also return raw custom slides for admin view
    const adminSlides = await Story360Model.find({}).sort({ order: 1, createdAt: -1 });

    return NextResponse.json({
      success: true,
      slides: allSlides,
      adminSlides,
    });
  } catch (error) {
    console.error("GET /api/story-360 error:", error);
    return NextResponse.json({ error: "Failed to fetch 360 slides" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const isAdmin = await isAuthenticatedAdmin(req);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const { src, alt, title, active, order } = await req.json();

    if (!src) {
      return NextResponse.json({ error: "Image source (src) is required" }, { status: 400 });
    }

    const slide = await Story360Model.create({
      src: src.trim(),
      alt: alt?.trim() || "SOSync 360 Showcase",
      title: title?.trim() || "",
      active: active !== false,
      order: Number(order) || 0,
    });

    return NextResponse.json({ success: true, slide }, { status: 201 });
  } catch (error) {
    console.error("POST /api/story-360 error:", error);
    return NextResponse.json({ error: "Failed to create 360 slide" }, { status: 500 });
  }
}
