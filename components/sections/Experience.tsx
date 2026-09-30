"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import { experience } from "@/content/experience";
import SectionHeading from "../ui/SectionHeading";

/** Renders "[[35%]]" markers as highlighted metrics. */
function Highlighted({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[\[.*?\]\])/g).map((part, i) =>
        part.startsWith("[[") ? (
          <span key={i} className="rounded bg-accent-soft px-1 font-medium text-accent">
            {part.slice(2, -2)}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

export default function Experience() {
  const [open, setOpen] = useState(0);
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 md:px-6 md:py-32">
      <SectionHeading index="04" eyebrow="Experience" title="Six years," accent="four teams.">
        From full-stack product work to leading AI architecture in regulated healthcare.
      </SectionHeading>

      <ol ref={ref} className="relative ml-2 md:ml-0">
        <span aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-line md:left-[11.5rem]" />
        <motion.span aria-hidden style={{ scaleY: progress }} className="absolute bottom-0 left-0 top-0 w-px origin-top bg-accent md:left-[11.5rem]" />

        {experience.map((role, i) => {
          const isOpen = open === i;
          return (
              <motion.li
                key={role.company}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="relative grid gap-2 pb-12 pl-8 md:grid-cols-[11.5rem_1fr] md:gap-0 md:pl-0"
              >
                <div className="font-mono text-xs text-muted md:pr-8 md:pt-1.5 md:text-right">
                  {role.period}
                  {role.current && <span className="ml-2 rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-semibold text-accent-ink">NOW</span>}
                </div>
                <span
                  aria-hidden
                  className={clsx(
                    "absolute left-0 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 transition-colors md:left-[11.5rem]",
                    isOpen ? "border-accent bg-accent" : "border-line-strong bg-bg",
                  )}
                />
                <div className="md:pl-10">
                  <button type="button" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} className="group flex w-full items-start justify-between gap-4 text-left">
                    <div>
                      <h3 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent">{role.company}</h3>
                      <p className="mt-1 text-muted">
                        {role.title} · <span className="text-faint">{role.location}</span>
                      </p>
                      <p className="mt-3 text-fg/80">{role.summary}</p>
                    </div>
                    <ChevronDown className={clsx("mt-2 h-5 w-5 shrink-0 text-muted transition-transform", isOpen && "rotate-180")} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                        <ul className="mt-5 space-y-3">
                          {role.highlights.map((h) => (
                            <li key={h} className="flex gap-3 text-muted">
                              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                              <span>
                                <Highlighted text={h} />
                              </span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-5 flex flex-wrap gap-1.5">
                          {role.stack.map((s) => (
                            <span key={s} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
                              {s}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
