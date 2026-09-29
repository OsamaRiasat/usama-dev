"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Award, GraduationCap } from "lucide-react";
import clsx from "clsx";
import { skillGroups } from "@/content/skills";
import { projects } from "@/content/projects";
import { certificates, education } from "@/content/profile";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";

const normalise = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

function Spotlight({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
      }}
      className={clsx(
        "group relative overflow-hidden rounded-3xl border border-line bg-bg-elev p-6 transition-colors hover:border-line-strong",
        "before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
        "before:bg-[radial-gradient(400px_circle_at_var(--x)_var(--y),var(--accent-soft),transparent_60%)]",
        className,
      )}
    >
      <div className="relative">{children}</div>
    </div>
  );
}

export default function Skills() {
  const [hovered, setHovered] = useState<string | null>(null);
  const usedIn = hovered ? projects.filter((p) => p.stack.some((s) => normalise(s) === normalise(hovered))) : [];

  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 md:px-6 md:py-32">
      <SectionHeading index="04" eyebrow="Toolkit" title="The stack behind" accent="the work.">
        Hover a skill to see where I&apos;ve used it.
      </SectionHeading>

      <div className="grid gap-3 md:grid-cols-3">
        {skillGroups.map((g, i) => (
          <Reveal key={g.id} delay={i * 0.05} className={clsx(g.span === "wide" && "md:col-span-2", g.span === "tall" && "md:row-span-2")}>
            <Spotlight className="h-full">
              <p className="font-mono text-[11px] uppercase tracking-widest text-faint">{g.title}</p>
              <p className="mt-2 text-muted">{g.blurb}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {g.skills.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onMouseEnter={() => setHovered(s)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(s)}
                      onBlur={() => setHovered(null)}
                      className={clsx(
                        "rounded-lg border px-3 py-1.5 text-sm transition-all",
                        hovered === s ? "border-accent bg-accent text-accent-ink" : "border-line bg-bg text-fg/85 hover:-translate-y-0.5",
                      )}
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </Spotlight>
          </Reveal>
        ))}
      </div>

      <div className="mt-3 min-h-14 rounded-2xl border border-dashed border-line px-5 py-4 text-sm" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div key={hovered ?? "none"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="flex flex-wrap items-center gap-2 text-muted">
            {!hovered ? (
              <span className="font-mono text-xs text-faint">{"// hover a skill ↑"}</span>
            ) : usedIn.length ? (
              <>
                <span className="font-mono text-xs">{hovered} → used in</span>
                {usedIn.map((p) => (
                  <Link key={p.slug} href={`/projects/${p.slug}`} className="rounded-full border border-line px-3 py-1 text-fg hover:border-accent">
                    {p.title}
                  </Link>
                ))}
              </>
            ) : (
              <span className="font-mono text-xs">{hovered} → used across my day-to-day engineering work</span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-16 grid gap-3 md:grid-cols-3">
        {certificates.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.05}>
            <Spotlight className="h-full">
              <Award className="h-5 w-5 text-accent" />
              <p className="mt-4 font-medium">{c.title}</p>
              <p className="mt-1 text-sm text-muted">{c.issuer}</p>
              {c.href && (
                <a href={c.href} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm text-accent hover:underline">
                  View credential <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </Spotlight>
          </Reveal>
        ))}
        <Reveal delay={0.1}>
          <Spotlight className="h-full">
            <GraduationCap className="h-5 w-5 text-accent" />
            <p className="mt-4 font-medium">{education.degree}</p>
            <p className="mt-1 text-sm text-muted">
              {education.school} · {education.period}
            </p>
            <p className="mt-1 text-sm text-faint">{education.location}</p>
          </Spotlight>
        </Reveal>
      </div>
    </section>
  );
}
