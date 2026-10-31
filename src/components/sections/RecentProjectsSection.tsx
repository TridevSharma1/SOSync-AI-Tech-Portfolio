"use client";

import { useMemo, useState } from "react";
import { useSiteData } from "@/context/SiteDataContext";

const BASE_CATEGORIES = [
  "All",
  "Dynamic Portfolio",
  "Static Portfolio",
  "Ecommerce",
  "Custom Software",
] as const;

const PAGE_SIZE = 50;

export function RecentProjectsSection() {
  const { projects } = useSiteData();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

  const projectList = useMemo(() => {
    return projects || [];
  }, [projects]);

  // Strict categories: All, Dynamic Portfolio, Static Portfolio, Ecommerce, Custom Software
  const categories = BASE_CATEGORIES;

  const filtered = useMemo(() => {
    return projectList.filter((p) => {
      if (activeCategory === "All" || activeCategory.toLowerCase() === "all") return true;
      const cat = (p.category || "").trim().toLowerCase();
      const act = activeCategory.trim().toLowerCase();

      if (act === "dynamic portfolio") {
        return cat.includes("dynamic");
      }
      if (act === "static portfolio") {
        return cat.includes("static");
      }
      if (act === "ecommerce") {
        return cat.includes("ecom") || cat.includes("commerce");
      }
      if (act === "custom software") {
        return cat.includes("custom") || cat.includes("software") || cat.includes("erp") || cat.includes("crm");
      }

      return cat === act || cat.includes(act);
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
      {/* Header matching dark stage theme */}
      <div className="text-center mx-auto max-w-3xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-amber-400">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          Portfolio
        </div>
        <h2 className="text-3xl font-bold leading-[1.1] text-white sm:text-4xl lg:text-5xl font-display">
          Recent{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-200">
            projects
          </span>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-blue-200/80 sm:text-lg">
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
            className={`rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
              activeCategory === cat
                ? "bg-gradient-to-r from-orange-600 via-[#FF6B00] to-orange-500 text-black shadow-lg shadow-orange-500/35 border border-orange-300/70"
                : "border border-blue-900/60 bg-[#070F1E] text-blue-200/90 hover:border-orange-500/50 hover:text-white"
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
                <div key={item._id || item.id || item.title || idx} className="h-full">
                  <a
                    href={item.href || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex flex-col justify-between h-full overflow-hidden rounded-3xl border border-blue-900/60 bg-[#0B152B]/90 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/60"
                  >
                    <div>
                      {/* Image + Top-Left Category Badge */}
                      <div className="relative aspect-[21/10] overflow-hidden bg-[#070F1E]">
                        <img
                          alt={item.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          src={item.image}
                        />
                        <div className="absolute left-4 top-4 flex flex-wrap gap-2 pointer-events-none">
                          <span className="rounded-full bg-[#070F1E]/95 px-3 py-1 text-xs font-black uppercase tracking-wider text-amber-400 border border-amber-500/30 backdrop-blur-md shadow-xs">
                            {item.category}
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-xl font-bold text-white transition-colors group-hover:text-amber-400 font-display line-clamp-1" title={item.title}>
                            {item.title}
                          </h3>
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
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
                              className="lucide lucide-external-link h-4 w-4"
                              aria-hidden="true"
                            >
                              <path d="M15 3h6v6" />
                              <path d="M10 14 21 3" />
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            </svg>
                          </div>
                        </div>

                        {/* Description Box with fixed height and auto-hiding side scrollbar */}
                        <div className="mt-2.5 h-14 overflow-y-auto pr-1 text-xs sm:text-sm text-blue-200/70 leading-relaxed custom-scrollbar">
                          {item.description || ""}
                        </div>

                        {/* Tags */}
                        <div className="mt-4 h-6 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                          {item.tags && item.tags.length > 0
                            ? item.tags.map((t) => (
                                <span
                                  key={t}
                                  className="shrink-0 rounded-full bg-[#070F1E] border border-blue-900/50 px-2.5 py-0.5 text-[10px] font-semibold text-blue-200/90"
                                >
                                  {t}
                                </span>
                              ))
                            : null}
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-12 text-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                  className="rounded-full border border-orange-500/60 bg-orange-500/10 px-8 py-3 text-sm font-bold text-orange-400 shadow-sm transition-all hover:bg-[#FF6B00] hover:text-black hover:shadow-orange-500/30 cursor-pointer"
                >
                  Load More Projects ({filtered.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-3xl border border-blue-900/40 bg-[#0B152B]/40 py-16 text-center">
            <p className="text-base text-blue-200/80 font-medium">
              No projects found in this category yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
