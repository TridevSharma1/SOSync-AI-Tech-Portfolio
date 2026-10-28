import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { TestimonialModel } from "@/models/Testimonial";
import { isAuthenticatedAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const isAdmin = await isAuthenticatedAdmin(req);
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all") === "true";

    let filter = {};
    if (!isAdmin || !all) {
      filter = { status: "approved" };
    }

    const testimonials = await TestimonialModel.find(filter).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, testimonials });
  } catch (error) {
    console.error("GET /api/testimonials error:", error);
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const isAdmin = await isAuthenticatedAdmin(req);
    const body = await req.json();

    const { name, company, role, rating, review, initials, status } = body;

    if (!name || !review) {
      return NextResponse.json({ error: "Name and review are required" }, { status: 400 });
    }

    const newTestimonial = await TestimonialModel.create({
      name: name.trim(),
      company: company?.trim() || "",
      role: role?.trim() || "",
      rating: Number(rating) || 5,
      review: review.trim(),
      initials: initials?.trim() || "",
      // Admin can explicitly set status (e.g. approved), normal visitor submissions default to pending
      status: isAdmin ? (status || "approved") : "pending",
      featured: false,
    });

    return NextResponse.json({ success: true, testimonial: newTestimonial }, { status: 201 });
  } catch (error) {
    console.error("POST /api/testimonials error:", error);
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}
