import type { Metadata } from "next";
import { TestimonialsView } from "@/components/sections/TestimonialsView";

export const metadata: Metadata = {
  title: "Testimonials | SOSync Ai Tech IT Solution",
  description:
    "What clients across 15+ countries say about working with SOSync Ai Tech IT Solution — rated 4.9/5 for quality, speed and support.",
  openGraph: {
    title: "Testimonials | SOSync Ai Tech IT Solution",
    description: "Client reviews for SOSync Ai Tech IT Solution — rated 4.9/5 across 150+ engagements.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function TestimonialsPage() {
  return <TestimonialsView />;
}
