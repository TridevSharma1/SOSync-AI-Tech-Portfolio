import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  projectId: string;
  title: string;
  href: string;
  image: string;
  category: string;
  description: string;
  tags: string[];
  showIn360: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    projectId: {
      type: String,
      default: () => "proj_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now().toString(36),
    },
    title: { type: String, required: true, trim: true },
    href: { type: String, default: "" },
    image: { type: String, required: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    tags: { type: [String], default: [] },
    showIn360: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const ProjectModel: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
