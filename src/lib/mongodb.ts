import mongoose from "mongoose";
import { defaultSiteData } from "@/data";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  console.warn("⚠️ Warning: MONGODB_URL is not defined in environment variables.");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  seeded: boolean;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null, seeded: false };
}

export async function connectToDatabase() {
  if (!MONGODB_URL) {
    throw new Error("MONGODB_URL environment variable is missing.");
  }

  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
    };

    cached!.promise = mongoose.connect(MONGODB_URL, opts).then(async (m) => {
      // Auto-clean & auto-seed initial data if collections are empty
      if (!cached!.seeded) {
        await seedDatabaseIfNeeded();
        cached!.seeded = true;
      }
      return m;
    });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    throw e;
  }

  return cached!.conn;
}

async function seedDatabaseIfNeeded() {
  try {
    // Import models via relative path
    const { Story360Model, SiteSettingsModel } =
      await import("../models");

    // 1. Remove dummy placeholder 360 slides
    await Story360Model.deleteMany({ src: { $regex: /^\/about-story-slide-/ } });

    // 2. Seed Settings if missing
    const settingsCount = await SiteSettingsModel.countDocuments();
    if (settingsCount === 0) {
      await SiteSettingsModel.create({
        maintenanceMode: false,
        maintenanceMessage: "SOSync AI Tech is currently performing scheduled system upgrades. We will be back online shortly.",
        social: defaultSiteData.social,
        company: defaultSiteData.company,
      });
      console.log(`✅ Seeded default SiteSettings to MongoDB`);
    }
  } catch (error) {
    console.error("Database seed check error:", error);
  }
}
