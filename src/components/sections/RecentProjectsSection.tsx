"use client";

import { useState } from "react";
import { useSiteData } from "@/context/SiteDataContext";
import { PROJECTS as FALLBACK_PROJECTS } from "@/data/initialProjects";

interface Project {
  title: string;
  href: string;
  image: string;
  category: string;
  description: string;
  tags: string[];
}

const CATEGORIES = [
  "All",
  "Websites",
  "ERP",
  "CRM",
  "AI Projects",
  "Mobile Apps",
  "Graphic Design",
  "Branding",
  "E-Commerce",
] as const;

export function RecentProjectsSection() {
  const { projects } = useSiteData();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const projectList = projects && projects.length > 0 ? projects : FALLBACK_PROJECTS;

  const filtered = projectList.filter((p) => {
    if (activeCategory === "All") return true;
    const cat = (p.category || "").toLowerCase();
    const act = activeCategory.toLowerCase();
    if (activeCategory === "ERP") return cat.includes("erp");
    if (activeCategory === "Websites") return cat.includes("web") || cat.includes("learning");
    if (activeCategory === "CRM") return cat.includes("crm");
    if (activeCategory === "AI Projects") return cat.includes("ai");
    if (activeCategory === "Mobile Apps") return cat.includes("mobile") || cat.includes("app");
    if (activeCategory === "Graphic Design") return cat.includes("graphic") || cat.includes("design");
    if (activeCategory === "Branding") return cat.includes("brand");
    if (activeCategory === "E-Commerce") return cat.includes("commerce");
    return cat === act;
  });

  return (
    <section className="container-px mx-auto max-w-7xl py-10 sm:py-16">
      {/* Header */}
      <div className="text-center mx-auto max-w-3xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-soft px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Portfolio
        </div>
        <h2 className="text-2xl xs:text-3xl font-bold leading-[1.15] text-foreground sm:text-4xl lg:text-5xl">
          Recent <span className="text-gradient-brand">projects</span>
        </h2>
        <p className="mt-3 sm:mt-4 text-sm leading-relaxed text-muted-foreground sm:text-lg">
          Explore our recent work by category. Discover how we design, build, and deliver high quality digital solutions for our clients.
        </p>
      </div>

      {/* Category filter buttons */}
      <div className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-1.5 sm:gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-gradient-brand text-primary-foreground shadow-soft font-semibold"
                : "border border-border bg-white text-foreground/70 hover:border-primary hover:text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-8 sm:mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length > 0 ? (
          filtered.map((item, idx) => (
            <div key={item.title || idx}>
              <a
                href={item.href || "#"}
                target="_blank"
                rel="noreferrer"
                className="group block overflow-hidden rounded-3xl border border-border bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    src={item.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-white sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider bg-primary/90 backdrop-blur-xs px-2.5 py-0.5 sm:py-1 rounded-full shadow-xs">
                      {item.category}
                    </span>
                    {item.href && item.href !== "#" && (
                      <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-white drop-shadow-sm hover:underline">
                        Visit Live ↗
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-[0.7rem] font-semibold text-foreground/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            No projects found in this category.
          </div>
        )}
      </div>
    </section>
  );
}
