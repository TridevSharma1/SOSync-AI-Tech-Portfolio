import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Story360Model } from "@/models/Story360";
import { isAuthenticatedAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await isAuthenticatedAdmin(req);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    // Update in-memory fallback
    if (globalThis.__story360Fallback) {
      globalThis.__story360Fallback = globalThis.__story360Fallback.map((s) =>
        s._id === id ? { ...s, ...body } : s
      );
    }

    try {
      await connectToDatabase();
      const updated = await Story360Model.findByIdAndUpdate(
        id,
        { $set: body },
        { new: true, runValidators: true }
      );

      if (!updated && (!globalThis.__story360Fallback || !globalThis.__story360Fallback.find((s) => s._id === id))) {
        return NextResponse.json({ error: "Slide not found" }, { status: 404 });
      }

      return NextResponse.json({ success: true, slide: updated || body });
    } catch (dbErr) {
      console.warn("PUT /api/story-360/[id] DB offline, updated in-memory fallback:", dbErr);
      return NextResponse.json({ success: true, slide: body, isFallback: true });
    }
  } catch (error) {
    console.error("PUT /api/story-360/[id] error:", error);
    return NextResponse.json({ error: "Failed to update slide" }, { status: 500 });
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

    // Delete from in-memory fallback
    if (globalThis.__story360Fallback) {
      globalThis.__story360Fallback = globalThis.__story360Fallback.filter((s) => s._id !== id);
    }

    try {
      await connectToDatabase();
      await Story360Model.findByIdAndDelete(id);
      return NextResponse.json({ success: true, message: "Slide deleted successfully" });
    } catch (dbErr) {
      console.warn("DELETE /api/story-360/[id] DB offline, removed from in-memory fallback:", dbErr);
      return NextResponse.json({ success: true, message: "Slide deleted from fallback", isFallback: true });
    }
  } catch (error) {
    console.error("DELETE /api/story-360/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete slide" }, { status: 500 });
  }
}
