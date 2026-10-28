"use client";

import { useState } from "react";
import { Footer } from "@/components/Footer";
import { Icon } from "@/components/Icon";
import { Navbar } from "@/components/Navbar";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { StarRating } from "@/components/StarRating";
import { SuccessModal } from "@/components/SuccessModal";
import { TestimonialSlider } from "@/components/sections/TestimonialSlider";
import { useSiteData } from "@/context/SiteDataContext";

export function TestimonialsView() {
  const { data, createTestimonial } = useSiteData();
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    role: "",
    company: "",
    rating: 5,
    review: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.review.trim()) {
      setError("Please fill in your name and review.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const initials = form.name
        .split(" ")
        .map((p) => p[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase() || "CL";

      const ok = await createTestimonial({
        ...form,
        initials,
      });

      if (ok) {
        setModalOpen(false);
        setSubmitted(true);
        setForm({
          name: "",
          role: "",
          company: "",
          rating: 5,
          review: "",
        });
      } else {
        setError("Could not submit your review. Please try again.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar lightTop />
      <main className="flex-1 bg-background pt-16 sm:pt-20">
        <TestimonialSlider />

        <section className="section-pad bg-slate-50/70 border-t border-border/80">
          <div className="container-site">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading
                eyebrow="All Reviews"
                title="Every review, unfiltered"
                description="Collected from long-term clients across web, mobile, AI and enterprise engagements."
              />
              <button
                onClick={() => setModalOpen(true)}
                className="btn btn-gradient shrink-0 w-full sm:w-auto"
              >
                <Icon name="quote" className="size-4" />
                Leave a Client Review
              </button>
            </div>

            <div className="mt-10 sm:mt-14 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.testimonials.map((t, i) => (
                <Reveal key={t.id} delay={(i % 3) * 80} className="h-full">
                  <div className="card-soft group flex h-full flex-col rounded-3xl border border-border bg-white p-6 shadow-card hover:-translate-y-1 hover:shadow-elegant transition-all duration-300">
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                      <Icon name="quote" className="size-5" />
                    </span>
                    <StarRating rating={t.rating} className="mt-4" />
                    <p className="mt-4 flex-1 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                      &ldquo;{t.review}&rdquo;
                    </p>
                    <div className="mt-6 flex items-center gap-3 border-t border-border pt-4 sm:pt-5">
                      <span className="flex size-10 sm:size-11 items-center justify-center rounded-full bg-gradient-brand font-display text-xs sm:text-sm font-bold text-white shadow-soft shrink-0">
                        {t.initials}
                      </span>
                      <div className="min-w-0">
                        <p className="font-display text-sm font-bold text-foreground truncate">{t.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {t.role}, {t.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Review Submission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-3 sm:p-4 backdrop-blur-sm overflow-y-auto">
          <div className="card-soft relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-white p-5 sm:p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <Icon name="quote" className="size-4" />
                </span>
                <h3 className="font-display text-lg font-bold text-foreground">
                  Leave a Review
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-slate-100 hover:text-foreground transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {error && (
                <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-500 font-medium">
                  {error}
                </div>
              )}

              <div>
                <label className="label">Your Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Alex Morgan"
                  className="field"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="label">Role</label>
                  <input
                    type="text"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    placeholder="e.g. Chief Product Officer"
                    className="field"
                  />
                </div>
                <div>
                  <label className="label">Company</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="e.g. Apex Health"
                    className="field"
                  />
                </div>
              </div>

              <div>
                <label className="label">Rating (1 to 5 Stars)</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setForm({ ...form, rating: star })}
                      className={`text-2xl transition-transform hover:scale-110 ${
                        star <= form.rating ? "text-amber-400" : "text-muted-foreground/30"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="ml-2 text-xs text-muted-foreground">
                    ({form.rating} out of 5 stars)
                  </span>
                </div>
              </div>

              <div>
                <label className="label">Review / Feedback *</label>
                <textarea
                  required
                  rows={4}
                  value={form.review}
                  onChange={(e) => setForm({ ...form, review: e.target.value })}
                  placeholder="Share your experience working with SOSync AI Tech..."
                  className="field resize-none"
                />
              </div>

              <p className="text-xs text-muted-foreground">
                Note: Submitted reviews go to admin approval before appearing publicly on the portfolio.
              </p>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-gradient text-xs disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <SuccessModal
        open={submitted}
        title="Review Submitted!"
        message="Thank you for sharing your experience! Your testimonial has been received and will be reviewed by our team before going live on the site."
        onClose={() => setSubmitted(false)}
      />
    </>
  );
}
