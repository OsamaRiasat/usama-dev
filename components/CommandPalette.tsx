"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Copy, FileText, FolderGit2, Hash, SunMoon } from "lucide-react";
import { Github, Linkedin } from "./ui/BrandIcons";
import { projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { navItems } from "./Nav";
import { toggleTheme } from "./ui/ThemeToggle";

const groupClass =
  "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-faint";

const itemClass =
  "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted data-[selected=true]:bg-line data-[selected=true]:text-fg";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("palette:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("palette:open", onOpen);
    };
  }, []);

  const run = (fn: () => void) => {
    setOpen(false);
    fn();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-black/50 px-4 pt-[15vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-line-strong bg-bg-elev shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Command label="Command palette" loop>
              <Command.Input
                autoFocus
                placeholder="Jump to a section, project or link…"
                className="w-full border-b border-line bg-transparent px-5 py-4 text-base outline-none placeholder:text-faint"
              />
              <Command.List className="max-h-[50vh] overflow-y-auto p-2" data-lenis-prevent>
                <Command.Empty className="px-3 py-6 text-center text-sm text-muted">No results.</Command.Empty>
                <Command.Group heading="Sections" className={groupClass}>
                  {navItems.map((n) => (
                    <Command.Item key={n.id} className={itemClass} onSelect={() => run(() => router.push(`/#${n.id}`))}>
                      <Hash className="h-4 w-4" /> {n.label}
                    </Command.Item>
                  ))}
                </Command.Group>
                <Command.Group heading="Projects" className={groupClass}>
                  {projects.map((p) => (
                    <Command.Item key={p.slug} value={`${p.title} ${p.stack.join(" ")}`} className={itemClass} onSelect={() => run(() => router.push(`/projects/${p.slug}`))}>
                      <FolderGit2 className="h-4 w-4" />
                      <span className="text-fg">{p.title}</span>
                      <span className="ml-auto truncate text-xs text-faint">{p.tagline}</span>
                    </Command.Item>
                  ))}
                </Command.Group>
                <Command.Group heading="Actions" className={groupClass}>
                  <Command.Item className={itemClass} onSelect={() => run(() => navigator.clipboard?.writeText(profile.email))}>
                    <Copy className="h-4 w-4" /> Copy email address
                  </Command.Item>
                  <Command.Item className={itemClass} onSelect={() => run(() => window.open(profile.links.resume, "_blank"))}>
                    <FileText className="h-4 w-4" /> Open résumé (PDF)
                  </Command.Item>
                  <Command.Item className={itemClass} onSelect={() => run(() => window.open(profile.links.github, "_blank"))}>
                    <Github className="h-4 w-4" /> GitHub <ArrowUpRight className="ml-auto h-3.5 w-3.5" />
                  </Command.Item>
                  <Command.Item className={itemClass} onSelect={() => run(() => window.open(profile.links.linkedin, "_blank"))}>
                    <Linkedin className="h-4 w-4" /> LinkedIn <ArrowUpRight className="ml-auto h-3.5 w-3.5" />
                  </Command.Item>
                  <Command.Item className={itemClass} onSelect={() => run(toggleTheme)}>
                    <SunMoon className="h-4 w-4" /> Toggle theme
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
