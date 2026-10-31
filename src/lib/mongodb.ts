import dns from "node:dns";
import mongoose from "mongoose";
import { defaultSiteData } from "@/data";

// Configure fallback public DNS resolvers to prevent querySrv ECONNREFUSED issues on restrictive networks
try {
  dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
} catch (e) {
  console.warn("Could not set custom DNS servers:", e);
}

const MONGODB_URL = process.env.MONGODB_URI || process.env.MONGODB_URL;

if (!MONGODB_URL) {
  console.warn("⚠️ Warning: MONGODB_URI is not defined in environment variables.");
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
    throw new Error("MONGODB_URI environment variable is missing.");
  }

  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    // Serverless-optimized Mongoose connection options for Vercel
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      maxPoolSize: 2, // Keep connection pool small to avoid Atlas limits during traffic spikes
      minPoolSize: 0,
      serverSelectionTimeoutMS: 20_000,
      connectTimeoutMS: 20_000,
      socketTimeoutMS: 45_000,
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
    const { Story360Model, SiteSettingsModel, ProjectModel } =
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

    // 3. Auto-populate descriptive copy for Sartaj Solar & SP Art Hub ERP if missing/blank
    if (ProjectModel) {
      await ProjectModel.updateMany(
        {
          title: { $regex: /sartaj solar/i },
          $or: [{ description: "" }, { description: { $exists: false } }, { description: null }],
        },
        {
          $set: {
            description:
              "Sustainable solar thermal water heating solutions for residential and commercial rooftops with automated quote calculators and inquiry workflows.",
          },
        }
      );

      await ProjectModel.updateMany(
        {
          title: { $regex: /sp art hub/i },
          $or: [{ description: "" }, { description: { $exists: false } }, { description: null }],
        },
        {
          $set: {
            description:
              "Role-based institute management ERP featuring student enrollment, batch scheduling, fee tracking, teacher portals, and administrative dashboards.",
          },
        }
      );
    }
  } catch (error) {
    console.error("Database seed check error:", error);
  }
}
