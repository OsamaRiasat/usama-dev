"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { categories, projects } from "@/content/projects";
import SectionHeading from "../ui/SectionHeading";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const visible = useMemo(() => (filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter))), [filter]);

  return (
    <section id="work" className="relative mx-auto max-w-6xl scroll-mt-24 px-4 py-24 md:px-6 md:py-32">
      <SectionHeading index="01" eyebrow="Selected work" title="Things I've" accent="shipped.">
        From multi-model AI platforms to HIPAA-grade clinical agents — production systems used by real people.
      </SectionHeading>

      <div role="group" aria-label="Filter projects" className="mb-16 flex flex-wrap gap-2">
        {categories.map((cat) => {
          const count = cat === "All" ? projects.length : projects.filter((p) => p.categories.includes(cat)).length;
          return (
            <button
              key={cat}
              type="button"
              aria-pressed={filter === cat}
              onClick={() => setFilter(cat)}
              className={clsx(
                "relative rounded-full border px-4 py-2 text-sm transition-colors",
                filter === cat ? "border-transparent text-accent-ink" : "border-line text-muted hover:text-fg",
              )}
            >
              {filter === cat && <motion.span layoutId="filter-pill" className="absolute inset-0 -z-10 rounded-full bg-accent" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />}
              {cat} <span className="ml-1 font-mono text-[10px] opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="flex flex-col gap-28 md:gap-40">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={p} index={projects.indexOf(p)} flip={i % 2 === 1} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
