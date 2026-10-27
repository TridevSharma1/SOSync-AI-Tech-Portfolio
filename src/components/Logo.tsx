interface LogoProps {
  /** "dark" for light backgrounds, "light" for dark hero / navbar / footer. */
  tone?: "dark" | "light";
  name?: string;
  compact?: boolean;
}

/**
 * Official SOSync Ai Tech Brand Logo.
 * Uses the isometric AI chip cube mark with responsive contrast and matching typographic lockup.
 */
export function Logo({ tone = "light", name: _name, compact }: LogoProps) {
  const isLight = tone === "light";
  const markSrc = isLight ? "/images/logo-mark-white.png" : "/images/logo-mark.png";

  return (
    <span className="flex items-center gap-3">
      <img
        src={markSrc}
        alt="SOSync Ai Tech"
        width={42}
        height={42}
        className="size-9 object-contain shrink-0"
      />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-display text-[1.12rem] font-bold tracking-tight ${
              isLight ? "text-white" : "text-foreground"
            }`}
          >
            S<span className="text-brand">O</span>Sync
          </span>
          <span className="mt-1 flex items-center gap-1.5 text-[0.58rem] font-bold uppercase tracking-[0.22em] text-brand">
            <span className="h-[1.5px] w-2.5 bg-brand inline-block rounded-full" />
            <span className={isLight ? "text-slate-300" : "text-muted-foreground"}>
              AI TECH
            </span>
            <span className="h-[1.5px] w-2.5 bg-brand inline-block rounded-full" />
          </span>
        </span>
      )}
    </span>
  );
}
