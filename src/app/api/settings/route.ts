import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { SiteSettingsModel } from "@/models/SiteSettings";
import { isAuthenticatedAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await connectToDatabase();
    let settings = await SiteSettingsModel.findOne();

    if (!settings) {
      settings = await SiteSettingsModel.create({
        maintenanceMode: false,
        maintenanceMessage: "SOSync AI Tech is currently performing scheduled system upgrades. We will be back online shortly.",
      });
    }

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error("GET /api/settings error:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const isAdmin = await isAuthenticatedAdmin(req);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();

    let settings = await SiteSettingsModel.findOne();

    if (!settings) {
      settings = new SiteSettingsModel(body);
      await settings.save();
    } else {
      if (body.maintenanceMode !== undefined) settings.maintenanceMode = body.maintenanceMode;
      if (body.maintenanceMessage !== undefined) settings.maintenanceMessage = body.maintenanceMessage;
      if (body.social) settings.social = { ...settings.social, ...body.social };
      if (body.company) settings.company = { ...settings.company, ...body.company };

      await settings.save();
    }

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error("PUT /api/settings error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
