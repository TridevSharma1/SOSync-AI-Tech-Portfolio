import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ProjectModel } from "@/models/Project";
import { isAuthenticatedAdmin } from "@/lib/auth";

const DUMMY_PROJECT_TITLES = new Set([
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
  "shopverse",
  "medicare+",
  "edulearn",
]);

export async function GET() {
  try {
    await connectToDatabase();
    const rawProjects = await ProjectModel.find({}).sort({ order: 1, createdAt: -1 });
    // Filter out any dummy projects so only real projects added by admin appear
    const projects = rawProjects.filter(
      (p) => !DUMMY_PROJECT_TITLES.has((p.title || "").trim().toLowerCase())
    );
    return NextResponse.json({ success: true, projects });
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const isAdmin = await isAuthenticatedAdmin(req);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();

    const { title, href, image, category, description, tags, showIn360, order } = body;

    if (!title || !image || !category) {
      return NextResponse.json(
        { error: "Title, image, and category are required" },
        { status: 400 }
      );
    }

    const newProject = await ProjectModel.create({
      title: title.trim(),
      href: href?.trim() || "",
      image: image.trim(),
      category: category.trim(),
      description: description?.trim() || "",
      tags: Array.isArray(tags) ? tags : typeof tags === "string" ? tags.split(",").map((s) => s.trim()).filter(Boolean) : [],
      showIn360: showIn360 !== false,
      order: Number(order) || 0,
    });

    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (error) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
