import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  company: string;
  role: string;
  initials: string;
  rating: number;
  review: string;
  status: "approved" | "pending" | "rejected";
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true, trim: true },
    company: { type: String, default: "", trim: true },
    role: { type: String, default: "", trim: true },
    initials: { type: String, default: "", trim: true },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    review: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["approved", "pending", "rejected"],
      default: "pending",
    },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Auto-generate initials if not provided
TestimonialSchema.pre("save", function () {
  if (!this.initials && this.name) {
    this.initials = this.name
      .split(" ")
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }
});

export const TestimonialModel: Model<ITestimonial> =
  mongoose.models.Testimonial || mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
