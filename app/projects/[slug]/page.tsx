import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import { getProject, projects } from "@/content/projects";
import ProjectVisual from "@/components/projects/ProjectVisual";
import Gallery from "@/components/projects/Gallery";
import Reveal from "@/components/ui/Reveal";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.tagline, images: project.images.cover ? [project.images.cover] : undefined },
  };
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">{children}</p>;
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const i = projects.indexOf(project);
  const next = projects[(i + 1) % projects.length];
  const accent = `hsl(${project.hue} 80% 62%)`;

  return (
    <>
      <main className="relative z-10 pt-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[80vh]"
          style={{ background: `radial-gradient(60% 50% at 50% 0%, hsl(${project.hue} 80% 50% / 0.18), transparent 70%)` }}
        />

        <article className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal>
            <Link href="/#work" className="group inline-flex items-center gap-2 text-sm text-muted transition hover:text-fg">
              <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" /> All work
            </Link>

            <div className="mt-10 flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
              {project.categories.map((c) => (
                <span key={c} className="rounded-full border border-line px-3 py-1">
                  {c}
                </span>
              ))}
              {project.confidential && (
                <span className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1">
                  <Lock className="h-3 w-3" /> Under NDA — architecture only
                </span>
              )}
            </div>
            <h1 className="mt-6 text-[clamp(3rem,9vw,7rem)] font-semibold leading-[0.9] tracking-[-0.045em]">{project.title}</h1>
            <p className="mt-4 font-serif text-2xl italic text-muted md:text-4xl">{project.tagline}</p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 grid gap-6 border-y border-line py-6 sm:grid-cols-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-faint">Role</p>
              <p className="mt-1">{project.role}</p>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-faint">Stack</p>
              <p className="mt-1">{project.stack.slice(0, 4).join(", ")}</p>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-faint">{project.link ? "Live" : "Period"}</p>
              {project.link ? (
                <a href={project.link.href} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1 hover:text-accent">
                  {project.link.label} <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : (
                <p className="mt-1">{project.period ?? "—"}</p>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-14">
            <ProjectVisual project={project} priority />
          </Reveal>

          <section className="mt-24 grid gap-12 md:grid-cols-2">
            <Reveal>
              <Label>The problem</Label>
              <p className="text-2xl leading-snug tracking-tight md:text-3xl">{project.problem}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <Label>The solution</Label>
              <p className="text-lg text-muted">{project.solution}</p>
              <p className="mt-4 text-lg text-muted">{project.summary}</p>
            </Reveal>
          </section>

          <Reveal className="mt-20">
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-4">
              {project.metrics.map((m) => (
                <div key={m.label} className="bg-bg p-6 md:p-8">
                  <dd className="text-3xl font-semibold tracking-tight md:text-4xl" style={{ color: accent }}>
                    {m.value}
                  </dd>
                  <dt className="mt-2 text-sm text-muted">{m.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>

          <section className="mt-24">
            <Reveal>
              <Label>Architecture</Label>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">How it fits together</h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-10">
              <ol className="flex flex-col gap-3 md:flex-row md:items-stretch">
                {project.architecture.map((step, idx) => (
                  <li key={step} className="flex flex-1 flex-col items-stretch gap-3 md:flex-row md:items-center">
                    <div className="flex flex-1 items-center gap-3 rounded-2xl border border-line bg-bg-elev px-4 py-4 md:flex-col md:items-start md:justify-between md:py-5">
                      <span className="font-mono text-[11px]" style={{ color: accent }}>
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-medium">{step}</span>
                    </div>
                    {idx < project.architecture.length - 1 && (
                      <ArrowRight className="mx-auto h-4 w-4 shrink-0 rotate-90 text-faint md:rotate-0" />
                    )}
                  </li>
                ))}
              </ol>
            </Reveal>
          </section>

          <section className="mt-24">
            <Reveal>
              <Label>Key features</Label>
            </Reveal>
            <div className="grid gap-3 md:grid-cols-3">
              {project.features.map((f, idx) => (
                <Reveal key={f.title} delay={idx * 0.06} className={f.image ? "md:col-span-3" : ""}>
                  <div className="h-full overflow-hidden rounded-3xl border border-line bg-bg-elev">
                    {f.image && <Image src={f.image} alt={f.title} width={1920} height={1080} className="h-auto w-full border-b border-line" />}
                    <div className="p-6">
                      <p className="font-mono text-[11px] text-faint">{String(idx + 1).padStart(2, "0")}</p>
                      <h3 className="mt-3 text-xl font-semibold">{f.title}</h3>
                      <p className="mt-2 text-muted">{f.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {project.images.gallery && project.images.gallery.length > 0 && (
            <section className="mt-24">
              <Reveal>
                <Label>Gallery</Label>
              </Reveal>
              <Gallery images={project.images.gallery} title={project.title} />
            </section>
          )}

          <section className="mt-24">
            <Reveal>
              <Label>Built with</Label>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li key={s} className="rounded-full border border-line px-4 py-2 font-mono text-sm text-muted">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>

          <Reveal className="mb-24 mt-32">
            <Link href={`/projects/${next.slug}`} className="group block overflow-hidden rounded-3xl border border-line p-8 transition hover:border-accent md:p-12">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Next project</p>
              <div className="mt-4 flex items-end justify-between gap-6">
                <div>
                  <p className="text-4xl font-semibold tracking-tight transition group-hover:text-accent md:text-6xl">{next.title}</p>
                  <p className="mt-2 font-serif text-xl italic text-muted">{next.tagline}</p>
                </div>
                <ArrowRight className="h-8 w-8 shrink-0 transition group-hover:translate-x-2 group-hover:text-accent md:h-12 md:w-12" />
              </div>
            </Link>
          </Reveal>
        </article>
      </main>
      <Footer />
    </>
  );
}
