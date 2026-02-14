"use client";

import Image from "next/image";
import { motion, PanInfo, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Slide = {
  id: string;
  imageSrc: string;
  title: string;
  subtitle: string;
  bg: { a: string; b: string; c: string };
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function MemoryCarousel({
  name,
  slides,
  onBackToWelcome,
}: {
  name: string;
  slides: Slide[];
  onBackToWelcome: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  const current = slides[index];

  // Update background gradient on slide change
  useEffect(() => {
    const el = document.getElementById("bgLayer");
    if (!el) return;
    const { a, b, c } = current.bg;

    el.style.background = `
      radial-gradient(900px 600px at 20% 15%, ${a}33, transparent 60%),
      radial-gradient(900px 650px at 85% 20%, ${b}33, transparent 60%),
      radial-gradient(900px 650px at 50% 90%, ${a}22, transparent 60%),
      linear-gradient(180deg, ${c}, #140a16)
    `;
  }, [current]);

  const topLine = useMemo(() => {
    if (done) return `Excited for what is ahead, ${name}...`;
    return `${current.title}`;
  }, [done, current.title, name]);

  const subLine = useMemo(() => {
    if (done) return "More memories. More laughs. More love.";
    return current.subtitle;
  }, [done, current.subtitle]);

  function goNext() {
    const next = index + 1;
    if (next >= slides.length) {
      setDone(true);
      return;
    }
    setIndex(next);
  }

  function replay() {
    setDone(false);
    setIndex(0);
    (window as any).__valentineBurst?.();
  }

  function onDragEnd(_: any, info: PanInfo) {
    if (done) return;

    const swipePower = Math.abs(info.offset.x) * info.velocity.x;
    // Right swipe (previous)
    if (info.offset.x > 80) {
      setIndex((v) => clamp(v - 1, 0, slides.length - 1));
      return;
    }
    // Left swipe (next)
    if (info.offset.x < -80 || swipePower < -1200) {
      goNext();
      return;
    }
  }

  return (
    <div className="flex h-[100dvh] flex-col gap-3 min-h-0">
      <div className="card p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-white/70">
              {done ? "the future" : "memory replay"}
            </div>
            <div className="mt-1 text-base font-extrabold tracking-[-0.01em] display">
              {topLine}
            </div>
            <div className="mt-1 text-xs text-white/70">{subLine}</div>
          </div>

          <div className="text-xs text-white/60">
            {done ? (
              <span>End</span>
            ) : (
              <span>
                {index + 1}/{slides.length}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="relative flex-1 min-h-0 max-h-[56dvh]">
        <div
          className="card h-full overflow-hidden"
          data-no-hearts
        >
          <div className="relative h-full w-full">
            <AnimatePresence mode="popLayout">
              {done ? (
                <motion.div
                  key="end"
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: 10 }}
                  transition={{ duration: 0.5, ease: [0.2, 0.9, 0.2, 1] }}
                  className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
                >
                  <div className="text-5xl">Love</div>
                  <div className="mt-3 text-xl font-extrabold display">
                    Excited for what is ahead...
                  </div>
                  <div className="mt-2 text-sm text-white/75 leading-relaxed">
                    If I could, I'd replay everything again - and still choose you.
                  </div>

                  <div className="mt-5 flex gap-2">
                    <button onClick={replay} className="btnPrimary">
                      Replay
                    </button>
                    <button onClick={onBackToWelcome} className="btnGhost">
                      Back
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: 10 }}
                  transition={{ duration: 0.5, ease: [0.2, 0.9, 0.2, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.14}
                  onDragEnd={onDragEnd}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0">
                    <Image
                      src={current.imageSrc}
                      alt={current.title}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 520px) 100vw, 520px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/60" />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl px-4 py-3">
                      <div className="text-sm font-extrabold display">
                        {current.title}
                      </div>
                      <div className="mt-1 text-xs text-white/75">
                        {current.subtitle}
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="text-xs text-white/60">
                          Swipe left to continue 
                        </div>
                        <button
                          onClick={() => goNext()}
                          className="btnMini"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {!done && (
        <div className="mt-auto space-y-2">
          <div className="flex justify-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                aria-label={`Go to ${i + 1}`}
                className={i === index ? "dotActive" : "dot"}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setIndex((v) => clamp(v - 1, 0, slides.length - 1))}
              className="btnGhost"
            >
              Prev
            </button>
            <button onClick={() => (window as any).__valentineBurst?.()} className="btnGhost">
              Hearts
            </button>
            <button onClick={() => goNext()} className="btnPrimary">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
