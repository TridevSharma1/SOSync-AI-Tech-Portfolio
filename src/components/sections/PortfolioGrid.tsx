"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { useSiteData } from "@/context/SiteDataContext";
import { PORTFOLIO_CATEGORIES } from "@/data/portfolio";
import type { PortfolioItem } from "@/data/types";

/** Category chips; "All" shows everything. */
function Filters({ active, onChange }: { active: string; onChange: (c: string) => void }) {
  return (
    <div className="no-scrollbar mt-8 sm:mt-10 flex gap-2 sm:gap-2.5 overflow-x-auto pb-1 px-1" role="tablist" aria-label="Portfolio filters">
      {PORTFOLIO_CATEGORIES.map((cat) => (
        <button
          key={cat}
          role="tab"
          aria-selected={active === cat}
          onClick={() => onChange(cat)}
          className={`shrink-0 rounded-full px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-semibold transition-all ${
            active === cat
              ? "bg-gradient-to-r from-brand to-cyan text-white shadow-glow"
              : "border border-border bg-card text-muted-foreground hover:border-brand/40 hover:text-brand"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

function ProjectCard({ item, delay, onView }: { item: PortfolioItem; delay: number; onView: () => void }) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="card-soft group flex h-full flex-col overflow-hidden">
        <div className="relative overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            width={1280}
            height={800}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 sm:left-4 sm:top-4 rounded-full bg-navy/85 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-semibold text-white backdrop-blur">
            {item.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="font-display text-base sm:text-lg font-bold text-foreground">{item.title}</h3>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {item.technologies.map((t) => (
              <span
                key={t}
                className="rounded-full bg-secondary px-2.5 py-0.5 text-[0.7rem] font-semibold text-brand-deep"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="mt-3 flex-1 text-xs sm:text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          <button
            onClick={onView}
            className="mt-5 inline-flex items-center gap-1.5 self-start text-xs sm:text-sm font-semibold text-brand transition-all hover:gap-2.5"
          >
            View Details
            <Icon name="arrow-right" className="size-4" />
          </button>
        </div>
      </article>
    </Reveal>
  );
}

/** Full portfolio gallery with filters and a details modal. */
export function PortfolioGrid() {
  const { data } = useSiteData();
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<PortfolioItem | null>(null);

  const items = useMemo(() => {
    if (filter === "All") return data.portfolio;
    const f = filter.toLowerCase();
    return data.portfolio.filter((p) => {
      const cat = (p.category || "").toLowerCase();
      if (f === "web") return cat.includes("web") || cat.includes("learning");
      if (f === "mobile") return cat.includes("mobile") || cat.includes("app");
      if (f === "ai") return cat.includes("ai");
      if (f === "erp") return cat.includes("erp");
      if (f === "crm") return cat.includes("crm");
      if (f === "e-commerce") return cat.includes("commerce");
      return cat === f;
    });
  }, [data.portfolio, filter]);

  return (
    <section className="section-pad">
      <div className="container-site">
        <SectionHeading
          eyebrow="Our Work"
          title="Projects that moved businesses forward"
          description="A snapshot of recent platforms, apps and AI systems delivered by our engineers."
        />
        <div className="mx-auto max-w-3xl">
          <Filters active={filter} onChange={setFilter} />
        </div>
        <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <ProjectCard key={item.id} item={item} delay={(i % 3) * 80} onView={() => setSelected(item)} />
          ))}
        </div>

        {/* Details modal */}
        {selected ? (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/70 p-3 sm:p-4 backdrop-blur-sm overflow-y-auto"
            role="dialog"
            aria-modal="true"
            onClick={() => setSelected(null)}
          >
            <div
              className="card-soft relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute right-3 top-3 sm:right-4 sm:top-4 z-10 rounded-full bg-navy/70 p-2 text-white transition-colors hover:bg-navy"
              >
                <Icon name="close" className="size-4 sm:size-5" />
              </button>
              <img
                src={selected.image}
                alt={selected.title}
                width={1280}
                height={800}
                className="aspect-[16/9] w-full object-cover"
              />
              <div className="p-5 sm:p-7">
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-brand-deep">
                  {selected.category}
                </span>
                <h3 className="mt-3 font-display text-xl sm:text-2xl font-bold text-foreground">{selected.title}</h3>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">{selected.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                  {selected.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-2.5 py-0.5 sm:px-3 sm:py-1 text-xs font-semibold text-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <Link href="/contact" className="btn btn-gradient btn-sm mt-6 w-full sm:w-auto">
                  Start a similar project
                  <Icon name="arrow-right" className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

/** Home-page preview: first three projects with a link to the full gallery. */
export function PortfolioPreview() {
  const { data } = useSiteData();
  return (
    <section id="portfolio" className="section-pad bg-secondary/50">
      <div className="container-site">
        <SectionHeading
          eyebrow="Our Work"
          title="Featured projects"
          description="A selection of platforms, apps and AI systems our team recently shipped."
        />
        <div className="mt-10 sm:mt-14 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.portfolio.slice(0, 3).map((item, i) => (
            <ProjectCard key={item.id} item={item} delay={i * 90} onView={() => null} />
          ))}
        </div>
        <div className="mt-10 sm:mt-12 text-center">
          <Link href="/portfolio" className="btn btn-outline w-full sm:w-auto">
            View All Projects
            <Icon name="arrow-right" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
