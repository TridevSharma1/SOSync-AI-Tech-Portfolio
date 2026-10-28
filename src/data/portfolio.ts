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

// Clean slate: all dummy projects removed so only real admin-created projects appear on the website
export const portfolio: PortfolioItem[] = [];
