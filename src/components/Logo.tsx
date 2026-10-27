interface LogoProps {
  /** "dark" for light backgrounds, "light" for the navy navbar/hero. */
  tone?: "dark" | "light";
  name: string;
  compact?: boolean;
}

/** Inline SVG brand mark: two synchronised "S" waves — no image assets needed. */
export function Logo({ tone = "light", name, compact }: LogoProps) {
  const primary = tone === "light" ? "#38BDF8" : "#2563EB";
  const secondary = "#06B6D4";
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 40 40" className="size-9 shrink-0" aria-hidden="true">
        <defs>
          <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={primary} />
            <stop offset="100%" stopColor={secondary} />
          </linearGradient>
        </defs>
        <rect x="1.5" y="1.5" width="37" height="37" rx="11" fill="url(#logo-g)" opacity={tone === "light" ? 0.16 : 1} />
        <rect x="1.5" y="1.5" width="37" height="37" rx="11" fill="none" stroke={primary} strokeOpacity={tone === "light" ? 0.6 : 0.45} />
        <path
          d="M10 15.5c3.5-4.5 8.5-4.5 11 0s7.5 4.5 9 0"
          fill="none"
          stroke="url(#logo-g)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M10 24.5c3.5-4.5 8.5-4.5 11 0s7.5 4.5 9 0"
          fill="none"
          stroke="url(#logo-g)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-display text-[1.05rem] font-bold tracking-tight ${
              tone === "light" ? "text-white" : "text-foreground"
            }`}
          >
            SOSync
          </span>
          <span
            className={`mt-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.18em] ${
              tone === "light" ? "text-sky" : "text-brand"
            }`}
          >
            {name.replace(/^SOSync\s*/i, "")}
          </span>
        </span>
      )}
    </span>
  );
}
