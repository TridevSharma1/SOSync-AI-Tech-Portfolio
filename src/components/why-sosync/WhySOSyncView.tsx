"use client";

import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Users,
  Clock,
  Coins,
  MessageSquare,
  Wrench,
  Layers,
  Lock,
  Headphones,
  Award,
  Calendar,
  Gift,
  HelpCircle,
  Phone,
  Mail,
  GraduationCap,
  Factory,
  HardHat,
  Building2,
  Briefcase,
  Music,
  ShoppingBag,
  UtensilsCrossed,
  CalendarDays,
  Trophy,
  Dumbbell,
  BookOpen,
  School,
  Building,
  Shirt,
} from "lucide-react";

// ============================================================================
// DATA: ACHIEVEMENTS & DIFFERENTIATORS (Image 1)
// ============================================================================
const ACHIEVEMENTS = [
  { text: "50+ Happy Customers Worldwide", highlight: "Global Reach" },
  { text: "50+ Successfully Delivered Projects", highlight: "Proven Delivery" },
  { text: "Professional Team of 8+ Developers & Designers", highlight: "In-House Squad" },
  { text: "On-Time Project Delivery Guarantee", highlight: "Strict Deadlines" },
  { text: "Affordable Pricing with Premium Quality", highlight: "High ROI" },
  { text: "Transparent Communication Throughout the Project", highlight: "Zero Surprises" },
  { text: "Long-Term Technical Support & Maintenance", highlight: "Full Partnership" },
  { text: "Customized Solutions Based on Business Requirements", highlight: "Tailored Architecture" },
  { text: "Secure, Scalable & User-Friendly Development", highlight: "Modern Stacks" },
  { text: "Dedicated Project Management on Every Account", highlight: "Single Point of Contact" },
];

const DIFFERENTIATORS = [
  {
    title: "Dedicated Support Team",
    desc: "Assigned technical engineers ready to resolve queries and keep systems active.",
    icon: Headphones,
  },
  {
    title: "Business-Oriented Development Approach",
    desc: "We focus on increasing revenue, user retention, and process automation.",
    icon: Zap,
  },
  {
    title: "Focus on Performance & Security",
    desc: "Sub-second load speeds, modern SSL, zero data exposure, and hardened endpoints.",
    icon: Lock,
  },
  {
    title: "Fast Response Time",
    desc: "Direct communication on WhatsApp & Slack with swift turnarounds during business hours.",
    icon: Clock,
  },
  {
    title: "Transparent Pricing Structure",
    desc: "No hidden maintenance fees or surprise charges. Clean milestones and clear scope.",
    icon: Coins,
  },
  {
    title: "Client-Centric Communication",
    desc: "Regular sprint demos, accessible dashboards, and weekly status updates.",
    icon: MessageSquare,
  },
  {
    title: "Scalable Solutions for Future Growth",
    desc: "Built to effortlessly handle 10x traffic spikes and modular feature expansion.",
    icon: Layers,
  },
  {
    title: "Continuous Improvement Recommendations",
    desc: "Ongoing feature suggestions, conversion optimization, and tech upgrades.",
    icon: Award,
  },
  {
    title: "Reliable Post-Launch Support",
    desc: "Complimentary 6 months coverage included with every custom engagement.",
    icon: ShieldCheck,
  },
  {
    title: "Long-Term Technology Partner",
    desc: "We act as your extended CTO and engineering department for years to come.",
    icon: Users,
  },
];

