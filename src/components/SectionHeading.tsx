import { Reveal } from "@/components/Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  /** "light" renders white text for dark/gradient sections. */
  tone?: "dark" | "light";
  align?: "center" | "left";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "dark",
  align = "center",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      <span
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest ${
          tone === "light"
            ? "border-white/25 bg-white/10 text-sky"
            : "border-brand/25 bg-secondary text-brand"
        }`}
      >
        {eyebrow}
      </span>
      <h2
        className={`mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem] ${
          tone === "light" ? "text-white" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            tone === "light" ? "text-slate-300" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
