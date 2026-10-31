import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { isAuthenticatedAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const isAdmin = await isAuthenticatedAdmin(req);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const contentType = req.headers.get("content-type") || "";

    let fileToUpload = "";
    let folder = "sosync/portfolio";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const customFolder = formData.get("folder") as string | null;

      if (customFolder) folder = customFolder;

      if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const mime = file.type || "image/jpeg";
      fileToUpload = `data:${mime};base64,${buffer.toString("base64")}`;
    } else {
      const body = await req.json();
      fileToUpload = body.image || body.data;
      if (body.folder) folder = body.folder;
    }

    if (!fileToUpload) {
      return NextResponse.json({ error: "No image content provided" }, { status: 400 });
    }

    const { url, public_id } = await uploadToCloudinary(fileToUpload, folder);

    return NextResponse.json({
      success: true,
      url,
      public_id,
    });
  } catch (error: any) {
    console.error("Image upload API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload image to Cloudinary" },
      { status: 500 }
    );
  }
}
