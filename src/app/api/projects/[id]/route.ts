import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import { ProjectModel } from "@/models/Project";
import { isAuthenticatedAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id) && id.length === 24;
    const project = isValidObjectId
      ? await ProjectModel.findById(id)
      : await ProjectModel.findOne({ $or: [{ id }, { title: decodeURIComponent(id) }] });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error("GET /api/projects/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await isAuthenticatedAdmin(req);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const { id } = await params;
    const body = await req.json();

    if (body.tags && typeof body.tags === "string") {
      body.tags = body.tags.split(",").map((s: string) => s.trim()).filter(Boolean);
    }

    const isValidObjectId = mongoose.Types.ObjectId.isValid(id) && id.length === 24;
    let updatedProject: any = null;

    try {
      await connectToDatabase();
      updatedProject = isValidObjectId
        ? await ProjectModel.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true, runValidators: true }
          )
        : await ProjectModel.findOneAndUpdate(
            { $or: [{ id }, { title: decodeURIComponent(id) }] },
            { $set: body },
            { new: true, runValidators: true }
          );
      if (updatedProject && updatedProject.toObject) {
        updatedProject = updatedProject.toObject();
      }
    } catch {
      // fallback
    }

    // Sync in-memory store
    if (globalThis.__projectsFallback) {
      const idx = globalThis.__projectsFallback.findIndex(
        (p) => (p._id && p._id.toString() === id) || (p.id && p.id.toString() === id)
      );
      if (idx !== -1) {
        globalThis.__projectsFallback[idx] = {
          ...globalThis.__projectsFallback[idx],
          ...body,
          updatedAt: new Date(),
        };
        if (!updatedProject) {
          updatedProject = globalThis.__projectsFallback[idx];
        }
      }
    }

    if (!updatedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, project: updatedProject });
  } catch (error) {
    console.error("PUT /api/projects/[id] error:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await isAuthenticatedAdmin(req);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id) && id.length === 24;

    let deleted = false;
    try {
      await connectToDatabase();
      if (isValidObjectId) {
        deleted = !!(await ProjectModel.findByIdAndDelete(id));
      } else {
        deleted = !!(await ProjectModel.findOneAndDelete({
          $or: [{ id }, { title: decodeURIComponent(id) }]
        }));
      }
    } catch {
      // fallback
    }

    // Sync in-memory store
    if (globalThis.__projectsFallback) {
      const beforeLen = globalThis.__projectsFallback.length;
      globalThis.__projectsFallback = globalThis.__projectsFallback.filter(
        (p) => (p._id && p._id.toString() !== id) && (p.id && p.id.toString() !== id)
      );
      if (globalThis.__projectsFallback.length < beforeLen) {
        deleted = true;
      }
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
      deleted,
    });
  } catch (error) {
    console.error("DELETE /api/projects/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
