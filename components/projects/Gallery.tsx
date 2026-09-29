"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function Gallery({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const close = () => setIndex(null);
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + images.length) % images.length)), [images.length]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setIndex(i)}
            className={`group relative overflow-hidden rounded-2xl border border-line ${i === 0 && images.length % 2 === 1 ? "sm:col-span-2" : ""}`}
          >
            <Image src={src} alt={`${title} screenshot ${i + 1}`} width={1920} height={1080} sizes="(min-width: 768px) 50vw, 100vw" className="h-auto w-full transition duration-700 group-hover:scale-[1.03]" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {index !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur"
            onClick={close}
            role="dialog"
            aria-modal
            aria-label={`${title} screenshots`}
          >
            <motion.div key={index} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="relative max-h-[85vh] w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
              <Image src={images[index]} alt={`${title} screenshot ${index + 1}`} width={1920} height={1080} className="mx-auto h-auto max-h-[85vh] w-auto rounded-xl object-contain" />
            </motion.div>
            <button type="button" aria-label="Close" onClick={close} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <X className="h-5 w-5" />
            </button>
            {images.length > 1 && (
              <>
                <button type="button" aria-label="Previous" onClick={(e) => (e.stopPropagation(), step(-1))} className="absolute left-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button type="button" aria-label="Next" onClick={(e) => (e.stopPropagation(), step(1))} className="absolute right-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
                  <ChevronRight className="h-5 w-5" />
                </button>
                <span className="absolute bottom-6 font-mono text-xs text-white/60">
                  {index + 1} / {images.length}
                </span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
