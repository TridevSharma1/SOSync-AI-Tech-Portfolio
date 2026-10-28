import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Our Story | SOSync Ai Tech IT Solution",
  description:
    "SOSync AI Tech is a dedicated software development company in Pune. Active team of 8+ developers, designers, and marketing experts.",
  openGraph: {
    title: "Our Story | SOSync Ai Tech IT Solution",
    description: "A modern technology team for growing your business — SOSync AI Tech.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const LEADERSHIP = [
  {
    name: "Shashant Shekhar",
    role: "Founder & Project Manager",
    img: "/shashant-shekhar.jpeg",
  },
  {
    name: "Omkar Bachanatti",
    role: "Founder & Operation Head",
    img: "/omkar-bachanatti.png",
  },
  {
    name: "Sanika Chougule",
    role: "Founder & HR",
    img: "/sanika-chougule.jpeg",
  },
];

const DEVS = [
  {
    name: "Tridev Sharma",
    role: "Full Stack Developer",
    img: "/tridev-sharma.png",
    bio: "Expert in React, Node.js, and modern web technologies.",
  },
  {
    name: "Sharik Ahmed",
    role: "Full Stack Developer",
    img: "/sharik-ahmed.png",
    bio: "Specialist in backend systems and scalable architecture.",
  },
  {
    name: "Vicky Kumar",
    role: "Full Stack Developer",
    img: "/vicky-kumar.png",
    bio: "Proficient in frontend technologies and UI development.",
  },
  {
    name: "Ashish Ranjan",
    role: "Full Stack Developer",
    img: "/ashish-ranjan.png",
    bio: "Experienced in full-stack development and cloud infrastructure.",
  },
  {
    name: "Anurag Kumar",
    role: "Full Stack Developer",
    img: "/anurag-kumar.png",
    bio: "Brings strong development skills and a collaborative approach to building reliable digital products.",
  },
];

const WORKSPACE = [
  {
    title: "Front Building",
    sub: "Main Corporate HQ",
    tag: "Exterior",
    img: "/company/front_building.png",
  },
  {
    title: "Reception Area",
    sub: "Welcoming & Guest Lounge",
    tag: "Interior",
    img: "/company/Reception.jpg",
  },
  {
    title: "Board Room",
    sub: "Executive & Strategic Meetings",
    tag: "Conference",
    img: "/company/Board_Room.jpg",
  },
  {
    title: "Executive Office",
    sub: "Leadership & Executive Suite",
    tag: "Office",
    img: "/company/Boss_Cabin.jpg",
  },
  {
    title: "Development Cabins",
    sub: "Focused Engineering & Tech Hub",
    tag: "Workspace",
    img: "/company/company_cabins.jpg",
  },
];

const ACHIEVEMENTS = [
  "50+ Happy Customers Worldwide",
  "50+ Successfully Delivered Projects",
  "Professional Team of 8+ Developers & Designers",
  "On-Time Project Delivery",
  "Affordable Pricing with Premium Quality",
  "Transparent Communication Throughout the Project",
  "Long-Term Technical Support & Maintenance",
  "Customized Solutions Based on Business Requirements",
  "Secure, Scalable & User-Friendly Development",
  "Dedicated Project Management",
];

const PROCESS_STEPS = [
  {
    step: "Step 1: Requirement Analysis",
    desc: "We start by understanding your business goals, target audience, and project requirements through detailed discussions and consultations.",
  },
  {
    step: "Step 2: Project Planning",
    desc: "Our experts prepare a roadmap, define project scope, timeline, technologies, and estimated delivery schedule.",
  },
  {
    step: "Step 3: UI/UX Design",
    desc: "We create modern, user-friendly, and responsive designs that match your brand identity and business objectives.",
  },
  {
    step: "Step 4: Development Phase",
    desc: "Our development team builds the project using industry-standard technologies while ensuring performance, security, and scalability.",
  },
  {
    step: "Step 5: Testing & Quality Assurance",
    desc: "Before delivery, the project undergoes extensive testing to identify and fix bugs, performance issues, and security concerns.",
  },
  {
    step: "Step 6: Client Review & Feedback",
    desc: "A complete demonstration is provided to the client. Feedback and minor revisions are implemented to ensure satisfaction.",
  },
  {
    step: "Step 7: Project Deployment",
    desc: "The final project is deployed to the live server with proper configuration, optimization, and security setup.",
  },
  {
    step: "Step 8: Training & Handover",
    desc: "We provide guidance on using the system, admin panel training, and all necessary project credentials and documentation.",
  },
  {
    step: "Step 9: Free Support Period",
    desc: "After successful delivery, every project includes 6 Months FREE Technical Support for existing features and functionalities.",
  },
];

