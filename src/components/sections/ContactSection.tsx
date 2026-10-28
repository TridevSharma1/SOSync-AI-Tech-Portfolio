"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SuccessModal } from "@/components/SuccessModal";
import { useSiteData } from "@/context/SiteDataContext";

const EMPTY = { name: "", email: "", phone: "", company: "", subject: "", message: "" };

/** Contact block: company details, map and enquiry form. */
export function ContactSection() {
  const { data, addEnquiry } = useSiteData();
  const { company } = data;
  const [form, setForm] = useState(EMPTY);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof typeof EMPTY) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const ok = await addEnquiry(form);
      if (ok) {
        setForm(EMPTY);
        setSent(true);
      } else {
        setError("Failed to send message. Please try again or call us directly.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-pad relative overflow-hidden">
      <div className="dot-grid absolute inset-0 opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="container-site relative">
        <SectionHeading
          eyebrow="Contact Us"
          title="Let's build something great together"
          description="Tell us about your project — a senior engineer replies within one business day."
        />

        <div className="mt-10 sm:mt-14 grid gap-8 lg:grid-cols-[1fr_1.15fr]">
          {/* Details + map */}
          <Reveal className="space-y-5">
            <div className="card-soft p-5 sm:p-7">
              <h3 className="font-display text-base sm:text-lg font-bold text-foreground">Reach Us</h3>
              <ul className="mt-4 sm:mt-5 space-y-4 sm:space-y-5 text-sm">
                <li className="flex gap-3 sm:gap-3.5">
                  <span className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-brand">
                    <Icon name="pin" className="size-4 sm:size-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">Office Address</p>
                    <p className="mt-1 leading-relaxed text-xs sm:text-sm text-muted-foreground">
                      {company.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </p>
                  </div>
                </li>
                <li className="flex gap-3 sm:gap-3.5">
                  <span className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-brand">
                    <Icon name="phone" className="size-4 sm:size-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">Call Us</p>
                    {company.phones.map((p) => (
                      <a
                        key={p}
                        href={`tel:${p.replace(/\s/g, "")}`}
                        className="mt-1 block text-xs sm:text-sm text-muted-foreground transition-colors hover:text-brand"
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                </li>
                <li className="flex gap-3 sm:gap-3.5">
                  <span className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-brand">
                    <Icon name="mail" className="size-4 sm:size-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <a
                      href={`mailto:${company.email}`}
                      className="mt-1 block text-xs sm:text-sm text-muted-foreground transition-colors hover:text-brand truncate"
                    >
                      {company.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3 sm:gap-3.5">
                  <span className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-brand">
                    <Icon name="clock" className="size-4 sm:size-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">Business Hours</p>
                    <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                      {company.workingDays} · {company.hours}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Map placeholder */}
            <div className="card-soft overflow-hidden">
              <iframe
                title={`Map to ${company.name}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(company.mapQuery)}&output=embed`}
                className="h-48 sm:h-56 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={120}>
            <form onSubmit={submit} className="card-soft p-5 sm:p-9">
              <h3 className="font-display text-base sm:text-lg font-bold text-foreground">Send an Enquiry</h3>
              <div className="mt-5 sm:mt-6 grid gap-4 sm:gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="ct-name" className="label">
                    Name *
                  </label>
                  <input id="ct-name" required value={form.name} onChange={set("name")} className="field" placeholder="Your full name" />
                </div>
                <div>
                  <label htmlFor="ct-email" className="label">
                    Email *
                  </label>
                  <input id="ct-email" type="email" required value={form.email} onChange={set("email")} className="field" placeholder="you@company.com" />
                </div>
                <div>
                  <label htmlFor="ct-phone" className="label">
                    Phone
                  </label>
                  <input id="ct-phone" type="tel" value={form.phone} onChange={set("phone")} className="field" placeholder="+91 …" />
                </div>
                <div>
                  <label htmlFor="ct-company" className="label">
                    Company
                  </label>
                  <input id="ct-company" value={form.company} onChange={set("company")} className="field" placeholder="Company name" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="ct-subject" className="label">
                    Subject *
                  </label>
                  <input id="ct-subject" required value={form.subject} onChange={set("subject")} className="field" placeholder="What is this about?" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="ct-message" className="label">
                    Message *
                  </label>
                  <textarea
                    id="ct-message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={set("message")}
                    className="field resize-none"
                    placeholder="Tell us about your goals, timeline and budget…"
                  />
                </div>
              </div>
              {error && (
                <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-500 font-medium">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-gradient mt-6 sm:mt-7 w-full sm:w-auto disabled:opacity-50 justify-center"
              >
                {submitting ? "Sending message..." : "Send Message"}
                <Icon name="send" className="size-4" />
              </button>
              <p className="mt-4 text-xs text-muted-foreground">
                Your enquiry will be recorded in our system and an alert sent directly to our team.
              </p>
            </form>
          </Reveal>
        </div>
      </div>

      <SuccessModal
        open={sent}
        title="Enquiry Sent!"
        message="Thank you for reaching out. Our team will get back to you within one business day."
        onClose={() => setSent(false)}
      />
    </section>
  );
}
