"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { Boxes, Database, FileInput, GitBranch, Radio, Search, ShieldCheck } from "lucide-react";
import clsx from "clsx";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";

const stages = [
  {
    id: "ingest",
    icon: FileInput,
    title: "Ingest",
    tools: ["FastAPI", "Celery", "S3"],
    body: "Documents, clinical guidelines and user files are parsed, cleaned and chunked by async Celery workers — PHI is tagged at the door.",
  },
  {
    id: "embed",
    icon: Boxes,
    title: "Embed",
    tools: ["LangChain", "Embeddings"],
    body: "Chunks become vectors with metadata for filtering by tenant, source and recency, so retrieval respects access boundaries.",
  },
  {
    id: "store",
    icon: Database,
    title: "Vector store",
    tools: ["MilvusDB", "ChromaDB", "PostgreSQL"],
    body: "Milvus for scale, Chroma for fast iteration, Postgres for the source of truth. Redis caches hot queries.",
  },
  {
    id: "retrieve",
    icon: Search,
    title: "Retrieve",
    tools: ["Hybrid search", "Re-ranking"],
    body: "The most relevant chunks are retrieved and ranked into the prompt. Better context — not a bigger model — is how the RAG work lifted LLM accuracy by 35%.",
  },
  {
    id: "agents",
    icon: GitBranch,
    title: "Agents",
    tools: ["LangGraph", "Tools", "Memory"],
    body: "LangGraph orchestrates specialised agents — intake, routing, retrieval — with persistent memory and tool calls, all as an inspectable graph.",
  },
  {
    id: "guard",
    icon: ShieldCheck,
    title: "Guardrails",
    tools: ["RBAC", "Audit log", "OAuth2"],
    body: "Every request is authenticated, authorised and audit-logged. Outputs are checked before they reach a clinician or patient.",
  },
  {
    id: "stream",
    icon: Radio,
    title: "Stream",
    tools: ["SSE", "React", "EKS"],
    body: "Tokens stream to a React UI in real time, served from Kubernetes on AWS EKS at 99.9% uptime for 10K+ concurrent users.",
  },
];

export default function Approach() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20%" });
  const playing = inView && !paused;

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setActive((a) => (a + 1) % stages.length), 3200);
    return () => clearInterval(t);
  }, [playing]);

  const stage = stages[active];

  return (
    <section id="approach" className="relative scroll-mt-24 border-y border-line bg-bg-elev/50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading index="03" eyebrow="Approach" title="How I build" accent="AI systems.">
          The production RAG + agent pipeline I design at IGNIS Health. Hover or tap a stage to explore it.
        </SectionHeading>

        <Reveal>
          <div ref={ref} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="relative">
            <ol className="relative grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
              {stages.map((s, i) => {
                const Icon = s.icon;
                const on = i === active;
                const passed = i < active;
                return (
                  <li key={s.id} className="relative">
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => {
                        setActive(i);
                        setPaused(true);
                      }}
                      aria-pressed={on}
                      className={clsx(
                        "relative flex w-full flex-col items-start gap-3 overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300",
                        on ? "border-accent bg-accent-soft" : "border-line bg-bg hover:border-line-strong",
                      )}
                    >
                      <span className="font-mono text-[10px] text-faint">0{i + 1}</span>
                      <Icon className={clsx("h-6 w-6 transition-colors", on || passed ? "text-accent" : "text-muted")} />
                      <span className="text-sm font-medium">{s.title}</span>
                      {on && playing && (
                        <motion.span
                          key={`bar-${active}`}
                          className="absolute bottom-0 left-0 h-0.5 bg-accent"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 3.2, ease: "linear" }}
                        />
                      )}
                    </button>
                    {i < stages.length - 1 && (
                      <span aria-hidden className="absolute -right-3 top-1/2 z-10 hidden h-px w-3 overflow-hidden lg:block">
                        <span className={clsx("block h-full w-full transition-colors", passed ? "bg-accent" : "bg-line-strong")} />
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>

            <div className="mt-6 grid gap-6 rounded-3xl border border-line bg-bg p-6 md:grid-cols-[1fr_auto] md:p-8">
              <AnimatePresence mode="wait">
                <motion.div key={stage.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                  <p className="font-mono text-xs text-accent">
                    stage_{String(active + 1).padStart(2, "0")} / {stage.id}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold">{stage.title}</h3>
                  <p className="mt-3 max-w-2xl text-muted">{stage.body}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {stage.tools.map((t) => (
                      <span key={t} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="hidden items-center md:flex">
                <div className="grid grid-cols-7 gap-1">
                  {stages.map((s, i) => (
                    <span key={s.id} className={clsx("h-8 w-1.5 rounded-full transition-colors duration-300", i <= active ? "bg-accent" : "bg-line-strong")} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
