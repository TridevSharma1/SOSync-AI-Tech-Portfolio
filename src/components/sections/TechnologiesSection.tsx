import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { useSiteData } from "@/context/SiteDataContext";
import type { Technology } from "@/data/types";

/** Colourful letter-mark tile used as a well-designed technology logo placeholder. */
const TILE_STYLES = [
  "from-brand to-cyan",
  "from-cyan to-sky",
  "from-navy-soft to-brand",
  "from-brand-deep to-cyan",
  "from-sky to-brand",
  "from-cyan to-navy-soft",
] as const;

function TechTile({ tech, delay }: { tech: Technology; delay: number }) {
  const initials = tech.name
    .replace(/[^A-Za-z0-9. +]/g, "")
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
  return (
    <Reveal delay={delay} className="h-full">
      <div className="card-soft flex h-full items-center gap-3.5 px-4 py-3.5">
        <span
          className={`flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${
            TILE_STYLES[tech.name.length % TILE_STYLES.length]
          } font-display text-sm font-bold text-white shadow-soft`}
          aria-hidden="true"
        >
          {initials}
        </span>
        <div>
          <p className="font-display text-sm font-semibold text-foreground">{tech.name}</p>
          <p className="text-xs text-muted-foreground">{tech.category}</p>
        </div>
      </div>
    </Reveal>
  );
}

/** Technology grid: names + categories with designed initial tiles. */
export function TechnologiesSection() {
  const { data } = useSiteData();
  return (
    <section id="technologies" className="section-pad relative overflow-hidden">
      <div className="dot-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="container-site relative">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Modern technologies, mastered deeply"
          description="We pick proven, future-proof stacks per product — never a one-size-fits-all framework."
        />
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.technologies.map((tech, i) => (
            <TechTile key={tech.id} tech={tech} delay={(i % 4) * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}
