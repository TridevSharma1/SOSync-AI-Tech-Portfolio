import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { useSiteData } from "@/context/SiteDataContext";
import type { TeamMember } from "@/data/types";

function TeamCard({ member, delay }: { member: TeamMember; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="card-soft group h-full p-6 text-center">
        <div className="relative mx-auto w-fit">
          <span className="flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-brand to-cyan font-display text-2xl font-bold text-white shadow-glow">
            {member.initials}
          </span>
          <span
            className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-brand to-cyan opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-40"
            aria-hidden="true"
          />
        </div>
        <h3 className="mt-5 font-display text-lg font-bold text-foreground">{member.name}</h3>
        <p className="mt-1 text-sm font-medium text-brand">{member.position}</p>
        <div className="mt-4 flex justify-center gap-2.5">
          {(["linkedin", "twitter", "github"] as const).map((s) => (
            <a
              key={s}
              href={`https://www.${s}.com/`}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.name} on ${s}`}
              className="flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-cyan/60 hover:text-cyan"
            >
              <Icon name={s} filled className="size-3.5" />
            </a>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/** Team grid with initial avatars. */
export function TeamSection() {
  const { data } = useSiteData();
  return (
    <section id="team" className="section-pad bg-secondary/50">
      <div className="container-site">
        <SectionHeading
          eyebrow="Our Team"
          title="Senior engineers, designers and strategists"
          description="The people who will actually build your product — no bait-and-switch staffing."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.team.map((member, i) => (
            <TeamCard key={member.id} member={member} delay={(i % 4) * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
