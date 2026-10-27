import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { useSiteData } from "@/context/SiteDataContext";

const VALUES = [
  {
    icon: "sparkles",
    title: "Innovation First",
    description: "We prototype with the newest AI and cloud tooling so our clients stay ahead of their market.",
  },
  {
    icon: "shield",
    title: "Trust & Security",
    description: "Secure-by-default engineering, transparent communication and NDAs honoured without exception.",
  },
  {
    icon: "rocket",
    title: "Ownership",
    description: "Every project gets a dedicated senior lead who owns outcomes end to end — not just tickets.",
  },
] as const;

const MISSION_VISION = [
  {
    icon: "rocket",
    label: "Our Mission",
    text: "To make world-class AI, software and cloud engineering accessible to every ambitious business — delivered on time, on budget and beyond expectation.",
  },
  {
    icon: "eye",
    label: "Our Vision",
    text: "To be the technology partner Indian and global companies trust first when they decide to transform digitally.",
  },
] as const;

/** About section: office imagery, mission, vision and core values. */
export function AboutSection() {
  const { data } = useSiteData();
  const { company, stats } = data;
  const years = stats.find((s) => s.id === "s-years");

  return (
    <section id="about" className="section-pad relative overflow-hidden">
      <div className="dot-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="container-site relative grid items-center gap-14 lg:grid-cols-2">
        {/* Imagery */}
        <Reveal className="relative">
          <div className="overflow-hidden rounded-3xl shadow-lift">
            <img
              src="/images/about-office.jpg"
              alt="The SOSync office in Kharadi, Pune"
              width={1200}
              height={800}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          {years ? (
            <div className="card-soft absolute -bottom-6 -right-4 px-6 py-5 text-center sm:right-auto sm:-left-6">
              <p className="text-gradient-navy font-display text-4xl font-extrabold">{years.value}+</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Years of Excellence
              </p>
            </div>
          ) : null}
          <div className="glass animate-float absolute -top-6 right-6 hidden items-center gap-2 rounded-2xl px-4 py-3 sm:flex">
            <Icon name="pin" className="size-4 text-brand" />
            <span className="text-sm font-medium text-foreground">Kharadi, Pune</span>
          </div>
        </Reveal>

        {/* Copy */}
        <div>
          <SectionHeading
            align="left"
            eyebrow="About Us"
            title={`A technology partner built on ${company.shortName}'s promise — sync your business with the future`}
            description={`${company.name} is a full-stack IT solutions company headquartered in Kharadi, Pune. From startups to enterprises, we engineer digital products that are fast, secure and genuinely useful.`}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {MISSION_VISION.map((mv, i) => (
              <Reveal key={mv.label} delay={i * 100}>
                <div className="card-soft h-full p-5">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-brand">
                    <Icon name={mv.icon} className="size-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-foreground">{mv.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{mv.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={200 + i * 80}>
                <div className="card-soft h-full p-5">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-brand-deep">
                    <Icon name={v.icon} className="size-5" />
                  </span>
                  <h3 className="mt-4 font-display text-sm font-bold text-foreground">{v.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{v.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
