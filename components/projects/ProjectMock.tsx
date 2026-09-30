"use client";

import { useState } from "react";
import {
  AudioLines, Bell, Bot, Brain, Calendar, Camera, Check, FileText, Globe, Image as ImageIcon, Lock, MessageSquare,
  Mic, Paperclip, Phone, Search, Send, ShieldCheck, ShoppingBag, Sparkles, Star, Stethoscope, Ticket, User, Video, Webhook, Zap,
} from "lucide-react";
import type { MockKind } from "@/content/projects";

/** Illustrated product UI used as a stand-in until a real screenshot is provided. Always dark, like a screenshot. */
export default function ProjectMock({ kind, hue }: { kind: MockKind; hue: number }) {
  const c = (l: number, a = 1, s = 80) => `hsl(${hue} ${s}% ${l}% / ${a})`;
  const Body = { chat: Chat, clinical: Clinical, vision: Vision, funding: Funding, shop: Shop, paint: Paint, flow: Flow, crm: Crm, finetune: FineTune }[kind];
  return (
    <div
      className="relative h-full w-full overflow-hidden text-[10px] text-white/80 sm:text-[11px]"
      style={{ background: `radial-gradient(120% 90% at 100% 0%, ${c(30, 0.55)}, transparent 60%), linear-gradient(180deg, #0c0d11, #08090b)` }}
    >
      <Body c={c} />
    </div>
  );
}

type C = { c: (l: number, a?: number, s?: number) => string };

const Panel = ({ className = "", children, style }: { className?: string; children?: React.ReactNode; style?: React.CSSProperties }) => (
  <div className={`rounded-lg border border-white/10 bg-white/[0.04] ${className}`} style={style}>
    {children}
  </div>
);

function Chat({ c }: C) {
  const models = ["GPT-4o", "Claude", "Gemini", "Llama 3"];
  return (
    <div className="flex h-full">
      <aside className="hidden w-[26%] flex-col gap-1.5 border-r border-white/10 p-3 sm:flex">
        <div className="mb-2 flex items-center gap-1.5 font-semibold text-white">
          <Sparkles className="h-3.5 w-3.5" style={{ color: c(65) }} /> DeftGPT
        </div>
        {models.map((m, i) => (
          <div key={m} className="flex items-center gap-2 rounded-md px-2 py-1.5" style={{ background: i === 1 ? c(50, 0.2) : "transparent" }}>
            <span className="h-2 w-2 rounded-full" style={{ background: c(40 + i * 10) }} /> {m}
          </div>
        ))}
        <div className="mt-auto rounded-md border border-dashed border-white/15 p-2 text-white/50">
          <FileText className="mb-1 h-3.5 w-3.5" /> 12 docs indexed
        </div>
      </aside>
      <main className="flex flex-1 flex-col gap-2.5 p-3 sm:p-4">
        <div className="ml-auto max-w-[70%] rounded-xl rounded-br-sm px-3 py-2 text-white" style={{ background: c(45, 0.9) }}>
          Summarise the Q3 report and compare the answer across models.
        </div>
        <div className="flex max-w-[82%] gap-2">
          <Bot className="mt-1 h-4 w-4 shrink-0" style={{ color: c(70) }} />
          <Panel className="space-y-1.5 p-2.5">
            <div className="h-1.5 w-[92%] rounded bg-white/25" />
            <div className="h-1.5 w-[80%] rounded bg-white/20" />
            <div className="h-1.5 w-[64%] rounded bg-white/15" />
            <div className="flex gap-1 pt-1">
              {["report.pdf · p4", "q3.xlsx"].map((s) => (
                <span key={s} className="rounded px-1.5 py-0.5" style={{ background: c(50, 0.18), color: c(80) }}>
                  {s}
                </span>
              ))}
            </div>
          </Panel>
        </div>
        <div className="hidden max-w-[82%] grid-cols-3 gap-1.5 pl-6 sm:grid">
          {[ImageIcon, AudioLines, Video].map((I, i) => (
            <Panel key={i} className="grid aspect-video place-items-center">
              <I className="h-4 w-4 text-white/40" />
            </Panel>
          ))}
        </div>
        <Panel className="mt-auto flex items-center gap-2 px-3 py-2 text-white/40">
          <Paperclip className="h-3.5 w-3.5" /> <Mic className="h-3.5 w-3.5" /> Ask anything…
          <span className="ml-auto grid h-5 w-5 place-items-center rounded-md" style={{ background: c(60) }}>
            <Send className="h-3 w-3 text-black" />
          </span>
        </Panel>
      </main>
    </div>
  );
}

