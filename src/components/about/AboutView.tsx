"use client";

import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Target,
  Eye,
  Heart,
  Phone,
  Mail,
  MapPin,
  Building,
} from "lucide-react";

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

const MARKETING_SPECIALISTS = [
  {
    name: "Vivek Dhumal",
    role: "Digital Marketing Expert",
    img: "/vivek-dhumal.jpeg",
    bio: "Expert in performance marketing, SEO strategy, campaign scaling, and brand growth.",
  },
];

const FULLSTACK_DEVS = [
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

export function AboutView() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* ------------------------------------------------------------------ */}
      {/* 0. FIXED PAGE BACKGROUND IMAGE (CLEAN TECH ATMOSPHERE)             */}
      {/* ------------------------------------------------------------------ */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/about-story-slide-1.jpg"
          alt="SOSync AI Tech Engineering Atmosphere"
          className="size-full object-cover object-center opacity-45 brightness-90 saturate-125"
        />
        {/* Clean Balanced Gradient Overlay for Readability & High Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/75 via-[#030712]/55 to-[#030712]/95" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#030712]/40 to-[#030712]/85" />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 1. PAGE HERO HEADER FOR ABOUT PAGE (ENLARGED & BRAND-SAFE)         */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative z-10 pt-8 sm:pt-12 pb-14 sm:pb-20 text-center container-site">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider shadow-sm mb-5">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>OUR STORY</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
          A modern technology team for{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-200">
            growing your business
          </span>
        </h1>
        <p className="mt-6 text-blue-100/90 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
          <span className="font-extrabold text-amber-400">SOSync AI Tech</span> is a dedicated software development company in{" "}
          <span className="font-extrabold text-cyan-400 underline decoration-cyan-500/40 underline-offset-4">Pune</span>. Today, we are an active team of 8+ developers, designers, and marketing experts partnering with businesses to build fast websites, custom software, and digital solutions.
        </p>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. MISSION, VISION & VALUES SECTION (CORE FOUNDATION)              */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative z-10 bg-gradient-to-b from-[#030712]/90 via-[#0B152B]/60 to-[#030712]/90 py-16 sm:py-24 border-b border-blue-900/40 overflow-hidden backdrop-blur-xs">
        {/* Ambient Stage & Navy Lighting */}
        <div className="pointer-events-none absolute top-1/3 left-10 size-[500px] rounded-full bg-amber-500/10 blur-[150px] -z-10" />
        <div className="pointer-events-none absolute bottom-10 right-10 size-[450px] rounded-full bg-blue-600/15 blur-[140px] -z-10" />

        <div className="container-site">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-black uppercase tracking-widest text-amber-400 mb-3 shadow-xs">
              <Sparkles size={13} className="text-amber-400 animate-pulse" />
              <span>CORE FOUNDATIONS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Driven by purpose, guided by{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-200">
                clear values
              </span>
            </h2>
          </div>

          {/* 3 Pillars: Mission, Vision, Values in Premium Dark Glass Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* 1. Mission */}
            <div className="group relative rounded-3xl p-7 sm:p-9 bg-[#0B152B]/80 border border-blue-900/60 shadow-2xl transition-all duration-300 hover:border-amber-500/60 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(245,158,11,0.15)] flex flex-col justify-between">
              <div>
                <div className="size-14 sm:size-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 grid place-items-center text-black shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform duration-300">
                  <Target size={28} className="stroke-[2.2]" />
                </div>
                <h3 className="mt-6 text-xl sm:text-2xl font-black text-white font-display tracking-tight">
                  Mission
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-blue-100/80">
                  Help growing businesses build and launch easy-to-use software, websites, and marketing campaigns that customers love.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-blue-900/40 flex items-center text-xs font-bold text-amber-400/90 group-hover:text-amber-300">
                <span>Real-world Impact</span>
                <ArrowRight size={14} className="ml-1.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            {/* 2. Vision */}
            <div className="group relative rounded-3xl p-7 sm:p-9 bg-[#0B152B]/80 border border-blue-900/60 shadow-2xl transition-all duration-300 hover:border-amber-500/60 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(245,158,11,0.15)] flex flex-col justify-between">
              <div>
                <div className="size-14 sm:size-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 grid place-items-center text-black shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform duration-300">
                  <Eye size={28} className="stroke-[2.2]" />
                </div>
                <h3 className="mt-6 text-xl sm:text-2xl font-black text-white font-display tracking-tight">
                  Vision
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-blue-100/80">
                  To be the most trusted technology and software development partner for modern businesses across all industries.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-blue-900/40 flex items-center text-xs font-bold text-amber-400/90 group-hover:text-amber-300">
                <span>Future-Ready Scale</span>
                <ArrowRight size={14} className="ml-1.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            {/* 3. Values */}
            <div className="group relative rounded-3xl p-7 sm:p-9 bg-[#0B152B]/80 border border-blue-900/60 shadow-2xl transition-all duration-300 hover:border-amber-500/60 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(245,158,11,0.15)] flex flex-col justify-between">
              <div>
                <div className="size-14 sm:size-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 grid place-items-center text-black shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform duration-300">
                  <Heart size={28} className="stroke-[2.2]" />
                </div>
                <h3 className="mt-6 text-xl sm:text-2xl font-black text-white font-display tracking-tight">
                  Values
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-blue-100/80">
                  Quality, honesty, hard work, and genuine care. We build every project with clear communication and real dedication.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-blue-900/40 flex items-center text-xs font-bold text-amber-400/90 group-hover:text-amber-300">
                <span>Client Commitment</span>
                <ArrowRight size={14} className="ml-1.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. SENIOR LEADERSHIP SECTION (IMAGE 1)                             */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative z-10 py-16 sm:py-24 border-b border-blue-900/40 overflow-hidden">
        {/* Ambient Backlight Aura */}
        <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 size-[500px] rounded-full bg-amber-500/10 blur-[160px] -z-10" />

        <div className="container-site">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-amber-400 mb-4 shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>TEAM</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              The senior people{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-200">
                behind every project
              </span>
            </h2>
          </div>

          {/* Leadership Cards Grid (3 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {LEADERSHIP.map((lead) => (
              <div
                key={lead.name}
                className="group relative rounded-3xl overflow-hidden border border-blue-900/60 bg-[#0B152B]/85 shadow-2xl transition-all duration-300 hover:border-amber-500/60 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(245,158,11,0.2)] flex flex-col"
              >
                {/* Photo Frame */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#070F1E]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={lead.img}
                    alt={lead.name}
                    className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B152B] via-transparent to-transparent opacity-80" />
                </div>

                {/* Card Content */}
                <div className="p-6 pt-3 space-y-1">
                  <h3 className="font-display text-xl sm:text-2xl font-black text-white tracking-tight group-hover:text-amber-300 transition-colors">
                    {lead.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-amber-400">
                    {lead.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. CREATIVE MARKETING SPECIALISTS (IMAGE 2)                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative z-10 bg-gradient-to-b from-[#030712]/90 via-[#0B152B]/60 to-[#030712]/90 py-16 sm:py-24 border-b border-blue-900/40 overflow-hidden backdrop-blur-xs">
        {/* Ambient Backlight Aura */}
        <div className="pointer-events-none absolute top-1/2 right-1/4 -translate-y-1/2 size-[450px] rounded-full bg-blue-600/15 blur-[150px] -z-10" />

        <div className="container-site">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-amber-400 mb-4 shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>DIGITAL MARKETING AND MULTIMEDIA</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Our creative{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-200">
                Marketing Specialists
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
              Driving strategic growth, high-converting ad campaigns, and multimedia brand presence.
            </p>
          </div>

          {/* Marketing Specialists Grid */}
          <div className="flex justify-center">
            <div className="w-full max-w-sm">
              {MARKETING_SPECIALISTS.map((member) => (
                <div
                  key={member.name}
                  className="group relative rounded-3xl overflow-hidden border border-blue-900/60 bg-[#0B152B]/85 shadow-2xl transition-all duration-300 hover:border-amber-500/60 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(245,158,11,0.2)] flex flex-col"
                >
                  {/* Photo Frame */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#070F1E]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.img}
                      alt={member.name}
                      className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B152B] via-transparent to-transparent opacity-80" />
                  </div>

                  {/* Card Content */}
                  <div className="p-6 pt-3 space-y-2">
                    <h3 className="font-display text-xl sm:text-2xl font-black text-white tracking-tight group-hover:text-amber-300 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-amber-400">
                      {member.role}
                    </p>
                    <p className="text-xs sm:text-sm text-blue-100/75 leading-relaxed pt-1">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. EXPERT FULL STACK TEAM (IMAGES 3 & 4)                           */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative z-10 py-16 sm:py-24 border-b border-blue-900/40 overflow-hidden">
        {/* Ambient Backlight Orbs */}
        <div className="pointer-events-none absolute top-1/3 left-10 size-[500px] rounded-full bg-amber-500/10 blur-[160px] -z-10" />
        <div className="pointer-events-none absolute bottom-1/3 right-10 size-[500px] rounded-full bg-blue-600/15 blur-[160px] -z-10" />

        <div className="container-site">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-amber-400 mb-4 shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>DEVELOPMENT SQUAD</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Our expert{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-200">
                Full Stack Team
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
              A diverse group of specialists working together to deliver world-class digital solutions across all technology stacks.
            </p>
          </div>

          {/* Full Stack Team Grid (Responsive: 1 -> 2 -> 3 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {FULLSTACK_DEVS.map((dev) => (
              <div
                key={dev.name}
                className="group relative rounded-3xl overflow-hidden border border-blue-900/60 bg-[#0B152B]/85 shadow-2xl transition-all duration-300 hover:border-amber-500/60 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(245,158,11,0.2)] flex flex-col"
              >
                {/* Photo Frame */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#070F1E]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={dev.img}
                    alt={dev.name}
                    className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B152B] via-transparent to-transparent opacity-80" />
                </div>

                {/* Card Content */}
                <div className="p-6 pt-3 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-black text-white tracking-tight group-hover:text-amber-300 transition-colors">
                      {dev.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-amber-400">
                      {dev.role}
                    </p>
                    <p className="text-xs sm:text-sm text-blue-100/75 leading-relaxed pt-1">
                      {dev.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 6. MODERN WORKSPACE TOUR (IMAGE 5)                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative z-10 bg-gradient-to-b from-[#030712]/90 via-[#0B152B]/60 to-[#030712]/90 py-16 sm:py-24 border-b border-blue-900/40 overflow-hidden backdrop-blur-xs">
        {/* Ambient Backlight Aura */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[650px] rounded-full bg-amber-500/10 blur-[170px] -z-10" />

        <div className="container-site">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-amber-400 mb-4 shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>COMPANY SHOWCASE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Take a tour of our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-200">
                Modern Workspace
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
              Explore our high-performance infrastructure, executive boardrooms, dedicated software development cabins, and welcoming reception hub.
            </p>
          </div>

          {/* Workspace Grid (Top row 3, Bottom row 2 centered) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {WORKSPACE.map((space) => (
              <div
                key={space.title}
                className="group relative rounded-3xl overflow-hidden border border-blue-900/60 bg-[#0B152B]/85 shadow-2xl transition-all duration-300 hover:border-amber-500/60 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(245,158,11,0.2)] flex flex-col"
              >
                {/* Photo Frame */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#070F1E]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={space.img}
                    alt={space.title}
                    className="size-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  {/* Category Pill Tag Overlay */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0B152B]/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/30 shadow-md">
                      <Building size={12} className="text-amber-400" />
                      <span>{space.tag}</span>
                    </span>
                  </div>

                  {/* Title & Subtitle in Photo Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <h3 className="font-display text-lg sm:text-xl font-black text-white group-hover:text-amber-300 transition-colors">
                      {space.title}
                    </h3>
                    <p className="text-xs text-blue-200/80 font-medium mt-0.5">
                      {space.sub}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 7. SOSYNC DIRECT CHANNELS & GET IN TOUCH                           */}
      {/* ------------------------------------------------------------------ */}
      <section id="contact" className="relative z-10 isolate bg-[#030712]/90 backdrop-blur-xs py-16 sm:py-20 border-t border-blue-900/40 overflow-hidden">
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-amber-500/10 blur-[170px] -z-10" />

        <div className="container-site">
          <div className="rounded-3xl border border-blue-900/60 bg-[#0B152B]/90 p-6 sm:p-10 backdrop-blur-md relative overflow-hidden shadow-2xl max-w-5xl mx-auto">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-blue-900/50">
              <div className="flex items-center gap-3.5">
                <div className="size-11 sm:size-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
                  <Phone size={22} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">[CONTACT]</span>
                  <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight">
                    Direct Channels &amp; Office
                  </h3>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 self-start sm:self-auto">
                Kharadi, Pune
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone Primary */}
              <a
                href="tel:+919172403714"
                className="p-5 rounded-2xl bg-[#070F1E]/80 border border-blue-900/50 hover:border-amber-500/50 hover:bg-[#070F1E] transition-all flex items-center justify-between group shadow-sm"
              >
                <div className="space-y-1">
                  <p className="text-[11px] font-black uppercase tracking-widest text-blue-200/70">PRIMARY CALL</p>
                  <p className="text-base sm:text-lg font-extrabold text-white group-hover:text-amber-400 transition-colors">
                    +91 91724 03714
                  </p>
                </div>
                <div className="size-9 rounded-full bg-amber-500/10 group-hover:bg-amber-500 text-amber-400 group-hover:text-black flex items-center justify-center transition-all shrink-0">
                  <Phone size={16} />
                </div>
              </a>

              {/* Phone Secondary */}
              <a
                href="tel:+917004330655"
                className="p-5 rounded-2xl bg-[#070F1E]/80 border border-blue-900/50 hover:border-amber-500/50 hover:bg-[#070F1E] transition-all flex items-center justify-between group shadow-sm"
              >
                <div className="space-y-1">
                  <p className="text-[11px] font-black uppercase tracking-widest text-blue-200/70">SECONDARY CALL</p>
                  <p className="text-base sm:text-lg font-extrabold text-white group-hover:text-amber-400 transition-colors">
                    +91 70043 30655
                  </p>
                </div>
                <div className="size-9 rounded-full bg-amber-500/10 group-hover:bg-amber-500 text-amber-400 group-hover:text-black flex items-center justify-center transition-all shrink-0">
                  <Phone size={16} />
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:support@sosyncaitech.in"
                className="p-5 rounded-2xl bg-[#070F1E]/80 border border-blue-900/50 hover:border-amber-500/50 hover:bg-[#070F1E] transition-all flex items-center justify-between group shadow-sm"
              >
                <div className="space-y-1 truncate pr-2">
                  <p className="text-[11px] font-black uppercase tracking-widest text-blue-200/70">EMAIL INQUIRIES</p>
                  <p className="text-sm sm:text-base font-extrabold text-white group-hover:text-amber-400 transition-colors truncate">
                    support@sosyncaitech.in
                  </p>
                </div>
                <div className="size-9 rounded-full bg-amber-500/10 group-hover:bg-amber-500 text-amber-400 group-hover:text-black flex items-center justify-center transition-all shrink-0">
                  <Mail size={16} />
                </div>
              </a>

              {/* Office Location */}
              <div className="p-5 rounded-2xl bg-[#070F1E]/80 border border-blue-900/50 flex items-center justify-between shadow-sm">
                <div className="space-y-1 truncate pr-2">
                  <p className="text-[11px] font-black uppercase tracking-widest text-blue-200/70">HEADQUARTERS</p>
                  <p className="text-xs sm:text-sm font-semibold text-white truncate">
                    Rushub Bliz Bay, Sprint Workspace, Kharadi, Pune
                  </p>
                </div>
                <div className="size-9 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                  <MapPin size={16} />
                </div>
              </div>
            </div>

            {/* CTA action bottom */}
            <div className="mt-8 pt-6 border-t border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs sm:text-sm text-blue-200/80 text-center sm:text-left">
                Ready to build custom websites, applications or scaling your marketing?
              </p>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href="tel:+919172403714"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-600 via-[#FF6B00] to-orange-500 px-6 py-2.5 text-xs sm:text-sm font-extrabold text-black shadow-lg shadow-orange-500/35 hover:shadow-orange-500/50 transition-all hover:scale-105"
                >
                  <Phone size={14} />
                  <span>Call Us Directly</span>
                </a>
                <Link
                  href="/portfolio"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-blue-900/60 bg-[#070F1E] hover:bg-[#0E1A34] px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition-all hover:border-orange-500/60"
                >
                  <span>Our Work</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
