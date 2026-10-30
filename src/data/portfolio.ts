import type { PortfolioItem } from "./types";

export const PORTFOLIO_CATEGORIES = [
  "All",
  "Dynamic Portfolio",
  "Static Portfolio",
  "Ecommerce",
  "Custom Software",
  "Mobile Application",
] as const;

// Clean slate: all dummy projects removed so only real admin-created projects appear on the website
export const portfolio: PortfolioItem[] = [];
