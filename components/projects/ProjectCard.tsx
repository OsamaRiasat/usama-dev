import Link from "next/link";
import { ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import clsx from "clsx";
import type { Project } from "@/content/projects";
import ProjectVisual from "./ProjectVisual";
import Reveal from "../ui/Reveal";

export default function ProjectCard({ project, index, flip }: { project: Project; index: number; flip: boolean }) {
  const accent = `hsl(${project.hue} 80% 62%)`;

  return (
    <article className="group relative grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <Reveal className={clsx("lg:col-span-7", flip && "lg:order-2")}>
        <Link href={`/projects/${project.slug}`} aria-label={`${project.title} case study`} className="block">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[2rem] opacity-40 blur-3xl transition-opacity duration-700 group-hover:opacity-70"
              style={{ background: `radial-gradient(60% 60% at 50% 50%, hsl(${project.hue} 80% 50% / 0.35), transparent)` }}
            />
            <ProjectVisual project={project} priority={index === 0} />
          </div>
        </Link>
      </Reveal>

      <Reveal delay={0.1} className={clsx("lg:col-span-5", flip && "lg:order-1")}>
        <div className="mb-5 flex items-center gap-3 font-mono text-xs text-muted">
          <span className="text-2xl font-semibold text-fg/20">{String(index + 1).padStart(2, "0")}</span>
          <span className="h-px w-6 bg-line-strong" />
          {project.categories.join(" · ")}
          {project.confidential && (
            <span className="inline-flex items-center gap-1 rounded-full border border-line px-2 py-0.5">
              <Lock className="h-3 w-3" /> NDA
            </span>
          )}
        </div>

        <h3 className="text-3xl font-semibold tracking-tight md:text-5xl">
          <Link href={`/projects/${project.slug}`} className="transition-colors hover:text-accent">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 font-serif text-xl italic text-muted md:text-2xl">{project.tagline}</p>
        <p className="mt-5 text-muted">{project.summary}</p>

        <dl className="mt-6 grid grid-cols-3 gap-3">
          {project.metrics.slice(0, 3).map((m) => (
            <div key={m.label} className="rounded-xl border border-line p-3">
              <dt className="sr-only">{m.label}</dt>
              <dd className="text-lg font-semibold tracking-tight" style={{ color: accent }}>
                {m.value}
              </dd>
              <dd className="text-xs leading-snug text-muted">{m.label}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <li key={s} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href={`/projects/${project.slug}`}
            className="group/btn inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition hover:bg-accent hover:text-accent-ink"
          >
            Case study <ArrowRight className="h-4 w-4 transition group-hover/btn:translate-x-1" />
          </Link>
          {project.link && (
            <a
              href={project.link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-5 py-2.5 text-sm transition hover:bg-line"
            >
              Live site <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </Reveal>
    </article>
  );
}
