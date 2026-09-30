"use client";

import { motion } from "motion/react";
import { Bot, Brain, Workflow, Zap } from "lucide-react";
import clsx from "clsx";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";

const capabilities = [
  {
    icon: Bot,
    title: "AI Agents & Chatbots",
    body: "Multi-agent systems and chatbots that actually do things — call tools, remember context, retrieve the right facts and hand off to humans when they should.",
    points: ["LangGraph multi-agent workflows", "RAG over your docs & data", "Voice, chat & WhatsApp bots"],
    tools: ["LangGraph", "LangChain", "OpenAI", "Claude", "RAG", "MCP"],
    visual: "chat",
    span: "md:col-span-2",
  },
  {
    icon: Brain,
    title: "LLM Fine-tuning",
    body: "Models that speak in your voice and follow your formats — trained, evaluated and shipped.",
    points: ["Dataset curation & PII scrubbing", "LoRA / QLoRA & hosted fine-tunes", "Eval harnesses"],
    tools: ["OpenAI", "Hugging Face", "LoRA", "PyTorch"],
    visual: "curve",
    span: "",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    body: "Hours of manual busywork turned into reliable workflows — with AI steps where judgement is needed.",
    points: ["Lead capture → CRM → follow-up", "AI-powered data extraction", "Self-hosted, monitored flows"],
    tools: ["n8n", "Make.com", "Zapier", "Webhooks"],
    visual: "flow",
    span: "",
  },
  {
    icon: Zap,
    title: "CRM & Marketing Automation",
    body: "GoHighLevel and HubSpot set up to sell on autopilot: pipelines, nurture sequences, AI appointment setters and reporting that runs itself.",
    points: ["GHL funnels, pipelines & workflows", "Missed-call text-back & SMS bots", "Reviews, reminders & reporting"],
    tools: ["GoHighLevel", "HubSpot", "Twilio", "Make.com"],
    visual: "pipeline",
    span: "md:col-span-2",
  },
] as const;

function ChatVisual() {
  const msgs = [
    { me: true, t: "Find last month's churned users and draft win-back emails" },
    { me: false, t: "Querying CRM… 42 users found. Drafts ready for review ✓" },
  ];
  return (
    <div className="space-y-2">
      {msgs.map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.5 }}
          className={clsx(
            "w-fit max-w-[85%] rounded-2xl px-3 py-2 text-xs",
            m.me ? "ml-auto rounded-br-sm bg-accent text-accent-ink" : "rounded-bl-sm border border-line bg-bg text-muted",
          )}
        >
          {m.t}
        </motion.div>
      ))}
      <div className="flex gap-1.5 pl-1 font-mono text-[10px] text-faint">
        {["search_crm()", "draft_email()", "handoff()"].map((t) => (
          <span key={t} className="rounded border border-line px-1.5 py-0.5">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function CurveVisual() {
  return (
    <svg viewBox="0 0 200 70" className="h-20 w-full" aria-hidden>
      <motion.path
        d="M0,8 C30,45 60,58 100,62 S160,66 200,67"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      />
      <path d="M0,14 C32,46 62,56 100,58 S160,60 200,60" fill="none" stroke="var(--line-strong)" strokeWidth="1.5" strokeDasharray="4 3" />
    </svg>
  );
}

function FlowVisual() {
  const steps = ["Trigger", "AI", "CRM", "Slack"];
  return (
    <div className="relative flex items-center justify-between py-3">
      <span className="absolute inset-x-4 top-1/2 h-px bg-line-strong" />
      <motion.span
        className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]"
        animate={{ left: ["6%", "92%"] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      {steps.map((s) => (
        <span key={s} className="relative rounded-lg border border-line bg-bg px-2 py-1.5 font-mono text-[10px] text-muted">
          {s}
        </span>
      ))}
    </div>
  );
}

function PipelineVisual() {
  const stages = [
    { t: "New", n: 12 },
    { t: "Contacted", n: 8 },
    { t: "Booked", n: 5 },
    { t: "Won", n: 3 },
  ];
  return (
    <div className="grid grid-cols-4 gap-2">
      {stages.map((s, i) => (
        <div key={s.t} className="rounded-xl border border-line bg-bg p-2.5">
          <p className="truncate font-mono text-[10px] text-faint">{s.t}</p>
          <div className="mt-2 flex h-10 items-end gap-0.5">
            {Array.from({ length: s.n > 6 ? 6 : s.n }).map((_, j) => (
              <motion.span
                key={j}
                className="flex-1 rounded-sm bg-accent"
                style={{ opacity: 0.35 + i * 0.2 }}
                initial={{ height: 0 }}
                whileInView={{ height: `${30 + ((j * 37 + i * 13) % 70)}%` }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i + 0.05 * j, duration: 0.6 }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const visuals = { chat: ChatVisual, curve: CurveVisual, flow: FlowVisual, pipeline: PipelineVisual };

export default function Capabilities() {
  return (
    <section id="services" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 md:px-6 md:py-32">
      <SectionHeading index="01" eyebrow="What I do" title="AI that" accent="does the work.">
        Agents, chatbots, fine-tuned models and automations — built to production standard and wired into the tools your team already uses.
      </SectionHeading>

      <div className="grid gap-3 md:grid-cols-3">
        {capabilities.map((cap, i) => {
          const Icon = cap.icon;
          const Visual = visuals[cap.visual];
          return (
            <Reveal key={cap.title} delay={i * 0.06} className={cap.span}>
              <div
                onPointerMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
                }}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-bg-elev p-6 transition-colors hover:border-accent/50 md:p-8 before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(450px_circle_at_var(--x)_var(--y),var(--accent-soft),transparent_60%)] before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100"
              >
                <div className="relative flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent-soft text-accent transition group-hover:bg-accent group-hover:text-accent-ink">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{cap.title}</h3>
                </div>
                <p className="relative mt-4 text-muted">{cap.body}</p>

                <div className={clsx("relative mt-6 grid gap-6", cap.span && "md:grid-cols-2 md:items-center")}>
                  <ul className="space-y-2 text-sm">
                    {cap.points.map((p) => (
                      <li key={p} className="flex items-center gap-2.5">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Visual />
                </div>

                <ul className="relative mt-auto flex flex-wrap gap-1.5 pt-6">
                  {cap.tools.map((t) => (
                    <li key={t} className="rounded-full border border-line bg-bg px-2.5 py-1 font-mono text-[11px] text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
