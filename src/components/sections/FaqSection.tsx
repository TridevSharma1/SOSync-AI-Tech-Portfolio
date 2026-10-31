"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { useSiteData } from "@/context/SiteDataContext";

function FaqItem({ question, answer, open, onToggle }: { question: string; answer: string; open: boolean; onToggle: () => void }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-colors ${
        open ? "border-brand/40 bg-card shadow-soft" : "border-border bg-card"
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-base font-semibold text-foreground">{question}</span>
        <span
          className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            open ? "rotate-180 bg-gradient-to-br from-brand to-cyan text-white" : "bg-secondary text-brand"
          }`}
        >
          <Icon name="chevron-down" className="size-4" />
        </span>
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{answer}</p>
        </div>
      </div>
    </div>
  );
}

/** Accordion FAQ with single-open behaviour. */
export function FaqSection() {
  const { data } = useSiteData();
  const [openId, setOpenId] = useState<string | null>(data.faqs[0]?.id ?? null);

  return (
    <section id="faq" className="section-pad">
      <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title="Questions, answered"
            description="Everything clients usually ask before starting a project. Still unsure? We're one call away."
          />
          <Reveal delay={150}>
            <a href="tel:+919172403714" className="btn btn-gradient mt-8">
              <Icon name="phone" className="size-4" />
              Call Us Directly
            </a>
          </Reveal>
        </div>
        <div className="space-y-4">
          {data.faqs.map((faq, i) => (
            <Reveal key={faq.id} delay={i * 60}>
              <FaqItem
                question={faq.question}
                answer={faq.answer}
                open={openId === faq.id}
                onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
