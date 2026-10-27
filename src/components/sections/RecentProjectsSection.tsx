import { useState } from "react";

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

const PROJECTS: Project[] = [
  {
    title: "Phoolrani Sarees",
    href: "https://phoolranisaree.com",
    image: "/phoolrani-banner.png.jpeg",
    category: "E-Commerce",
    description: "Premium saree marketplace built with modern React, Next.js, and Node.js.",
    tags: ["React", "Next.js", "Node.js", "Express.js", "MongoDB", "Cloudflare"],
  },
  {
    title: "SP Art Hubs",
    href: "https://www.sparthubs.com",
    image: "/sp art hubs.png",
    category: "ERP Website",
    description: "Premium ERP based product built with modern React, Next.js, and Node.js.",
    tags: ["React", "Next.js", "Node.js", "Express.js", "MongoDB", "Cloudflare"],
  },
  {
    title: "Karyon College",
    href: "https://www.karyoncollege.com/",
    image: "/karyon college.png",
    category: "Websites",
    description: "Modern college website and student inquiry platform built for Karyon College.",
    tags: ["React", "Next.js", "Node.js", "MongoDB", "Cloudflare"],
  },
  {
    title: "Sonai Residential World School",
    href: "https://erp.sonairesidentialworldschool.in/",
    image: "/sonairesidentialworldschool.png",
    category: "Websites",
    description: "High-speed institutional website for Sonai Residential World School.",
    tags: ["React", "Next.js", "Node.js", "MongoDB", "Cloudflare"],
  },
  {
    title: "Sonai School ERP Software",
    href: "https://erp.sonairesidentialworldschool.in/",
    image: "/Sona I Group of institute.png",
    category: "ERP Website",
    description: "Custom ERP software supporting school operations, billing, and management.",
    tags: ["React", "Next.js", "Node.js", "Express.js", "MongoDB", "Cloudflare"],
  },
  {
    title: "Erudition Infinite",
    href: "https://www.eruditioninfinite.com",
    image: "/eruditioninfinite.png",
    category: "E-Learning",
    description: "Premium e-learning platform built with modern React, Next.js, and Node.js.",
    tags: ["React", "Next.js", "Node.js", "Express.js", "MongoDB", "Cloudflare"],
  },
  {
    title: "Suraj Naturo Dry Fruits",
    href: "https://www.surajnaturodryfruits.online",
    image: "/surajnaturodryfruits.png",
    category: "E-Commerce",
    description: "Premium ecommerce web store built with modern React, Next.js, and Node.js.",
    tags: ["React", "Next.js", "Node.js", "Express.js", "MongoDB", "Cloudflare"],
  },
];

export function RecentProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = PROJECTS.filter((p) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "ERP") return p.category.toLowerCase().includes("erp");
    if (activeCategory === "Websites") return p.category.toLowerCase().includes("website");
    if (activeCategory === "E-Commerce") return p.category.toLowerCase().includes("commerce");
    return p.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <section className="container-px mx-auto max-w-7xl py-12 sm:py-16">
      {/* Header */}
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
      <div className="mt-12 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
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
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div key={item.title}>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group block overflow-hidden rounded-3xl border border-border bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={item.image}
                  />
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <div className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
                      {item.category}
                    </div>
                  </div>
                </div>
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
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
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
                </div>
              </a>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center">
            <p className="text-muted-foreground">
              More {activeCategory} case studies coming soon. Contact us for private client demos.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory("All")}
              className="mt-4 text-sm font-semibold text-primary underline"
            >
              View all projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
