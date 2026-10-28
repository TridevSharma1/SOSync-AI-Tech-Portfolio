import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import { ProjectModel } from "@/models/Project";
import { isAuthenticatedAdmin } from "@/lib/auth";

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
    const updatedProject = isValidObjectId
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

    await connectToDatabase();
    const { id } = await params;
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id) && id.length === 24;

    let deleted = null;
    if (isValidObjectId) {
      deleted = await ProjectModel.findByIdAndDelete(id);
    } else {
      deleted = await ProjectModel.findOneAndDelete({
        $or: [{ id }, { title: decodeURIComponent(id) }]
      });
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
      deleted: !!deleted,
    });
  } catch (error) {
    console.error("DELETE /api/projects/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