// ============================================================================
// DATA: 15 INDUSTRY SECTORS (User Requested)
// ============================================================================
const INDUSTRY_SECTORS = [
  {
    id: "manufacturing",
    name: "Manufacturing",
    icon: Factory,
    focus: "Production tracking, inventory ERPs & vendor management systems",
    tag: "Industrial",
  },
  {
    id: "construction",
    name: "Construction",
    icon: HardHat,
    focus: "Site reporting, contractor workflows & project milestone dashboards",
    tag: "Infrastructure",
  },
  {
    id: "education",
    name: "Education",
    icon: GraduationCap,
    focus: "Interactive learning platforms, student portals & assessment systems",
    tag: "EdTech",
  },
  {
    id: "training-institutes",
    name: "Training Institutes",
    icon: BookOpen,
    focus: "Lead capture funnels, course management & student certifications",
    tag: "Academia",
  },
  {
    id: "colleges-university",
    name: "Colleges & Universities",
    icon: School,
    focus: "Admissions portals, campus digital ecosystems & fee management",
    tag: "Institutional",
  },
  {
    id: "real-estate",
    name: "Real Estate",
    icon: Building2,
    focus: "High-converting property showcases, 360 virtual tours & broker CRM",
    tag: "Property",
  },
  {
    id: "consultancy",
    name: "Consultancy",
    icon: Briefcase,
    focus: "Corporate presence, appointment booking & client proposal systems",
    tag: "Professional",
  },
  {
    id: "music-industry",
    name: "Music Industry",
    icon: Music,
    focus: "Artist presskits, streaming integrations, studio portals & academy hubs",
    tag: "Entertainment",
  },
  {
    id: "facility-management",
    name: "Facility Management Services",
    icon: Building,
    focus: "Ticket tracking, asset maintenance & multi-facility service audits",
    tag: "Enterprise",
  },
  {
    id: "textile",
    name: "Textile",
    icon: Shirt,
    focus: "Wholesale catalogues, fabric swatch viewports & B2B order pipelines",
    tag: "Manufacturing",
  },
  {
    id: "retail-marketing",
    name: "Retail & Digital Marketing",
    icon: ShoppingBag,
    focus: "E-commerce stores, Omnichannel campaigns & conversion funnels",
    tag: "Commerce",
  },
  {
    id: "hotel-restaurant",
    name: "Hotel & Restaurant",
    icon: UtensilsCrossed,
    focus: "Table reservations, digital QR menus & guest booking engines",
    tag: "Hospitality",
  },
  {
    id: "event-management",
    name: "Event Management",
    icon: CalendarDays,
    focus: "Ticketing gates, RSVP registrations & interactive attendee schedules",
    tag: "Events",
  },
  {
    id: "sports-academy",
    name: "Sports Academy",
    icon: Trophy,
    focus: "Batch scheduling, coach allocations & athlete performance analytics",
    tag: "Sports",
  },
  {
    id: "gym-fitness",
    name: "Gym & Fitness",
    icon: Dumbbell,
    focus: "Member check-ins, subscription billing & workout progress trackers",
    tag: "Wellness",
  },
];

// ============================================================================
// DATA: 9-PHASE DEVELOPMENT LIFECYCLE (Images 2 & 3)
// ============================================================================
const DEVELOPMENT_PROCESS = [
  {
    step: "01",
    name: "Requirement Analysis",
    desc: "We start by deeply understanding your business goals, target audience, and project specifications through detailed collaborative consultations.",
    tag: "Discovery",
  },
  {
    step: "02",
    name: "Project Planning",
    desc: "Our technical leads prepare an architectural roadmap, define project scope, timeline, technology stack, and an estimated milestone schedule.",
    tag: "Architecture",
  },
  {
    step: "03",
    name: "UI/UX Design",
    desc: "We craft modern, user-friendly, responsive designs and clickable prototypes matching your unique brand identity and commercial objectives.",
    tag: "Interface",
  },
  {
    step: "04",
    name: "Development Phase",
    desc: "Our engineering squad builds the system using industry-standard technologies while guaranteeing top performance, clean code, and scalability.",
    tag: "Engineering",
  },
  {
    step: "05",
    name: "Testing & Quality Assurance",
    desc: "Extensive cross-browser, mobile responsiveness, and security audit testing to identify and fix all edge cases before public launch.",
    tag: "QA & Audit",
  },
  {
    step: "06",
    name: "Client Review & Feedback",
    desc: "A comprehensive live walkthrough and staging demonstration is provided to your team. Feedback and fine adjustments are implemented swiftly.",
    tag: "Validation",
  },
  {
    step: "07",
    name: "Project Deployment",
    desc: "The final project is seamlessly deployed to your live cloud infrastructure with full DNS, SSL, database optimization, and caching configurations.",
    tag: "Go-Live",
  },
  {
    step: "08",
    name: "Training & Handover",
    desc: "We guide your team on using the system, provide custom admin panel training, and deliver all credentials, repositories, and documentation.",
    tag: "Empowerment",
  },
  {
    step: "09",
    name: "Free Support Period",
    desc: "After deployment, every project includes 6 Months of COMPLIMENTARY Technical Support for all delivered features and functionalities.",
    tag: "6 Mos Warranty",
  },
];

