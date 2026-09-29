"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { Project } from "@/content/projects";
import ProjectMock from "./ProjectMock";

type Props = { project: Project; priority?: boolean; tilt?: boolean; className?: string };

function hostOf(p: Project) {
  if (p.confidential) return "internal · confidential";
  return p.link?.label ?? `${p.slug}.app`;
}

/** Browser-framed screenshot (or illustrated mock) with pointer tilt and hover auto-scroll for full-page captures. */
export default function ProjectVisual({ project, priority, tilt = true, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 150, damping: 18 });
  const glareX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(my, [0, 1], ["0%", "100%"]);
  const glare = useTransform([glareX, glareY], ([x, y]) => `radial-gradient(500px circle at ${x} ${y}, rgb(255 255 255 / 0.10), transparent 45%)`);

  const onMove = (e: React.PointerEvent) => {
    if (!tilt || e.pointerType !== "mouse") return;
    const r = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  const { images, title } = project;

  return (
    <div className={`[perspective:1400px] ${className}`}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={tilt ? { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" } : undefined}
        className="group/visual relative overflow-hidden rounded-2xl border border-line-strong bg-[#0b0c0f] shadow-[0_40px_120px_-40px_rgb(0_0_0/0.6)]"
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-[#111317] px-3 py-2.5">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="mx-auto max-w-[60%] truncate rounded-md bg-white/5 px-3 py-1 font-mono text-[10px] text-white/50">{hostOf(project)}</span>
          <span className="w-10" />
        </div>

        <div className="relative aspect-[16/10] overflow-hidden">
          {images.full ? (
            <Image
              src={images.full}
              alt={`${title} full-page screenshot`}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 720px, 100vw"
              className="object-cover object-top transition-[object-position] duration-[5000ms] ease-in-out group-hover/visual:object-bottom"
            />
          ) : images.cover ? (
            <Image src={images.cover} alt={`${title} screenshot`} fill priority={priority} sizes="(min-width: 1024px) 720px, 100vw" className="object-cover object-top" />
          ) : (
            <ProjectMock kind={project.mock} hue={project.hue} />
          )}
          {tilt && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/visual:opacity-100"
              style={{ background: glare }}
            />
          )}
        </div>
      </motion.div>

      {images.mobile && (
        <div className="relative -mt-24 ml-auto mr-4 w-[22%] min-w-[90px] overflow-hidden rounded-[1.25rem] border-4 border-[#1b1d22] shadow-2xl">
          <Image src={images.mobile} alt={`${title} on mobile`} width={390} height={844} className="h-auto w-full" />
        </div>
      )}
    </div>
  );
}
