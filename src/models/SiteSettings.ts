import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISiteSettings extends Document {
  maintenanceMode: boolean;
  maintenanceMessage: string;
  social: {
    linkedin: string;
    twitter: string;
    instagram: string;
    facebook: string;
    github: string;
  };
  company: {
    name: string;
    shortName: string;
    tagline: string;
    email: string;
    phones: string[];
    addressLines: string[];
    copyright: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    maintenanceMode: { type: Boolean, default: false },
    maintenanceMessage: {
      type: String,
      default:
        "We are currently performing scheduled maintenance and updates. Our team will be back online shortly.",
    },
    social: {
      linkedin: { type: String, default: "https://linkedin.com" },
      twitter: { type: String, default: "https://twitter.com" },
      instagram: { type: String, default: "https://instagram.com" },
      facebook: { type: String, default: "https://facebook.com" },
      github: { type: String, default: "https://github.com" },
    },
    company: {
      name: { type: String, default: "SOSync Ai Tech IT Solution" },
      shortName: { type: String, default: "SOSync Ai Tech" },
      tagline: {
        type: String,
        default:
          "Transforming businesses through modern AI solutions, software development & digital innovation.",
      },
      email: { type: String, default: "support@sosyncaitech.in" },
      phones: { type: [String], default: ["+91 91724 03714", "+91 80103 40822"] },
      addressLines: {
        type: [String],
        default: [
          "Office No. 402, 4th Floor, City Vista, Tower A",
          "Fountain Road, Ashoka Nagar, Kharadi",
          "Pune, Maharashtra 411014",
        ],
      },
      copyright: { type: String, default: "SOSync Ai Tech IT Solution. All rights reserved." },
    },
  },
  { timestamps: true }
);

export const SiteSettingsModel: Model<ISiteSettings> =
  mongoose.models.SiteSettings || mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);
