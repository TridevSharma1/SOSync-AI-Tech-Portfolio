import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  durationMs?: number;
  tone?: "dark" | "light";
}

/** Animated count-up number that triggers when scrolled into view. */
export function StatCounter({ value, suffix = "", label, durationMs = 1800, tone = "light" }: StatCounterProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      // Ease-out cubic for a satisfying settle.
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value, durationMs]);

  return (
    <div ref={ref} className="text-center">
      <div
        className={`font-display text-4xl font-extrabold tabular-nums sm:text-5xl ${
          tone === "light" ? "text-white" : "text-gradient-navy"
        }`}
      >
        {display}
        <span className={tone === "light" ? "text-cyan" : ""}>{suffix}</span>
      </div>
      <div
        className={`mt-2 text-sm font-medium uppercase tracking-wider ${
          tone === "light" ? "text-slate-300" : "text-muted-foreground"
        }`}
      >
        {label}
      </div>
    </div>
  );
}
