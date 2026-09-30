"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowDown, ArrowRight, FileText } from "lucide-react";
import { profile } from "@/content/profile";
import NodeGraph from "./NodeGraph";
import Typewriter from "./Typewriter";

const ease = [0.22, 1, 0.36, 1] as const;
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
});

const marquee = ["LangGraph", "LangChain", "Fine-tuning", "n8n", "Make.com", "GoHighLevel", "RAG", "Chatbots", "FastAPI", "Django", "React", "Next.js", "OpenAI", "Kubernetes", "AWS", "MCP"];

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-dvh flex-col overflow-hidden pt-28">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
      <NodeGraph />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 md:px-6">
        <motion.div {...rise(0.1)} className="mb-8 flex flex-wrap items-center gap-3">
          {profile.available && (
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/60 px-3 py-1.5 text-xs text-muted backdrop-blur">
              <span className="pulse-dot h-2 w-2 rounded-full bg-accent" />
              Open to new opportunities
            </span>
          )}
          <span className="font-mono text-xs text-faint">{profile.location}</span>
        </motion.div>

        <h1 className="max-w-5xl text-[clamp(2.75rem,8vw,7.5rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
          <motion.span {...rise(0.2)} className="block">
            {profile.name}
          </motion.span>
          <motion.span {...rise(0.32)} className="block text-muted">
            builds{" "}
            <span className="font-serif font-normal italic text-accent">intelligent</span>{" "}
            systems.
          </motion.span>
        </h1>

        <motion.p {...rise(0.45)} className="mt-8 max-w-2xl text-lg text-muted md:text-xl">
          {profile.role} · 6+ years in Python &amp; React, now building AI and automation. Right now: <Typewriter words={profile.typed} />
        </motion.p>

        <motion.div {...rise(0.58)} className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-ink transition hover:shadow-[0_0_40px_-5px_var(--accent)]"
          >
            View selected work
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
          <a
            href={profile.links.resume}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3.5 text-sm font-medium backdrop-blur transition hover:bg-line"
          >
            <FileText className="h-4 w-4" /> Résumé
          </a>
          <Link href="#contact" className="px-3 py-3.5 text-sm text-muted underline-offset-4 transition hover:text-fg hover:underline">
            Get in touch
          </Link>
        </motion.div>
      </div>

      <motion.div {...rise(0.8)} className="relative z-10 mt-16 border-y border-line bg-bg/40 py-4 backdrop-blur">
        <div className="mask-fade-x overflow-hidden">
          <div className="animate-marquee flex w-max gap-10 font-mono text-sm text-faint">
            {[...marquee, ...marquee].map((t, i) => (
              <span key={i} className="flex items-center gap-10">
                {t} <span className="text-accent">✦</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <Link href="#work" aria-label="Scroll to work" className="absolute bottom-24 right-6 z-10 hidden animate-bounce text-faint md:block">
        <ArrowDown className="h-5 w-5" />
      </Link>
    </section>
  );
}