const DIFFERENTIATORS = [
  "Dedicated Support Team",
  "Business-Oriented Development Approach",
  "Focus on Performance & Security",
  "Fast Response Time",
  "Transparent Pricing Structure",
  "Client-Centric Communication",
  "Scalable Solutions for Future Growth",
  "Continuous Improvement Recommendations",
  "Reliable Post-Launch Support",
  "Long-Term Technology Partner for Your Business",
];

const FREE_SUPPORT_ITEMS = [
  "Bug fixing for existing features and functionalities",
  "Technical support during business hours (Monday to Saturday | 9:30 AM – 7:00 PM)",
  "Server-related issue assistance and troubleshooting",
  "Database error resolution",
  "Website downtime investigation and recovery assistance",
  "Performance monitoring and minor optimizations",
  "Security patch implementation (if required)",
  "User access and permission-related support",
  "Email and WhatsApp support",
  "Basic operational guidance and assistance",
  "Error log monitoring and issue diagnosis",
  "Minor configuration changes",
  "Backup restoration assistance (if backups are available)",
  "Technical consultation regarding existing features",
];

export default function OurStoryPage() {
  return (
    <>
      <Navbar lightTop />
      <main className="flex-1 pt-16 sm:pt-20">
        {/* Story Intro */}
        <section className="container-px mx-auto max-w-4xl py-12 sm:py-16 text-center">
          <div className="text-center mx-auto max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Our story
            </div>
            <h2 className="text-3xl font-bold leading-[1.1] text-foreground sm:text-4xl lg:text-5xl">
              A modern technology team for{" "}
              <span className="text-gradient-brand">growing your business</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              SOSync AI Tech is a dedicated software development company in Pune. Today, we are an active team of 8+ developers, designers, and marketing experts partnering with businesses to build fast websites, custom software, and digital solutions.
            </p>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="container-px mx-auto max-w-7xl py-10 sm:py-16">
          <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
            <div className="glass-card rounded-3xl p-6 sm:p-8 hover-lift">
              <div className="grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-2xl bg-gradient-brand text-primary-foreground">
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
                  className="lucide lucide-target h-6 w-6 sm:h-7 sm:w-7"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <h3 className="mt-5 sm:mt-6 text-lg sm:text-xl font-semibold text-foreground">Mission</h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                Help growing businesses build and launch easy-to-use software, websites, and marketing campaigns that customers love.
              </p>
            </div>

            <div className="glass-card rounded-3xl p-6 sm:p-8 hover-lift">
              <div className="grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-2xl bg-gradient-brand text-primary-foreground">
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
                  className="lucide lucide-eye h-6 w-6 sm:h-7 sm:w-7"
                  aria-hidden="true"
                >
                  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3 className="mt-5 sm:mt-6 text-lg sm:text-xl font-semibold text-foreground">Vision</h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                To be the most trusted technology and software development partner for modern businesses across all industries.
              </p>
            </div>

            <div className="glass-card rounded-3xl p-6 sm:p-8 hover-lift">
              <div className="grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-2xl bg-gradient-brand text-primary-foreground">
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
                  className="lucide lucide-heart h-6 w-6 sm:h-7 sm:w-7"
                  aria-hidden="true"
                >
                  <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                </svg>
              </div>
              <h3 className="mt-5 sm:mt-6 text-lg sm:text-xl font-semibold text-foreground">Values</h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                Quality, honesty, hard work, and genuine care. We build every project with clear communication and real dedication.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="container-px mx-auto max-w-7xl py-12 sm:py-16">
          {/* Senior Leadership */}
          <div className="text-center mx-auto max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Team
            </div>
            <h2 className="text-3xl font-bold leading-[1.1] text-foreground sm:text-4xl lg:text-5xl">
              The senior people <span className="text-gradient-brand">behind every project</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {LEADERSHIP.map((lead) => (
              <div
                key={lead.name}
                className="group overflow-hidden rounded-3xl border border-border bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                  <img
                    alt={lead.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={lead.img}
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-foreground">{lead.name}</h4>
                  <p className="text-sm font-semibold text-primary">{lead.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Marketing Specialists */}
          <div className="mt-16 pt-12 border-t border-border/60">
            <div className="text-center mx-auto max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Digital marketing and Multimedia
              </div>
              <h2 className="text-3xl font-bold leading-[1.1] text-foreground sm:text-4xl lg:text-5xl">
                Our creative <span className="text-gradient-brand">Marketing Specialists</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Driving strategic growth, high-converting ad campaigns, and multimedia brand presence.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="group overflow-hidden rounded-3xl border border-border bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant">
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                  <img
                    alt="Vivek Dhumal"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src="/vivek-dhumal.jpeg"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-foreground">Vivek Dhumal</h4>
                  <p className="text-sm font-semibold text-primary">Digital Marketing Expert</p>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    Expert in performance marketing, SEO strategy, campaign scaling, and brand growth.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Development Squad */}
          <div className="mt-16 pt-12 border-t border-border/60">
            <div className="text-center mx-auto max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Development Squad
              </div>
              <h2 className="text-3xl font-bold leading-[1.1] text-foreground sm:text-4xl lg:text-5xl">
                Our expert <span className="text-gradient-brand">Full Stack Team</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                A diverse group of specialists working together to deliver world-class digital solutions across all technology stacks.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {DEVS.map((dev) => (
                <div
                  key={dev.name}
                  className="group overflow-hidden rounded-3xl border border-border bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                    <img
                      alt={dev.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      src={dev.img}
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-foreground">{dev.name}</h4>
                    <p className="text-sm font-semibold text-primary">{dev.role}</p>
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{dev.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Showcase / Workspace Tour */}
        <section className="bg-surface py-12 sm:py-16 relative overflow-hidden">
          <div className="absolute top-1/2 -left-32 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

          <div className="container-px mx-auto max-w-7xl relative z-10">
            <div className="text-center mx-auto max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Company Showcase
              </div>
              <h2 className="text-3xl font-bold leading-[1.1] text-foreground sm:text-4xl lg:text-5xl">
                Take a tour of our <span className="text-gradient-brand">Modern Workspace</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Explore our high-performance infrastructure, executive boardrooms, dedicated software development cabins, and welcoming reception hub.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {WORKSPACE.map((ws) => (
                <div
                  key={ws.title}
                  className="group relative cursor-pointer overflow-hidden rounded-3xl border border-border bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-elegant"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <img
                      alt={ws.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                      src={ws.img}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose SOSync AI Tech? */}
        <section className="bg-surface-soft py-12 sm:py-16">
          <div className="container-px mx-auto max-w-7xl">
            <div className="text-left max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Why choose us
              </div>
              <h2 className="text-3xl font-bold leading-[1.1] text-foreground sm:text-4xl lg:text-5xl">
                Why choose <span className="text-gradient-brand">SOSync AI Tech?</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                At SOSync AI Tech, we don&apos;t just build websites and software—we build long-term business partnerships. Our goal is to deliver high-quality digital solutions that help businesses grow, improve efficiency, and achieve measurable results.
              </p>
            </div>

            <div className="mt-10 sm:mt-12 grid gap-8 sm:gap-10 lg:grid-cols-2">
              {/* Left Column: Achievements & Process */}
              <div className="space-y-6 sm:space-y-8">
                {/* Achievements */}
                <div className="rounded-3xl border border-border bg-white p-5 sm:p-8 shadow-card">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">Our Achievements</h3>
                  <div className="mt-5 sm:mt-6 grid gap-2.5 sm:gap-3 sm:grid-cols-2">
                    {ACHIEVEMENTS.map((ach) => (
                      <div
                        key={ach}
                        className="flex items-start gap-2.5 sm:gap-3 rounded-2xl border border-border/70 bg-surface px-3.5 py-2.5 sm:px-4 sm:py-3"
                      >
                        <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-xs">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-check h-2.5 w-2.5"
                            aria-hidden="true"
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        </div>
                        <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">{ach}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Development Process */}
                <div className="rounded-3xl border border-border bg-white p-5 sm:p-8 shadow-card">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                    Our Development Process
                  </h3>
                  <div className="mt-5 sm:mt-6 space-y-3 sm:space-y-4">
                    {PROCESS_STEPS.map((ps) => (
                      <div
                        key={ps.step}
                        className="rounded-2xl border border-border/70 bg-surface p-4 sm:p-5 transition-all hover:border-primary/40"
                      >
                        <h4 className="text-xs sm:text-sm font-semibold text-foreground">{ps.step}</h4>
                        <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                          {ps.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Differentiators & 6 Months Support */}
              <div className="space-y-6 sm:space-y-8">
                {/* What Makes Us Different */}
                <div className="rounded-3xl border border-border bg-white p-5 sm:p-8 shadow-card">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">What Makes Us Different?</h3>
                  <div className="mt-5 sm:mt-6 grid gap-2.5 sm:gap-3 sm:grid-cols-2">
                    {DIFFERENTIATORS.map((diff) => (
                      <div
                        key={diff}
                        className="flex items-start gap-2.5 sm:gap-3 rounded-2xl border border-border/70 bg-surface px-3.5 py-2.5 sm:px-4 sm:py-3"
                      >
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
                          className="lucide lucide-circle-check mt-0.5 h-4 w-4 shrink-0 text-primary"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                        <span className="text-xs sm:text-sm leading-relaxed text-muted-foreground">{diff}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 sm:mt-6 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    From idea to deployment and beyond, SOSync AI Tech remains committed to delivering reliable, secure, and scalable digital solutions that help businesses succeed in the digital world.
                  </p>
                </div>

                {/* 6 Months Free Support Box */}
                <div className="relative overflow-hidden rounded-3xl border-2 border-primary/40 bg-gradient-to-br from-primary-soft via-white to-white p-5 sm:p-8 shadow-card ring-1 ring-primary/10">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-2xl" />
                  <div className="relative flex flex-wrap items-center justify-between gap-3 sm:gap-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-soft">
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
                        className="lucide lucide-gift h-3.5 w-3.5"
                        aria-hidden="true"
                      >
                        <path d="M12 7v14" />
                        <path d="M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" />
                        <path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5" />
                        <rect x="3" y="7" width="18" height="4" rx="1" />
                      </svg>
                      Included Free
                    </div>
                    <span className="rounded-full border border-primary/30 bg-white px-3 py-1 text-[0.7rem] font-semibold text-primary">
                      Worth ₹25,000+
                    </span>
                  </div>

                  <h3 className="relative mt-4 sm:mt-5 text-xl sm:text-2xl font-bold text-foreground">
                    6 Months <span className="text-gradient-brand">FREE Support</span>
                  </h3>
                  <p className="relative mt-1.5 sm:mt-2 text-xs sm:text-sm font-semibold text-primary">
                    Included with Every Project — No Hidden Charges
                  </p>
                  <p className="relative mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    After successful project delivery and client presentation, we provide 6 months of complimentary technical support to ensure your system operates smoothly and efficiently.
                  </p>

                  <div className="relative mt-5 sm:mt-6 grid gap-2 sm:gap-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground sm:grid-cols-2">
                    {FREE_SUPPORT_ITEMS.map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-[0.6rem] font-bold text-white">
                          ✔
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Terms & Conditions Box */}
                  <div className="relative mt-6 sm:mt-8 rounded-2xl border border-primary/20 bg-white/70 p-4 sm:p-5 backdrop-blur-sm">
                    <h4 className="flex items-center gap-2 text-sm sm:text-base font-semibold text-foreground">
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
                        className="lucide lucide-shield-check h-4 w-4 text-primary"
                        aria-hidden="true"
                      >
                        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                      Terms &amp; Conditions
                    </h4>
                    <ul className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 text-xs sm:text-sm leading-relaxed text-muted-foreground list-disc pl-4 sm:pl-5">
                      <li>Support is limited to delivered modules and existing functionalities.</li>
                      <li>New feature development and major enhancements are not included.</li>
                      <li>
                        Third-party service charges (hosting, domain, licenses, APIs, SMS gateways, payment gateways, etc.) are excluded.
                      </li>
                      <li>
                        Support requests are handled during business hours only (Monday to Saturday | 9:30 AM – 7:00 PM).
                      </li>
                      <li>
                        Issues caused by third-party modifications or unauthorized code changes may not be covered.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ready when you are CTA */}
        <section className="container-px mx-auto max-w-7xl py-10 sm:py-16">
          <div className="relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] border border-border bg-gradient-warm p-6 sm:p-14 lg:p-16 shadow-elegant">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />

            <div className="relative grid items-center gap-6 sm:gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur-md">
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
                    className="lucide lucide-sparkles h-3.5 w-3.5"
                    aria-hidden="true"
                  >
                    <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                    <path d="M20 2v4" />
                    <path d="M22 4h-4" />
                    <circle cx="4" cy="20" r="2" />
                  </svg>
                  Ready when you are
                </div>
                <h2 className="mt-4 text-2xl xs:text-3xl font-bold leading-[1.15] text-foreground sm:text-4xl lg:text-5xl">
                  Want to work <span className="text-gradient-brand">with us?</span>
                </h2>
                <p className="mt-3 sm:mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-lg">
                  We take on a limited number of new engagements each quarter. Let&apos;s see if we&apos;re a fit.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:shadow-elegant hover:-translate-y-0.5"
                >
                  Book a Demo
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
                    className="lucide lucide-arrow-right h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-6 py-3.5 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary text-center"
                >
                  Explore our work
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
