import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import { ProjectModel } from "@/models/Project";
import { isAuthenticatedAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PUT(req: NextRequest) {
  try {
    const isAdmin = await isAuthenticatedAdmin(req);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { orders } = body;

    if (!Array.isArray(orders) || orders.length === 0) {
      return NextResponse.json(
        { error: "Orders array is required" },
        { status: 400 }
      );
    }

    try {
      await connectToDatabase();
      const ops = orders
        .filter((o) => o && o.id)
        .map((o) => {
          const isValidObjectId =
            mongoose.Types.ObjectId.isValid(o.id) && o.id.length === 24;
          return {
            updateOne: {
              filter: isValidObjectId
                ? { _id: o.id }
                : { $or: [{ id: o.id }, { projectId: o.id }] },
              update: { $set: { order: Number(o.order) || 0, updatedAt: new Date() } },
            },
          };
        });

      if (ops.length > 0) {
        await ProjectModel.bulkWrite(ops);
      }
    } catch (dbErr) {
      console.warn("MongoDB bulkWrite error, falling back to in-memory:", dbErr);
    }

    // Sync in-memory store
    if (globalThis.__projectsFallback) {
      orders.forEach((o) => {
        const item = globalThis.__projectsFallback?.find(
          (p) =>
            (p._id && p._id.toString() === o.id) ||
            (p.id && p.id.toString() === o.id) ||
            (p.projectId && p.projectId.toString() === o.id)
        );
        if (item) {
          item.order = Number(o.order) || 0;
          item.updatedAt = new Date();
        }
      });
      globalThis.__projectsFallback.sort((a, b) => (a.order || 0) - (b.order || 0));
    }

    return NextResponse.json({ success: true, count: orders.length });
  } catch (error) {
    console.error("PUT /api/projects/reorder error:", error);
    return NextResponse.json({ error: "Failed to reorder projects" }, { status: 500 });
  }
}

