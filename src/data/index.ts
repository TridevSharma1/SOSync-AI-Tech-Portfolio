import type { SiteData } from "./types";
import { companyInfo, socialLinks } from "./company";
import { heroContent } from "./hero";
import { stats } from "./stats";
import { services } from "./services";
import { technologies } from "./technologies";
import { portfolio } from "./portfolio";
import { testimonials } from "./testimonials";
import { team } from "./team";
import { faqs } from "./faqs";
import { story } from "./story";
import { process } from "./process";
import { whyUs } from "./whyUs";
import { enquiries } from "./enquiries";

export const defaultSiteData: SiteData = {
  company: companyInfo,
  social: socialLinks,
  hero: heroContent,
  stats,
  services,
  technologies,
  portfolio,
  testimonials,
  team,
  faqs,
  story,
  process,
  whyUs,
  enquiries,
};
