import type { PortfolioItem } from "./types";

export const PORTFOLIO_CATEGORIES = [
  "All",
  "Web",
  "Mobile",
  "AI",
  "ERP",
  "CRM",
  "E-Commerce",
] as const;

export const portfolio: PortfolioItem[] = [
  {
    id: "p-shopverse",
    title: "ShopVerse",
    category: "E-Commerce",
    technologies: ["React", "Node.js", "MongoDB"],
    description:
      "A full-featured fashion e-commerce platform with smart search, wishlists, secure payments and an admin suite — serving 40k+ monthly shoppers.",
    image: "/images/portfolio-1.jpg",
  },
  {
    id: "p-medicare",
    title: "MediCare+",
    category: "Mobile",
    technologies: ["Flutter", "Node.js", "PostgreSQL"],
    description:
      "Doctor appointment booking app with instant scheduling, e-prescriptions and video consults, rated 4.8★ on both app stores.",
    image: "/images/portfolio-2.jpg",
  },
  {
    id: "p-finsight",
    title: "FinSight AI",
    category: "AI",
    technologies: ["Python", "Django", "React"],
    description:
      "An AI-powered business intelligence suite that forecasts revenue, flags churn risk and answers questions in natural language.",
    image: "/images/portfolio-3.jpg",
  },
  {
    id: "p-manufactpro",
    title: "ManufactPro ERP",
    category: "ERP",
    technologies: ["Laravel", "MySQL", "React"],
    description:
      "End-to-end manufacturing ERP covering inventory, production, quality and logistics — cutting stock-outs by 32% in the first quarter.",
    image: "/images/portfolio-4.jpg",
  },
  {
    id: "p-salessync",
    title: "SalesSync CRM",
    category: "CRM",
    technologies: ["React", "Node.js", "PostgreSQL"],
    description:
      "A pipeline-first CRM with automated follow-ups, lead scoring and revenue analytics that lifted sales-team productivity by 40%.",
    image: "/images/portfolio-5.jpg",
  },
  {
    id: "p-edulearn",
    title: "EduLearn LMS",
    category: "Web",
    technologies: ["React", "Laravel", "Tailwind CSS"],
    description:
      "A modern learning platform with live classes, quizzes and progress tracking used by 25+ institutes and 18,000 students.",
    image: "/images/portfolio-6.jpg",
  },
];