function Clinical({ c }: C) {
  // Node centres in % of the graph area; lines and nodes share this coordinate space.
  const nodes = [
    { l: "Intake agent", x: 16, y: 30 },
    { l: "Router", x: 45, y: 30 },
    { l: "Clinical RAG", x: 78, y: 14 },
    { l: "Guardrails", x: 78, y: 56 },
    { l: "Clinician", x: 45, y: 80 },
  ];
  return (
    <div className="flex h-full">
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center gap-1.5 font-semibold text-white">
          <Stethoscope className="h-3.5 w-3.5" style={{ color: c(60) }} /> LangGraph workflow
        </div>
        <div className="relative flex-1">
          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            {[[0, 1], [1, 2], [1, 3], [2, 3], [3, 4]].map(([a, b], i) => (
              <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke={c(55, 0.55)} strokeWidth="1" strokeDasharray="3 2" vectorEffect="non-scaling-stroke" />
            ))}
          </svg>
          {nodes.map((n, i) => (
            <div
              key={n.l}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-md border px-2 py-1.5"
              style={{ left: `${n.x}%`, top: `${n.y}%`, borderColor: c(55, 0.5), background: i === 1 ? c(30, 1) : "#0f1115" }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: c(60) }} /> {n.l}
            </div>
          ))}
        </div>
      </div>
      <aside className="hidden w-[38%] flex-col gap-2 border-l border-white/10 p-3 sm:flex">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-white">Patient intake</span>
          <span className="flex items-center gap-1 rounded px-1.5 py-0.5" style={{ background: c(45, 0.2), color: c(75) }}>
            <Lock className="h-2.5 w-2.5" /> PHI safe
          </span>
        </div>
        <Panel className="p-2">Any allergies I should know about?</Panel>
        <Panel className="ml-4 p-2" style={{ background: c(40, 0.25) }}>
          Penicillin — <span className="rounded bg-black/40 px-1 text-white/50">[REDACTED]</span>
        </Panel>
        <Panel className="space-y-1 p-2">
          <div className="flex items-center gap-1 text-white/60">
            <ShieldCheck className="h-3 w-3" style={{ color: c(60) }} /> Audit logged
          </div>
          <div className="h-1.5 w-3/4 rounded bg-white/15" />
          <div className="h-1.5 w-1/2 rounded bg-white/10" />
        </Panel>
      </aside>
    </div>
  );
}

function Vision({ c }: C) {
  const boxes = [
    { l: 30, t: 30, w: 22, h: 42, label: "person · 0.94" },
    { l: 55, t: 45, w: 30, h: 30, label: "vehicle · 0.88" },
    { l: 20, t: 25, w: 35, h: 55, label: "climbing fence" },
    null,
  ];
  return (
    <div className="flex h-full">
      <div className="grid flex-1 grid-cols-2 gap-1.5 p-2">
        {boxes.map((b, i) => (
          <div key={i} className="relative overflow-hidden rounded-md" style={{ background: `linear-gradient(${120 + i * 40}deg, #1a1c22, #0b0c0f)` }}>
            <span className="absolute left-1.5 top-1.5 flex items-center gap-1 text-white/50">
              <Camera className="h-3 w-3" /> CAM-0{i + 1}
            </span>
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
            {b && (
              <div className="absolute border" style={{ left: `${b.l}%`, top: `${b.t}%`, width: `${b.w}%`, height: `${b.h}%`, borderColor: i === 2 ? c(60) : "rgb(255 255 255 / .5)" }}>
                <span className="absolute -top-4 left-0 whitespace-nowrap rounded px-1 text-black" style={{ background: i === 2 ? c(60) : "rgb(255 255 255 / .8)" }}>
                  {b.label}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      <aside className="hidden w-[34%] flex-col gap-1.5 border-l border-white/10 p-2.5 sm:flex">
        <div className="font-semibold text-white">Event stream</div>
        {["Perimeter breach · CAM-03", "Vehicle idle 4m · CAM-02", "Person detected · CAM-01", "Queue depth · 12"].map((e, i) => (
          <Panel key={e} className="flex items-center gap-1.5 p-1.5" style={i === 0 ? { borderColor: c(55, 0.6), background: c(40, 0.2) } : undefined}>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: i === 0 ? c(60) : "rgb(255 255 255 / .3)" }} />
            <span className="truncate">{e}</span>
          </Panel>
        ))}
        <div className="mt-auto text-white/40">LLaVA · RabbitMQ · 1000+/day</div>
      </aside>
    </div>
  );
}

function Funding({ c }: C) {
  const steps = ["Business", "Bank link", "Offer", "Funded"];
  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-white">Funding application</span>
        <span className="flex items-center gap-1 text-white/50">
          <User className="h-3 w-3" /> Acme Traders
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-1.5">
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full text-[9px] font-bold" style={{ background: i < 3 ? c(55) : "rgb(255 255 255 / .1)", color: i < 3 ? "#000" : undefined }}>
              {i < 2 ? <Check className="h-3 w-3" /> : i + 1}
            </span>
            <span className="hidden truncate sm:inline">{s}</span>
            {i < steps.length - 1 && <span className="h-px flex-1" style={{ background: i < 2 ? c(55) : "rgb(255 255 255 / .1)" }} />}
          </div>
        ))}
      </div>
      <div className="grid flex-1 grid-cols-5 gap-2">
        <Panel className="col-span-3 flex flex-col justify-between p-3" style={{ background: `linear-gradient(135deg, ${c(40, 0.35)}, transparent)` }}>
          <span className="text-white/60">Your offer</span>
          <span className="text-2xl font-semibold text-white sm:text-3xl">R 250,000</span>
          <div className="flex gap-3 text-white/60">
            <span>12 mo term</span>
            <span>Daily split</span>
          </div>
          <span className="w-fit rounded-md px-3 py-1.5 font-semibold text-black" style={{ background: c(60) }}>
            Accept offer
          </span>
        </Panel>
        <div className="col-span-2 flex flex-col gap-2">
          <Panel className="flex items-center gap-2 p-2">
            <ShieldCheck className="h-4 w-4" style={{ color: c(65) }} /> Bank verified · TruID
          </Panel>
          <Panel className="flex flex-1 items-end gap-1 p-2">
            {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
              <span key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: c(45 + i * 3, 0.7) }} />
            ))}
          </Panel>
        </div>
      </div>
    </div>
  );
}

