import { useState, type FormEvent } from "react";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SuccessModal } from "@/components/SuccessModal";
import { useSiteData } from "@/context/SiteDataContext";

const EMPTY = { name: "", email: "", phone: "", company: "", subject: "", message: "" };

/** Contact block: company details, map and enquiry form (mock — React state only). */
export function ContactSection() {
  const { data, addEnquiry } = useSiteData();
  const { company } = data;
  const [form, setForm] = useState(EMPTY);
  const [sent, setSent] = useState(false);

  const set = (key: keyof typeof EMPTY) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    addEnquiry(form);
    setForm(EMPTY);
    setSent(true);
  };

  return (
    <section id="contact" className="section-pad relative overflow-hidden">
      <div className="dot-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="container-site relative">
        <SectionHeading
          eyebrow="Contact Us"
          title="Let's build something great together"
          description="Tell us about your project — a senior engineer replies within one business day."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.15fr]">
          {/* Details + map */}
          <Reveal className="space-y-5">
            <div className="card-soft p-7">
              <h3 className="font-display text-lg font-bold text-foreground">Reach Us</h3>
              <ul className="mt-5 space-y-5 text-sm">
                <li className="flex gap-3.5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-brand">
                    <Icon name="pin" className="size-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">Office Address</p>
                    <p className="mt-1 leading-relaxed text-muted-foreground">
                      {company.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </p>
                  </div>
                </li>
                <li className="flex gap-3.5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-brand">
                    <Icon name="phone" className="size-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">Call Us</p>
                    {company.phones.map((p) => (
                      <a
                        key={p}
                        href={`tel:${p.replace(/\s/g, "")}`}
                        className="mt-1 block text-muted-foreground transition-colors hover:text-brand"
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                </li>
                <li className="flex gap-3.5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-brand">
                    <Icon name="mail" className="size-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <a
                      href={`mailto:${company.email}`}
                      className="mt-1 block text-muted-foreground transition-colors hover:text-brand"
                    >
                      {company.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3.5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-brand">
                    <Icon name="clock" className="size-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">Business Hours</p>
                    <p className="mt-1 text-muted-foreground">
                      {company.workingDays} · {company.hours}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Map placeholder (keyless embed) */}
            <div className="card-soft overflow-hidden">
              <iframe
                title={`Map to ${company.name}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(company.mapQuery)}&output=embed`}
                className="h-56 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={120}>
            <form onSubmit={submit} className="card-soft p-7 sm:p-9">
              <h3 className="font-display text-lg font-bold text-foreground">Send an Enquiry</h3>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
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
                    rows={5}
                    value={form.message}
                    onChange={set("message")}
                    className="field resize-none"
                    placeholder="Tell us about your goals, timeline and budget…"
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-gradient mt-7 w-full sm:w-auto">
                Send Message
                <Icon name="send" className="size-4" />
              </button>
              <p className="mt-4 text-xs text-muted-foreground">
                Your details stay on this device in this demo — no data is sent anywhere.
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
