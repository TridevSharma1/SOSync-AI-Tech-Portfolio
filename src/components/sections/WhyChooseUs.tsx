import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { useSiteData } from "@/context/SiteDataContext";
import type { WhyPoint } from "@/data/types";

function WhyCard({ point, delay }: { point: WhyPoint; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="glass-dark group h-full rounded-3xl border border-white/10 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan/50">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-white/10 text-cyan transition-colors group-hover:bg-cyan/20">
          <Icon name={point.icon} className="size-6" />
        </span>
        <h3 className="mt-5 font-display text-lg font-bold text-white">{point.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">{point.description}</p>
      </div>
    </Reveal>
  );
}

/** Dark "Why Choose Us" comparison section. */
export function WhyChooseUs() {
  const { data } = useSiteData();
  return (
    <section className="section-pad relative overflow-hidden bg-navy">
      <div className="dot-grid-light absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-0 size-[36rem] -translate-x-1/2 rounded-full bg-brand/15 blur-3xl"
        aria-hidden="true"
      />
      <div className="container-site relative">
        <SectionHeading
          tone="light"
          eyebrow="Why Choose Us"
          title="The partner that treats your product like our own"
          description="Nine reasons startups, SMEs and enterprises across 15+ countries keep choosing SOSync."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.whyUs.map((point, i) => (
            <WhyCard key={point.id} point={point} delay={(i % 3) * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}
