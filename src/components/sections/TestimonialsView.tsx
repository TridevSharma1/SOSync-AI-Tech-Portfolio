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
      <Navbar />
      <main className="flex-1 bg-[#030712] pt-16 sm:pt-20">
        <TestimonialSlider />

        <section className="section-pad bg-[#030712] border-t border-blue-900/40">
          <div className="container-site">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading
                eyebrow="All Reviews"
                title="Every review, unfiltered"
                description="Collected from long-term clients across web, mobile, AI and enterprise engagements."
              />
              <button
                onClick={() => setModalOpen(true)}
                className="btn btn-gradient shrink-0 w-full sm:w-auto text-black font-extrabold shadow-md cursor-pointer animate-border-glow-orange"
              >
                <Icon name="quote" className="size-4" />
                Leave a Client Review
              </button>
            </div>

            <div className="mt-10 sm:mt-14 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.testimonials.map((t, i) => (
                <Reveal key={t.id} delay={(i % 3) * 80} className="h-full">
                  <div className="rounded-3xl border border-blue-900/60 bg-[#0B152B]/90 p-6 shadow-2xl hover:-translate-y-1 hover:border-amber-500/60 transition-all duration-300 flex flex-col justify-between h-[340px] sm:h-[360px]">
                    {/* Fixed Card Top: Quote icon & Star Rating */}
                    <div className="shrink-0">
                      <div className="flex items-center justify-between">
                        <span className="flex size-11 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400">
                          <Icon name="quote" className="size-5" />
                        </span>
                        <StarRating rating={t.rating} />
                      </div>
                    </div>

                    {/* Scrollable Middle Content: Consistent Height across all cards with invisible scrollbar */}
                    <div className="flex-1 overflow-y-auto my-3.5 review-scrollbar">
                      <p className="text-sm leading-relaxed text-blue-100/90 font-medium">
                        &ldquo;{t.review}&rdquo;
                      </p>
                    </div>

                    {/* Fixed Card Bottom: Client Avatar, Name & Role */}
                    <div className="shrink-0 flex items-center gap-3 border-t border-blue-900/50 pt-4">
                      <span className="flex size-10 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 font-display text-sm font-bold text-black shadow-xs shrink-0">
                        {t.initials}
                      </span>
                      <div className="truncate">
                        <p className="font-display text-sm font-bold text-white truncate">{t.name}</p>
                        <p className="text-xs text-blue-200/70 truncate">
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 sm:p-4 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-blue-900/70 bg-[#0B152B] p-5 sm:p-6 shadow-2xl text-white">
            <div className="flex items-center justify-between border-b border-blue-900/50 pb-4">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400">
                  <Icon name="quote" className="size-4" />
                </span>
                <h3 className="font-display text-lg font-bold text-white">
                  Leave a Review
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="grid size-8 place-items-center rounded-lg text-blue-300 hover:bg-blue-900/60 hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {error && (
                <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-400 font-medium">
                  {error}
                </div>
              )}

              <div>
                <label className="label text-blue-200">Your Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Alex Morgan"
                  className="w-full rounded-xl border border-blue-900/60 bg-[#070F1E] px-4 py-2.5 text-sm text-white outline-none focus:border-amber-500 placeholder:text-blue-200/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="label text-blue-200">Role</label>
                  <input
                    type="text"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    placeholder="e.g. Chief Product Officer"
                    className="w-full rounded-xl border border-blue-900/60 bg-[#070F1E] px-4 py-2.5 text-sm text-white outline-none focus:border-amber-500 placeholder:text-blue-200/40"
                  />
                </div>
                <div>
                  <label className="label text-blue-200">Company</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="e.g. Apex Health"
                    className="w-full rounded-xl border border-blue-900/60 bg-[#070F1E] px-4 py-2.5 text-sm text-white outline-none focus:border-amber-500 placeholder:text-blue-200/40"
                  />
                </div>
              </div>

              <div>
                <label className="label text-blue-200">Rating (1 to 5 Stars)</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setForm({ ...form, rating: star })}
                      className={`text-2xl transition-transform hover:scale-110 cursor-pointer ${
                        star <= form.rating ? "text-amber-400" : "text-blue-950"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="ml-2 text-xs text-blue-200/70">
                    ({form.rating} out of 5 stars)
                  </span>
                </div>
              </div>

              <div>
                <label className="label text-blue-200">Review / Feedback *</label>
                <textarea
                  required
                  rows={4}
                  value={form.review}
                  onChange={(e) => setForm({ ...form, review: e.target.value })}
                  placeholder="Share your experience working with SOSync AI Tech..."
                  className="w-full rounded-xl border border-blue-900/60 bg-[#070F1E] p-3 text-sm text-white outline-none focus:border-amber-500 placeholder:text-blue-200/40 resize-none"
                />
              </div>

              <p className="text-xs text-blue-200/60">
                Note: Submitted reviews go to admin approval before appearing publicly on the portfolio.
              </p>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn btn-secondary-gray text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-gradient text-xs text-black font-extrabold disabled:opacity-50"
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
        onClose={() => setSubmitted(false)}
        title="Thank you for your review!"
        message="Your review has been submitted and will appear on our portfolio once verified by our team."
      />
    </>
  );
}
