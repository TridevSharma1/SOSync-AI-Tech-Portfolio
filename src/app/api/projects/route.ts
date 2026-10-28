import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ProjectModel } from "@/models/Project";
import { isAuthenticatedAdmin } from "@/lib/auth";

declare global {
  // eslint-disable-next-line no-var
  var __projectsFallback: any[] | undefined;
}

if (!globalThis.__projectsFallback) {
  globalThis.__projectsFallback = [];
}

export async function GET() {
  try {
    await connectToDatabase();
    const projects = await ProjectModel.find({}).sort({ order: 1, createdAt: -1 });
    if (projects && projects.length > 0) {
      globalThis.__projectsFallback = projects.map((p) => (p.toObject ? p.toObject() : p));
    }
    return NextResponse.json({ success: true, projects: globalThis.__projectsFallback || [] });
  } catch (error) {
    console.warn("GET /api/projects - using in-memory fallback:", error);
    return NextResponse.json({
      success: true,
      projects: globalThis.__projectsFallback || [],
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

    const body = await req.json();
    const { title, href, image, category, description, tags, showIn360, order } = body;

    if (!title || !image || !category) {
      return NextResponse.json(
        { error: "Title, image, and category are required" },
        { status: 400 }
      );
    }

    const projectPayload = {
      projectId: "proj_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now().toString(36),
      title: title.trim(),
      href: href?.trim() || "",
      image: image.trim(),
      category: category.trim(),
      description: description?.trim() || "",
      tags: Array.isArray(tags) ? tags : typeof tags === "string" ? tags.split(",").map((s: string) => s.trim()).filter(Boolean) : [],
      showIn360: showIn360 !== false,
      order: Number(order) || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    let newProject: any = null;

    try {
      await connectToDatabase();
      newProject = await ProjectModel.create(projectPayload);
      if (newProject && newProject.toObject) {
        newProject = newProject.toObject();
      }
    } catch (dbErr) {
      console.warn("MongoDB write error, saving to in-memory fallback:", dbErr);
      newProject = {
        _id: "mem_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
        id: "mem_" + Date.now(),
        ...projectPayload,
      };
    }

    if (!globalThis.__projectsFallback) {
      globalThis.__projectsFallback = [];
    }
    // Add to in-memory fallback store
    globalThis.__projectsFallback.unshift(newProject);

    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (error) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
