"use client";

import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { useSiteData } from "@/context/SiteDataContext";
import type { Service } from "@/data/types";

function ServiceCard({ service, delay }: { service: Service; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="card-soft group relative flex h-full flex-col p-6">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-cyan text-white shadow-glow transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
          <Icon name={service.icon} className="size-6" />
        </span>
        <h3 className="mt-5 font-display text-lg font-bold text-foreground">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
        <a
          href="tel:+919172403714"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-all hover:gap-2.5"
        >
          <Icon name="phone" className="size-4" />
          Call Us to Learn More
        </a>
      </div>
    </Reveal>
  );
}

/** Full 16-card services grid. */
export function ServicesSection() {
  const { data } = useSiteData();
  return (
    <section id="services" className="section-pad bg-secondary/50">
      <div className="container-site">
        <SectionHeading
          eyebrow="What We Do"
          title="End-to-end services for every stage of your digital journey"
          description="Sixteen specialised practices, one accountable team — strategy, design, engineering, AI and support under a single roof."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.services.map((service, i) => (
            <ServiceCard key={service.id} service={service} delay={(i % 4) * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
