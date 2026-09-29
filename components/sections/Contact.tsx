"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, FileText, Mail } from "lucide-react";
import { profile } from "@/content/profile";
import { Github, Linkedin } from "../ui/BrandIcons";
import Reveal from "../ui/Reveal";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const links = [
    { label: "LinkedIn", href: profile.links.linkedin, icon: Linkedin },
    { label: "GitHub", href: profile.links.github, icon: Github },
    { label: "Résumé", href: profile.links.resume, icon: FileText },
  ];

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden border-t border-line">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_bottom,#000_20%,transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl px-4 py-28 md:px-6 md:py-40">
        <Reveal>
          <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            <span className="text-accent">05</span>
            <span className="h-px w-8 bg-line-strong" /> Contact
          </p>
          <h2 className="max-w-4xl text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-8xl">
            Let&apos;s build something <span className="font-serif font-normal italic text-accent">remarkable.</span>
          </h2>
          <p className="mt-8 max-w-xl text-lg text-muted">
            Whether it&apos;s an AI product, a platform that needs to scale, or a team that needs a senior engineer — I&apos;d love to hear about it.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-accent px-7 py-4 text-base font-semibold text-accent-ink transition hover:shadow-[0_0_60px_-10px_var(--accent)]"
          >
            <Mail className="h-5 w-5" /> {profile.email}
          </a>
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line-strong px-6 py-4 text-sm transition hover:bg-line"
          >
            {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied!" : "Copy email"}
          </button>
        </Reveal>

        <Reveal delay={0.25} className="mt-16 grid gap-3 sm:grid-cols-3">
          {links.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-line bg-bg-elev px-5 py-4 transition hover:border-accent"
            >
              <span className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-muted transition group-hover:text-accent" /> {label}
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