// ============================================================================
// DATA: 6 MONTHS FREE SUPPORT DETAILS (Images 2 & 3)
// ============================================================================
const SUPPORT_FEATURES = [
  "Bug fixing for delivered features and functionalities",
  "Dedicated technical support during business hours (Mon – Sat | 9:30 AM – 7:00 PM)",
  "Server-related issue assistance, uptime monitoring and troubleshooting",
  "Database error resolution and performance indexing",
  "Website downtime investigation and rapid recovery assistance",
  "Performance monitoring and speed optimizations",
  "Security patch implementation and vulnerability screening",
  "User access management and permission-level support",
  "Direct communication via dedicated Email and WhatsApp channels",
  "Basic operational guidance and admin panel assistance",
  "Error log monitoring and proactive issue diagnosis",
  "Minor configuration updates and environment tweaks",
  "Cloud backup restoration assistance (with active backups)",
  "Technical consultation regarding expansion of existing features",
];

const SUPPORT_TERMS = [
  "Support is limited to delivered modules and agreed project scope.",
  "New feature additions, redesigns, and major architectural overhauls are quoted separately.",
  "Third-party provider charges (cloud hosting, domain, external APIs, SMS/payment gateways) are billed directly to client accounts.",
  "Support requests are serviced promptly during business hours (Monday to Saturday | 9:30 AM – 7:00 PM).",
  "Issues caused by direct modifications by external third parties or unauthorized code alterations are not covered under free warranty.",
];

