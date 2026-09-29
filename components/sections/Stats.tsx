"use client";

import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import { profile } from "@/content/profile";
import Reveal from "../ui/Reveal";

function Counter({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // Writes straight to the DOM so the count-up doesn't re-render React every frame.
  useEffect(() => {
    const el = ref.current;
    if (!inView || !el) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      el.textContent = (to * (1 - Math.pow(1 - p, 4))).toFixed(decimals);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, decimals]);

  // Server-render the final value so crawlers and no-JS readers see real numbers.
  return <span ref={ref}>{to.toFixed(decimals)}</span>;
}

export default function Stats() {
  return (
    <section aria-label="Impact" className="relative mx-auto max-w-6xl px-4 py-20 md:px-6">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-5">
        {profile.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06} className={`bg-bg p-6 md:p-8 ${i === 0 ? "col-span-2 md:col-span-1" : ""}`}>
            <div className="text-4xl font-semibold tracking-tight md:text-5xl">
              <Counter to={s.value} decimals={"decimals" in s ? s.decimals : 0} />
              <span className="text-accent">{s.suffix}</span>
            </div>
            <p className="mt-2 text-sm text-muted">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