function Shop({ c }: C) {
  const items = [
    { n: "99M Bells", p: "$4.99", I: Bell },
    { n: "Nook Miles Ticket ×40", p: "$6.49", I: Ticket },
    { n: "Golden Furniture Set", p: "$3.99", I: Star },
    { n: "Seasonal Clothing", p: "$2.99", I: ShoppingBag },
  ];
  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5">
        <span className="font-semibold text-white">NookMart</span>
        <Panel className="flex flex-1 items-center gap-1.5 px-2 py-1 text-white/40">
          <Search className="h-3 w-3" /> Search items…
        </Panel>
        <span className="relative">
          <ShoppingBag className="h-4 w-4" />
          <span className="absolute -right-1.5 -top-1.5 grid h-3.5 w-3.5 place-items-center rounded-full text-[8px] font-bold text-black" style={{ background: c(60) }}>
            3
          </span>
        </span>
      </header>
      <div className="grid flex-1 grid-cols-2 gap-2 p-3 sm:grid-cols-4">
        {items.map(({ n, p, I }, i) => (
          <Panel key={n} className="flex flex-col overflow-hidden">
            <div className="grid flex-1 place-items-center" style={{ background: `linear-gradient(160deg, ${c(35 + i * 6, 0.45, 70)}, transparent)` }}>
              <I className="h-6 w-6" style={{ color: c(70) }} />
            </div>
            <div className="p-2">
              <div className="truncate text-white">{n}</div>
              <div className="flex items-center justify-between">
                <span style={{ color: c(70) }}>{p}</span>
                <span className="text-white/40">24/7</span>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

const PAINTS = ["#c9b79c", "#5b7f95", "#9b5d73", "#6f8a5a", "#e2d4c0", "#2f3a4a"];

function Paint({ c }: C) {
  const [wall, setWall] = useState(PAINTS[1]);
  const [accent, setAccent] = useState(PAINTS[4]);
  return (
    <div className="flex h-full">
      <div className="relative flex-1">
        <svg viewBox="0 0 400 250" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <rect width="400" height="250" fill="#15161a" />
          <polygon points="0,0 120,40 120,200 0,250" fill={accent} style={{ transition: "fill .4s" }} opacity=".85" />
          <polygon points="120,40 400,0 400,250 120,200" fill={wall} style={{ transition: "fill .4s" }} />
          <polygon points="0,250 120,200 400,250" fill="#2a2420" />
          <rect x="220" y="60" width="90" height="70" fill="#0d0e11" opacity=".55" rx="2" />
          <rect x="160" y="160" width="160" height="40" fill="#1a1b1f" rx="6" />
          <rect x="175" y="140" width="40" height="28" fill="#23252b" rx="4" />
        </svg>
        <span className="absolute left-3 top-3 rounded bg-black/50 px-2 py-1 backdrop-blur">Living room · live preview</span>
      </div>
      <aside className="flex w-[28%] flex-col gap-2 border-l border-white/10 p-2.5">
        <span className="font-semibold text-white">Main wall</span>
        <div className="grid grid-cols-3 gap-1.5">
          {PAINTS.map((p) => (
            <button key={p} type="button" aria-label={`Paint wall ${p}`} onMouseEnter={() => setWall(p)} onClick={() => setWall(p)} className="aspect-square rounded-md border-2 transition hover:scale-110" style={{ background: p, borderColor: wall === p ? c(65) : "transparent" }} />
          ))}
        </div>
        <span className="mt-1 font-semibold text-white">Side wall</span>
        <div className="grid grid-cols-3 gap-1.5">
          {PAINTS.map((p) => (
            <button key={p} type="button" aria-label={`Paint side wall ${p}`} onMouseEnter={() => setAccent(p)} onClick={() => setAccent(p)} className="aspect-square rounded-md border-2 transition hover:scale-110" style={{ background: p, borderColor: accent === p ? c(65) : "transparent" }} />
          ))}
        </div>
      </aside>
    </div>
  );
}

/** n8n-style workflow canvas with packets travelling along the connections. */
function Flow({ c }: C) {
  const nodes = [
    { l: "Webhook", sub: "ads · forms", I: Webhook, x: 10, y: 50 },
    { l: "Enrich", sub: "company data", I: Globe, x: 32, y: 50 },
    { l: "AI score", sub: "gpt · json", I: Brain, x: 54, y: 50, ai: true },
    { l: "CRM", sub: "GoHighLevel", I: User, x: 78, y: 26 },
    { l: "Slack", sub: "#hot-leads", I: MessageSquare, x: 78, y: 74 },
  ];
  const edges: [number, number][] = [[0, 1], [1, 2], [2, 3], [2, 4]];
  return (
    <div
      className="relative h-full"
      style={{ backgroundImage: "radial-gradient(rgb(255 255 255 / .09) 1px, transparent 1px)", backgroundSize: "14px 14px" }}
    >
      <div className="absolute left-3 top-3 flex items-center gap-1.5 font-semibold text-white">
        <Zap className="h-3.5 w-3.5" style={{ color: c(60) }} /> Lead → Meeting
        <span className="ml-1 rounded px-1.5 py-0.5 text-[9px] font-medium" style={{ background: c(50, 0.2), color: c(75) }}>
          ● Active
        </span>
      </div>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {edges.map(([a, b], i) => {
          const d = `M ${nodes[a].x} ${nodes[a].y} C ${(nodes[a].x + nodes[b].x) / 2} ${nodes[a].y}, ${(nodes[a].x + nodes[b].x) / 2} ${nodes[b].y}, ${nodes[b].x} ${nodes[b].y}`;
          return (
            <g key={i}>
              <path d={d} fill="none" stroke="rgb(255 255 255 / .22)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <path d={d} fill="none" stroke={c(60)} strokeWidth="2" strokeDasharray="4 96" pathLength={100} vectorEffect="non-scaling-stroke">
                <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2.4s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
              </path>
            </g>
          );
        })}
      </svg>
      {nodes.map(({ l, sub, I, x, y, ai }) => (
        <div
          key={l}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-lg border bg-[#16181d] p-1.5 pr-2.5 shadow-lg"
          style={{ left: `${x}%`, top: `${y}%`, borderColor: ai ? c(55) : "rgb(255 255 255 / .14)" }}
        >
          <span className="grid h-6 w-6 place-items-center rounded-md" style={{ background: ai ? c(50) : c(40, 0.25) }}>
            <I className="h-3.5 w-3.5" style={{ color: ai ? "#000" : c(70) }} />
          </span>
          <span className="leading-tight">
            <span className="block font-medium text-white">{l}</span>
            <span className="hidden text-[9px] text-white/45 sm:block">{sub}</span>
          </span>
        </div>
      ))}
      <div className="absolute bottom-3 left-3 right-3 flex justify-between text-white/40">
        <span>Executions today · 1,284</span>
        <span className="flex items-center gap-1">
          <Check className="h-3 w-3" style={{ color: c(60) }} /> All succeeded
        </span>
      </div>
    </div>
  );
}

/** GoHighLevel-style pipeline board. */
function Crm({ c }: C) {
  const cols = [
    { t: "New lead", n: 12, cards: ["Sarah K.", "Dental Pro", "M. Ortiz"] },
    { t: "Contacted", n: 8, cards: ["Apex Roofing", "J. Chen"] },
    { t: "Booked", n: 5, cards: ["Bloom Spa", "R. Patel"], hot: true },
    { t: "Won", n: 3, cards: ["Nova Fitness"] },
  ];
  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
        <span className="font-semibold text-white">Pipeline · Agency clients</span>
        <span className="ml-auto flex items-center gap-1 rounded px-1.5 py-0.5" style={{ background: c(45, 0.2), color: c(75) }}>
          <Bot className="h-3 w-3" /> AI setter on
        </span>
      </header>
      <div className="grid flex-1 grid-cols-4 gap-1.5 p-2">
        {cols.map((col) => (
          <div key={col.t} className="flex flex-col gap-1.5 rounded-md bg-white/[0.03] p-1.5">
            <div className="flex items-center justify-between px-0.5 text-white/60">
              <span className="truncate">{col.t}</span>
              <span className="font-mono">{col.n}</span>
            </div>
            {col.cards.map((name, i) => (
              <Panel key={name} className="space-y-1 p-1.5" style={col.hot && i === 0 ? { borderColor: c(55, 0.7), background: c(40, 0.2) } : undefined}>
                <div className="truncate text-white">{name}</div>
                <div className="flex gap-1 text-white/40">
                  {i % 2 === 0 ? <Phone className="h-2.5 w-2.5" /> : <MessageSquare className="h-2.5 w-2.5" />}
                  {col.hot && <Calendar className="h-2.5 w-2.5" style={{ color: c(65) }} />}
                </div>
              </Panel>
            ))}
          </div>
        ))}
      </div>
      <div className="mx-2 mb-2 flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-2 py-1.5">
        <MessageSquare className="h-3 w-3 shrink-0" style={{ color: c(65) }} />
        <span className="truncate text-white/70">AI: &ldquo;Hi Sarah! Sorry we missed your call — want to grab a slot tomorrow at 10?&rdquo;</span>
      </div>
    </div>
  );
}

/** Fine-tuning run: loss curves + eval scores beside the resulting chatbot. */
function FineTune({ c }: C) {
  const train = "M0,8 C10,40 20,58 35,66 S60,76 100,80";
  const val = "M0,14 C12,42 24,58 38,64 S62,70 100,72";
  return (
    <div className="flex h-full">
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-semibold text-white">
            <Sparkles className="h-3.5 w-3.5" style={{ color: c(65) }} /> ft-run · support-v3
          </span>
          <span className="rounded px-1.5 py-0.5" style={{ background: c(45, 0.2), color: c(78) }}>
            ✓ succeeded
          </span>
        </div>
        <Panel className="relative min-h-0 flex-1">
          <span className="absolute left-2 top-1.5 text-white/40">loss</span>
          <svg viewBox="0 0 100 90" preserveAspectRatio="none" className="absolute inset-x-2 bottom-5 top-6 h-[calc(100%-2.75rem)] w-[calc(100%-1rem)]">
            {[20, 40, 60, 80].map((y) => (
              <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="rgb(255 255 255 / .06)" vectorEffect="non-scaling-stroke" />
            ))}
            <path d={val} fill="none" stroke="rgb(255 255 255 / .35)" strokeWidth="1.5" strokeDasharray="3 2" vectorEffect="non-scaling-stroke" />
            <path d={train} fill="none" stroke={c(65)} strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </svg>
          <span className="absolute bottom-1.5 right-2 flex gap-2 text-white/50">
            <span style={{ color: c(70) }}>— train</span>
            <span>-- val</span>
          </span>
        </Panel>
        <div className="grid grid-cols-3 gap-1.5">
          {[["Tone match", "A+"], ["Accuracy", "↑"], ["Hallucination", "↓"]].map(([k, v]) => (
            <Panel key={k} className="p-1.5">
              <div className="truncate text-white/50">{k}</div>
              <div className="font-semibold" style={{ color: c(72) }}>
                {v}
              </div>
            </Panel>
          ))}
        </div>
      </div>
      <aside className="hidden w-[38%] flex-col gap-2 border-l border-white/10 p-3 sm:flex">
        <span className="font-semibold text-white">Support chat</span>
        <Panel className="p-2">Can I change my plan mid-cycle?</Panel>
        <Panel className="ml-3 p-2" style={{ background: c(40, 0.25) }}>
          Yes — upgrades apply instantly and we prorate the difference.
          <span className="mt-1 block text-white/40">Source: billing-faq.md</span>
        </Panel>
        <Panel className="mt-auto flex items-center gap-1.5 p-2 text-white/40">
          <User className="h-3 w-3" /> Handoff to human ready
        </Panel>
      </aside>
    </div>
  );
}
