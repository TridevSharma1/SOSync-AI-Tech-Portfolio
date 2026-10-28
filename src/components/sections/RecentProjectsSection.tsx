"use client";

import { useMemo, useState } from "react";
import { useSiteData } from "@/context/SiteDataContext";

const DUMMY_PROJECT_TITLES = new Set([
  "phoolrani sarees",
  "sp art hubs",
  "karyon college",
  "sonai residential world school",
  "sonai school erp software",
  "erudition infinite",
  "suraj naturo dry fruits",
  "finsight ai",
  "medicare+ mobile app",
  "salessync crm",
  "manufactpro erp",
  "nova brand identity system",
  "pixelcraft ui kit & graphics",
  "shopverse",
  "medicare+",
  "edulearn",
]);

const BASE_CATEGORIES = [
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

const PAGE_SIZE = 9;

export function RecentProjectsSection() {
  const { projects } = useSiteData();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

  // Only real projects created by admin — all dummy template projects completely removed
  const projectList = useMemo(() => {
    return (projects || []).filter(
      (p) => !DUMMY_PROJECT_TITLES.has((p.title || "").trim().toLowerCase())
    );
  }, [projects]);

  // Dynamically include any additional custom categories from real projects
  const categories = useMemo(() => {
    const customCats = new Set<string>();
    projectList.forEach((p) => {
      const c = (p.category || "").trim();
      if (!c) return;
      const matchesBase = BASE_CATEGORIES.some(
        (b) => b !== "All" && (b.toLowerCase() === c.toLowerCase() || c.toLowerCase().includes(b.toLowerCase()))
      );
      if (!matchesBase) {
        customCats.add(c);
      }
    });
    return [...BASE_CATEGORIES, ...Array.from(customCats)];
  }, [projectList]);

  const filtered = useMemo(() => {
    return projectList.filter((p) => {
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
  }, [projectList, activeCategory]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(PAGE_SIZE);
  };

  const visibleProjects = useMemo(() => {
    return filtered.slice(0, visibleCount);
  }, [filtered, visibleCount]);

  const hasMore = visibleCount < filtered.length;

  return (
    <section className="container-px mx-auto max-w-7xl py-12 sm:py-16">
      {/* Header matching live site */}
      <div className="text-center mx-auto max-w-3xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Portfolio
        </div>
        <h2 className="text-3xl font-bold leading-[1.1] text-foreground sm:text-4xl lg:text-5xl">
          Recent <span className="text-gradient-brand">projects</span>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          Explore our recent work by category. Discover how we design, build, and deliver high quality digital solutions for our clients.
        </p>
      </div>

      {/* Category filter buttons */}
      <div className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => handleCategoryChange(cat)}
            className={`rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeCategory === cat
                ? "bg-gradient-brand text-primary-foreground shadow-soft"
                : "border border-border bg-white text-foreground/70 hover:border-primary hover:text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-12 sm:mt-14">
        {filtered.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleProjects.map((item, idx) => (
                <div key={item._id || item.id || item.title || idx}>
                  <a
                    href={item.href || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="group block overflow-hidden rounded-3xl border border-border bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant"
                  >
                    {/* Image + Top-Left Category Badge */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        alt={item.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={item.image}
                      />
                      <div className="absolute left-4 top-4 flex flex-wrap gap-2 pointer-events-none">
                        <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md shadow-xs">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-arrow-up-right mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                          aria-hidden="true"
                        >
                          <path d="M7 7h10v10" />
                          <path d="M7 17 17 7" />
                        </svg>
                      </div>
                      {item.description && (
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                      )}
                      {item.tags && item.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-border bg-surface-soft px-2.5 py-1 text-xs font-medium text-foreground/70"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </a>
                </div>
              ))}
            </div>

            {/* Load More / Infinite Projects Controls */}
            {filtered.length > PAGE_SIZE && (
              <div className="mt-12 flex flex-col items-center justify-center gap-4 text-center">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <span>
                    Showing {visibleProjects.length} of {filtered.length} projects
                  </span>
                  <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground/40" />
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full bg-gradient-brand transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.round((visibleProjects.length / filtered.length) * 100))}%` }}
                    />
                  </div>
                </div>

                {hasMore ? (
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:shadow-hover hover:-translate-y-0.5 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                      Load More Projects
                    </button>
                    <button
                      type="button"
                      onClick={() => setVisibleCount(filtered.length)}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-foreground/80 shadow-xs transition-all duration-200 hover:border-primary hover:text-primary cursor-pointer"
                    >
                      Show All ({filtered.length})
                    </button>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    All {filtered.length} projects displayed
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="card-soft p-12 bg-white text-center rounded-3xl border border-slate-200">
            <p className="text-base font-semibold text-slate-700">No projects found in this category.</p>
            <p className="text-xs text-muted-foreground mt-1">Projects added from the admin portal will appear here.</p>
          </div>
        )}
      </div>
    </section>
  );
}
