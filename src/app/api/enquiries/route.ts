import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { EnquiryModel } from "@/models/Enquiry";
import { sendEnquiryEmail } from "@/lib/mail";
import { isAuthenticatedAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const isAdmin = await isAuthenticatedAdmin(req);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const enquiries = await EnquiryModel.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, enquiries });
  } catch (error) {
    console.error("GET /api/enquiries error:", error);
    return NextResponse.json({ error: "Failed to fetch enquiries" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const { name, email, phone, company, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const newEnquiry = await EnquiryModel.create({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || "",
      company: company?.trim() || "",
      subject: subject?.trim() || "General Inquiry",
      message: message.trim(),
      read: false,
    });

    // Send email alert in background (non-blocking)
    sendEnquiryEmail({
      name: newEnquiry.name,
      email: newEnquiry.email,
      phone: newEnquiry.phone,
      company: newEnquiry.company,
      subject: newEnquiry.subject,
      message: newEnquiry.message,
    }).catch((e) => console.error("Email notification background error:", e));

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry submitted successfully. Our team will contact you shortly.",
        enquiry: newEnquiry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/enquiries error:", error);
    return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 });
  }
}
