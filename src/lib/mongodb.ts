import mongoose from "mongoose";
import { defaultSiteData } from "@/data";
import { PROJECTS as initialProjects } from "@/data/initialProjects";

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
      // Auto-seed initial data if collections are empty
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
    const { ProjectModel, TestimonialModel, Story360Model, SiteSettingsModel } =
      await import("../models");

    // 1. Seed Projects (seeds any initial projects missing from DB)
    const existingProjects = await ProjectModel.find({}, { title: 1 }).lean();
    const existingTitles = new Set(existingProjects.map((p: any) => (p.title || "").trim().toLowerCase()));
    const missingProjects = initialProjects.filter(
      (p) => !existingTitles.has(p.title.trim().toLowerCase())
    );

    if (missingProjects.length > 0) {
      const projectsToSeed = missingProjects.map((p, index) => ({
        title: p.title,
        href: p.href,
        image: p.image,
        category: p.category,
        description: p.description,
        tags: p.tags,
        showIn360: true,
        order: existingProjects.length + index,
      }));
      await ProjectModel.insertMany(projectsToSeed);
      console.log(`✅ Seeded ${projectsToSeed.length} new/missing projects to MongoDB`);
    }

    // 2. Seed Testimonials
    const testimonialCount = await TestimonialModel.countDocuments();
    if (testimonialCount === 0) {
      const testimonialsToSeed = defaultSiteData.testimonials.map((t, idx) => ({
        name: t.name,
        company: t.company,
        role: t.role,
        initials: t.initials,
        rating: t.rating,
        review: t.review,
        status: "approved",
        featured: idx < 3,
      }));
      await TestimonialModel.insertMany(testimonialsToSeed);
      console.log(`✅ Seeded ${testimonialsToSeed.length} testimonials to MongoDB`);
    }

    // 3. Seed 360 Slides
    const slideCount = await Story360Model.countDocuments();
    if (slideCount === 0) {
      const initialSlides = [
        { src: "/about-story-slide-2.jpg", alt: "SOSync AI Tech Executive Leadership", title: "Executive Leadership", order: 1, active: true },
        { src: "/about-story-slide-1.jpg", alt: "SOSync AI Tech Engineers & Team", title: "Engineering Excellence", order: 2, active: true },
        { src: "/about-story-slide-3.jpg", alt: "SOSync AI Tech Innovations", title: "AI & Cloud Innovation", order: 3, active: true },
      ];
      await Story360Model.insertMany(initialSlides);
      console.log(`✅ Seeded 360 Digital Solution slides to MongoDB`);
    }

    // 4. Seed Settings
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
