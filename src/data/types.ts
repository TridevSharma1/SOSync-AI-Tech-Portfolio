/** Shared mock-data types for the SOSync Ai Tech website. */

export interface CompanyInfo {
  name: string;
  shortName: string;
  tagline: string;
  addressLines: string[];
  phones: string[];
  email: string;
  hours: string;
  workingDays: string;
  mapQuery: string;
}

export interface SocialLinks {
  linkedin: string;
  twitter: string;
  instagram: string;
  facebook: string;
  github: string;
}

export interface HeroContent {
  badge: string;
  heading: string;
  subheading: string;
  primaryCta: string;
  secondaryCta: string;
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Technology {
  id: string;
  name: string;
  category: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  technologies: string[];
  description: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  rating: number;
  review: string;
  initials: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  initials: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export interface StoryEvent {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface WhyPoint {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export interface SiteData {
  company: CompanyInfo;
  social: SocialLinks;
  hero: HeroContent;
  stats: Stat[];
  services: Service[];
  technologies: Technology[];
  portfolio: PortfolioItem[];
  testimonials: Testimonial[];
  team: TeamMember[];
  faqs: Faq[];
  story: StoryEvent[];
  process: ProcessStep[];
  whyUs: WhyPoint[];
  enquiries: Enquiry[];
}

/** Key of every list-shaped section in SiteData (used by the admin CRUD). */
export type ListKey = Exclude<keyof SiteData, "company" | "social" | "hero">;

export function isList(item: unknown): item is { id: string } {
  return typeof item === "object" && item !== null && "id" in item;
}
