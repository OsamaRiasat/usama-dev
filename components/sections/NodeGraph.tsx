"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number };
type Packet = { a: number; b: number; t: number; speed: number };

/**
 * An ambient agent/RAG-style network: drifting nodes, links between neighbours,
 * and accent "packets" that travel along the links. Nodes lean toward the cursor.
 */
export default function NodeGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, frame = 0;
    let nodes: Node[] = [];
    const packets: Packet[] = [];
    const mouse = { x: -9999, y: -9999 };
    let colors = { fg: "255,255,255", accent: "200,240,49" };
    const LINK = 150;
    const LINK2 = LINK * LINK;
    const NEAR2 = 180 * 180;
    let near: boolean[] = [];

    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      const toRgb = (hex: string) => {
        const v = hex.trim().replace("#", "");
        const n = parseInt(v.length === 3 ? v.split("").map((c) => c + c).join("") : v, 16);
        return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
      };
      colors = { fg: toRgb(s.getPropertyValue("--fg")), accent: toRgb(s.getPropertyValue("--accent")) };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const prevW = w, prevH = h;
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Height-only changes (e.g. a mobile URL bar collapsing) rescale instead of reseeding.
      if (nodes.length && prevW === w) {
        for (const n of nodes) n.y *= h / prevH;
        return;
      }
      const count = Math.round(Math.min(90, (w * h) / 14000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.8,
      }));
      packets.length = 0;
    };

    const spawnPacket = () => {
      const a = Math.floor(Math.random() * nodes.length);
      let best = -1, bestD = Infinity;
      nodes.forEach((n, i) => {
        if (i === a) return;
        const d = Math.hypot(n.x - nodes[a].x, n.y - nodes[a].y);
        if (d < LINK && d < bestD && Math.random() > 0.3) {
          best = i;
          bestD = d;
        }
      });
      if (best >= 0) packets.push({ a, b: best, t: 0, speed: 0.008 + Math.random() * 0.012 });
    };

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        const dx = mouse.x - n.x, dy = mouse.y - n.y;
        const d = Math.hypot(dx, dy);
        if (d < 200 && d > 1) {
          n.vx += (dx / d) * 0.012;
          n.vy += (dy / d) * 0.012;
        }
        n.vx *= 0.985;
        n.vy *= 0.985;
        n.vx += (Math.random() - 0.5) * 0.01;
        n.vy += (Math.random() - 0.5) * 0.01;
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      near = nodes.map((n) => (mouse.x - n.x) ** 2 + (mouse.y - n.y) ** 2 < NEAR2);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d2 = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
          if (d2 < LINK2) {
            const d = Math.sqrt(d2);
            ctx.strokeStyle = near[i] ? `rgba(${colors.accent},${(1 - d / LINK) * 0.5})` : `rgba(${colors.fg},${(1 - d / LINK) * 0.12})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n, i) => {
        ctx.fillStyle = near[i] ? `rgba(${colors.accent},0.95)` : `rgba(${colors.fg},0.45)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, near[i] ? n.r + 1 : n.r, 0, Math.PI * 2);
        ctx.fill();
      });

      if (frame % 14 === 0 && packets.length < 18) spawnPacket();
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.t += p.speed;
        const a = nodes[p.a], b = nodes[p.b];
        if (p.t >= 1 || !a || !b) {
          packets.splice(i, 1);
          continue;
        }
        const x = a.x + (b.x - a.x) * p.t, y = a.y + (b.y - a.y) * p.t;
        ctx.fillStyle = `rgba(${colors.accent},1)`;
        ctx.shadowColor = `rgba(${colors.accent},0.8)`;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => ((mouse.x = -9999), (mouse.y = -9999));

    // Pause when off-screen.
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting) raf = requestAnimationFrame(draw);
    });

    // Re-read theme colours only when the theme actually changes.
    const themeObserver = new MutationObserver(readColors);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const ro = new ResizeObserver(resize);

    readColors();
    resize();
    io.observe(canvas);
    ro.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />;
}
