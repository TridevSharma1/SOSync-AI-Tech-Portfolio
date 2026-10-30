interface LogoProps {
  /** "dark" for light backgrounds, "light" for dark hero / navbar / footer / admin. */
  tone?: "dark" | "light";
  name?: string;
  compact?: boolean;
  className?: string;
}

/**
 * Official SOSync AI Tech Brand Logo.
 * Uses the exact provided logo image inside a tailored theme-matching frame:
 * - Crisp white backdrop with glowing amber perimeter border
 * - 100% exact original typography, colors, and cube mark
 */
export function Logo({
  tone = "light",
  name: _name,
  compact = false,
  className = "",
}: LogoProps) {
  const cacheKey = "v=sosync_exact_v1";

  if (compact) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-xl bg-white p-1.5 border border-amber-500/70 shadow-[0_0_12px_rgba(245,158,11,0.25)] transition-all duration-300 hover:border-amber-400 hover:shadow-[0_0_18px_rgba(245,158,11,0.4)] shrink-0 ${className}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/images/logo-mark-clean.png?${cacheKey}`}
          alt="SOSync AI Tech"
          width={32}
          height={32}
          className="size-7 sm:size-8 object-contain shrink-0 select-none"
        />
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center rounded-xl bg-white px-2.5 py-1 border border-amber-500/70 shadow-[0_0_12px_rgba(245,158,11,0.25)] transition-all duration-300 hover:border-amber-400 hover:shadow-[0_0_18px_rgba(245,158,11,0.4)] shrink-0 ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/images/SOSync-Logo-Exact-Padded.png?${cacheKey}`}
        alt="SOSync AI Tech"
        width={160}
        height={40}
        className="h-6 sm:h-7.5 w-auto object-contain shrink-0 select-none"
      />
    </span>
  );
}
