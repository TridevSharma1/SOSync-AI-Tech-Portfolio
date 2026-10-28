import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStory360Slide extends Document {
  src: string;
  alt: string;
  title: string;
  active: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const Story360Schema = new Schema<IStory360Slide>(
  {
    src: { type: String, required: true },
    alt: { type: String, default: "SOSync 360 Digital Solution" },
    title: { type: String, default: "" },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Story360Model: Model<IStory360Slide> =
  mongoose.models.Story360 || mongoose.model<IStory360Slide>("Story360", Story360Schema);