export function WhySOSyncView() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* ------------------------------------------------------------------ */}
      {/* 0. FIXED PAGE BACKGROUND IMAGE (OUR STORY AMBIENCE)                */}
      {/* ------------------------------------------------------------------ */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/about-story-slide-2.jpg"
          alt="SOSync AI Tech Modern Engineering Architecture"
          className="size-full object-cover object-center opacity-40 brightness-90 saturate-125"
        />
        {/* Balanced Dark Vignette & Radial Light Dampener */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/85 via-[#030712]/60 to-[#030712]/95" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#030712]/50 to-[#030712]/90" />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 1. HERO HEADER: WHY PARTNER WITH SOSYNC AI TECH                    */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative z-10 pt-24 sm:pt-32 pb-14 sm:pb-20 text-center container-site">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider shadow-sm mb-5">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>WHY CHOOSE US</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
          Why partner with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-200">
            SOSync AI Tech?
          </span>
        </h1>
        <p className="mt-6 text-blue-100/90 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
          At <span className="font-extrabold text-amber-400">SOSync AI Tech</span>, we don&apos;t just build websites and software—we build long-term business partnerships. Our goal is to engineer high-velocity digital solutions that help businesses scale, improve efficiency, and achieve measurable commercial results.
        </p>

        {/* Quick Highlights Ribbon */}
        <div className="mt-10 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          <div className="rounded-2xl bg-[#0B152B]/85 border border-blue-900/60 p-4 sm:p-5 text-center shadow-lg hover:border-amber-500/40 transition-colors">
            <div className="font-display text-2xl sm:text-3xl font-black text-amber-400">50+</div>
            <div className="mt-1 text-xs sm:text-sm text-blue-200/80 font-medium">Delivered Projects</div>
          </div>
          <div className="rounded-2xl bg-[#0B152B]/85 border border-blue-900/60 p-4 sm:p-5 text-center shadow-lg hover:border-amber-500/40 transition-colors">
            <div className="font-display text-2xl sm:text-3xl font-black text-amber-400">50+</div>
            <div className="mt-1 text-xs sm:text-sm text-blue-200/80 font-medium">Happy Clients Worldwide</div>
          </div>
          <div className="rounded-2xl bg-[#0B152B]/85 border border-blue-900/60 p-4 sm:p-5 text-center shadow-lg hover:border-amber-500/40 transition-colors">
            <div className="font-display text-2xl sm:text-3xl font-black text-amber-400">8+</div>
            <div className="mt-1 text-xs sm:text-sm text-blue-200/80 font-medium">In-House Engineers</div>
          </div>
          <div className="rounded-2xl bg-[#0B152B]/85 border border-blue-900/60 p-4 sm:p-5 text-center shadow-lg hover:border-amber-500/40 transition-colors">
            <div className="font-display text-2xl sm:text-3xl font-black text-amber-400">6 Mos</div>
            <div className="mt-1 text-xs sm:text-sm text-blue-200/80 font-medium">Free Warranty Support</div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. ACHIEVEMENTS & WHAT SETS US APART (Image 1 Breakdown)           */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative z-10 py-14 sm:py-20 border-b border-blue-900/40 overflow-hidden">
        {/* Ambient Backlight Lighting */}
        <div className="pointer-events-none absolute top-1/2 left-10 size-[500px] rounded-full bg-amber-500/10 blur-[150px] -z-10" />
        <div className="pointer-events-none absolute bottom-10 right-10 size-[450px] rounded-full bg-blue-600/15 blur-[140px] -z-10" />

        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* Card 1: Our Achievements & Verified Track Record */}
            <div className="group relative rounded-3xl p-7 sm:p-10 bg-[#0B152B]/85 border border-blue-900/60 shadow-2xl transition-all duration-300 hover:border-amber-500/60 hover:shadow-[0_20px_45px_rgba(245,158,11,0.12)] flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-[11px] font-black uppercase tracking-widest text-amber-400 mb-4 shadow-xs">
                  <Award size={13} className="text-amber-400" />
                  <span>PROVEN TRACK RECORD</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Our Achievements
                </h2>
                <p className="mt-2 text-sm text-blue-200/75 leading-relaxed">
                  Real results established through disciplined agile execution and dedicated client partnerships.
                </p>

                <div className="mt-8 space-y-3.5">
                  {ACHIEVEMENTS.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#070F1E]/60 border border-blue-900/40 group-hover:border-blue-800/60 transition-colors"
                    >
                      <div className="size-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 grid place-items-center text-black shrink-0 mt-0.5 shadow-sm shadow-amber-500/30">
                        <CheckCircle2 size={14} className="stroke-[2.5]" />
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-semibold text-white/95 leading-snug">
                          {item.text}
                        </span>
                      </div>
                      <span className="hidden sm:inline-block text-[11px] font-bold text-amber-400/80 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 shrink-0">
                        {item.highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2: What Makes Us Different? */}
            <div className="group relative rounded-3xl p-7 sm:p-10 bg-[#0B152B]/85 border border-blue-900/60 shadow-2xl transition-all duration-300 hover:border-amber-500/60 hover:shadow-[0_20px_45px_rgba(245,158,11,0.12)] flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-[11px] font-black uppercase tracking-widest text-amber-400 mb-4 shadow-xs">
                  <Zap size={13} className="text-amber-400" />
                  <span>THE SOSYNC ADVANTAGE</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
                  What Makes Us Different?
                </h2>
                <p className="mt-2 text-sm text-blue-200/75 leading-relaxed">
                  We don&apos;t just code specifications—we engineer high-performing software that directly grows your bottom line.
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {DIFFERENTIATORS.map((item, idx) => {
                    const IconComp = item.icon;
                    return (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-[#070F1E]/60 border border-blue-900/40 hover:border-amber-500/30 transition-all flex flex-col justify-between"
                      >
                        <div className="flex items-center gap-2.5 mb-1.5">
                          <div className="size-7 rounded-xl bg-amber-500/15 border border-amber-500/30 grid place-items-center text-amber-400 shrink-0">
                            <IconComp size={15} />
                          </div>
                          <h3 className="text-xs sm:text-sm font-bold text-white leading-tight">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-[12px] text-blue-200/70 leading-relaxed mt-1">
                          {item.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Commitment Banner */}
              <div className="mt-8 pt-5 border-t border-blue-900/40">
                <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed italic bg-amber-500/5 p-4 rounded-2xl border border-amber-500/20">
                  &ldquo;From idea to deployment and beyond, SOSync AI Tech remains committed to delivering reliable, secure, and scalable digital solutions that help businesses succeed in the modern digital economy.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. SECTORS WE WORK FOR (15 REQUESTED INDUSTRIES)                   */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative z-10 py-16 sm:py-24 border-b border-blue-900/40 overflow-hidden">
        <div className="container-site">
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-amber-400 mb-3 shadow-xs">
              <Sparkles size={13} className="text-amber-400 animate-pulse" />
              <span>DOMAIN EXPERTISE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Sectors we engineer{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-200">
                solutions for
              </span>
            </h2>
            <p className="mt-4 text-blue-200/80 text-sm sm:text-base leading-relaxed">
              We build specialized digital infrastructure and growth engines across 15+ diverse industries.
            </p>
          </div>

          {/* 15 Sector Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {INDUSTRY_SECTORS.map((sector) => {
              const IconComp = sector.icon;
              return (
                <div
                  key={sector.id}
                  className="group relative rounded-2xl p-5 bg-[#0B152B]/80 border border-blue-900/60 hover:border-amber-500/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_28px_rgba(245,158,11,0.12)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="size-11 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 grid place-items-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300 shadow-sm">
                        <IconComp size={20} />
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-300/70 bg-blue-950/80 px-2 py-0.5 rounded-full border border-blue-900/50">
                        {sector.tag}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-base text-white group-hover:text-amber-400 transition-colors">
                      {sector.name}
                    </h3>
                    <p className="mt-2 text-xs text-blue-100/70 leading-relaxed">
                      {sector.focus}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-blue-900/30 flex items-center justify-between text-[11px] font-bold text-amber-400/80 group-hover:text-amber-300">
                    <span>Industry Ready</span>
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. OUR 9-PHASE DEVELOPMENT PROCESS (Images 2 & 3 Roadmap)          */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative z-10 py-16 sm:py-24 border-b border-blue-900/40 overflow-hidden">
        <div className="pointer-events-none absolute top-1/3 right-1/4 size-[550px] rounded-full bg-amber-500/10 blur-[170px] -z-10" />

        <div className="container-site">
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-amber-400 mb-3 shadow-xs">
              <Calendar size={13} className="text-amber-400" />
              <span>THE PROCESS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Our 9-phase{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-200">
                development roadmap
              </span>
            </h2>
            <p className="mt-4 text-blue-200/80 text-sm sm:text-base leading-relaxed">
              From concept validation to post-deployment support, our transparent process guarantees smooth milestones and zero surprises.
            </p>
          </div>

          {/* 9 Process Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEVELOPMENT_PROCESS.map((proc) => (
              <div
                key={proc.step}
                className="group relative rounded-3xl p-6 sm:p-7 bg-[#0B152B]/80 border border-blue-900/60 hover:border-amber-500/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(245,158,11,0.12)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                      Step {proc.step}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                      {proc.tag}
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-white group-hover:text-amber-400 transition-colors">
                    {proc.name}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-blue-100/75 leading-relaxed">
                    {proc.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-blue-900/40 flex items-center justify-between text-xs font-semibold text-blue-300/60">
                  <span>Phase {proc.step} of 09</span>
                  <div className="h-1.5 w-16 bg-blue-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                      style={{ width: `${(parseInt(proc.step, 10) / 9) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. 6 MONTHS FREE SUPPORT GUARANTEE (Images 2 & 3 Right Side)       */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative z-10 py-16 sm:py-24 border-b border-blue-900/40 overflow-hidden">
        <div className="pointer-events-none absolute top-1/2 left-1/3 -translate-y-1/2 size-[600px] rounded-full bg-amber-500/10 blur-[180px] -z-10" />

        <div className="container-site">
          {/* Master Highlight Glass Box */}
          <div className="rounded-3xl border-2 border-amber-500/40 bg-gradient-to-b from-[#0B152B]/95 via-[#070F1E]/95 to-[#0B152B]/95 p-8 sm:p-12 lg:p-14 shadow-[0_25px_60px_rgba(0,0,0,0.8)] ring-1 ring-amber-500/20">
            {/* Header with Value Badge */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-8 border-b border-blue-900/50">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/15 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-amber-400 mb-3 shadow-xs">
                  <Gift size={14} className="text-amber-400 animate-bounce" />
                  <span>INCLUDED FREE WITH EVERY PROJECT</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  6 Months{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-200">
                    FREE Support
                  </span>
                </h2>
                <p className="mt-2 text-sm sm:text-base text-amber-200/90 font-semibold">
                  Included with Every Project — No Hidden Charges & No Surprise Invoices
                </p>
              </div>

              <div className="rounded-2xl bg-amber-500/15 border border-amber-500/40 px-5 py-3 text-center shrink-0">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-200/80 block">
                  Complimentary Value
                </span>
                <span className="font-mono text-2xl sm:text-3xl font-black text-amber-400">
                  Worth ₹25,000+
                </span>
                <span className="text-[10px] font-bold text-emerald-400 block mt-0.5">
                  100% Free For 6 Months
                </span>
              </div>
            </div>

            <p className="mt-6 text-sm sm:text-base text-blue-100/80 leading-relaxed max-w-4xl">
              After successful project delivery and client presentation, we provide 6 months of complimentary technical support to ensure your system operates smoothly, securely, and efficiently.
            </p>

            {/* Split Grid: Covered Capabilities vs Clear Boundaries */}
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left 2 Cols: 14 Covered Items */}
              <div className="lg:col-span-2">
                <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-400" />
                  <span>What is Included in Your Free 6-Month Support:</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SUPPORT_FEATURES.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-[#070F1E]/80 border border-blue-900/40 text-xs sm:text-sm text-blue-100/90"
                    >
                      <CheckCircle2 size={15} className="text-amber-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Col: Transparent Terms & Conditions */}
              <div className="rounded-2xl p-6 bg-[#070F1E]/90 border border-amber-500/20 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-base font-bold text-amber-400 mb-3 flex items-center gap-2">
                    <HelpCircle size={16} />
                    <span>Clear Scope & Terms</span>
                  </h3>
                  <ul className="space-y-2.5 text-xs text-blue-200/75 leading-relaxed">
                    {SUPPORT_TERMS.map((term, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold shrink-0">•</span>
                        <span>{term}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-blue-900/40 text-[11px] text-blue-300/60 leading-normal">
                  Dedicated assistance during business hours: <br />
                  <strong className="text-white">Mon – Sat | 9:30 AM – 7:00 PM IST</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 6. CALL TO ACTION (START YOUR ENGAGEMENT)                          */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative z-10 py-16 sm:py-24 container-site text-center">
        <div className="rounded-3xl border border-blue-900/60 bg-gradient-to-r from-[#0B152B] via-[#070F1E] to-[#0B152B] p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-96 rounded-full bg-amber-500/10 blur-[120px]" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
              <span>GET STARTED TODAY</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Ready to engineer your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-200">
                next breakthrough?
              </span>
            </h2>
            <p className="mt-4 text-blue-100/80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Partner with an engineering team that guarantees on-time delivery, modern security, and 6 months of included post-launch support.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 px-8 py-3.5 font-extrabold text-black text-sm shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>Book a Demo</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/portfolio"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#0B152B] hover:bg-[#070F1E] border border-blue-900/60 hover:border-amber-500/50 px-8 py-3.5 font-bold text-white text-sm transition-all cursor-pointer"
              >
                <span>Explore Our Portfolio</span>
              </Link>
            </div>

            {/* Quick Contact Links */}
            <div className="mt-8 pt-6 border-t border-blue-900/40 flex flex-wrap items-center justify-center gap-6 text-xs text-blue-200/70">
              <a
                href="tel:+919172403714"
                className="inline-flex items-center gap-2 hover:text-amber-400 transition-colors"
              >
                <Phone size={14} className="text-amber-400" />
                <span>+91 91724 03714</span>
              </a>
              <span className="text-blue-900">•</span>
              <a
                href="mailto:support@sosyncaitech.in"
                className="inline-flex items-center gap-2 hover:text-amber-400 transition-colors"
              >
                <Mail size={14} className="text-amber-400" />
                <span>support@sosyncaitech.in</span>
              </a>
              <span className="text-blue-900">•</span>
              <span>Kharadi, Pune HQ</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
