import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { useSiteData } from "@/context/SiteDataContext";
import type { ProcessStep } from "@/data/types";

function StepCard({ step, index, delay }: { step: ProcessStep; index: number; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="card-soft relative h-full p-6">
        <span
          className="absolute right-5 top-4 font-display text-4xl font-extrabold text-transparent"
          style={{ WebkitTextStroke: "1.5px oklch(0.546 0.245 262.881 / 0.35)" }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-brand">
          <Icon name={step.icon} className="size-6" />
        </span>
        <h3 className="mt-5 font-display text-base font-bold text-foreground">{step.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
      </div>
    </Reveal>
  );
}

/** 7-step delivery process. */
export function ProcessSection() {
  const { data } = useSiteData();
  return (
    <section id="process" className="section-pad">
      <div className="container-site">
        <SectionHeading
          eyebrow="How We Work"
          title="A proven process, from idea to always-on"
          description="Transparent milestones, weekly demos and zero surprises — this is how every SOSync engagement runs."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.process.map((step, i) => (
            <StepCard key={step.id} step={step} index={i} delay={(i % 4) * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
