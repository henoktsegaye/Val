"use client";

import { motion } from "framer-motion";

export default function WelcomeScreen({
  name,
  onStart,
}: {
  name: string;
  onStart: () => void;
}) {
  return (
    <div className="flex h-[100dvh] flex-col min-h-0">
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.2, 0.9, 0.2, 1] }}
        className="card flex-1 p-5 min-h-0"
      >
        <div className="flex h-full flex-col justify-between gap-6 min-h-0">
          <div>
            <div className="text-xs tracking-[0.18em] text-white/70 uppercase">
              for Selome
            </div>

            <h1 className="mt-2 text-[30px] font-extrabold leading-[1.05] tracking-[-0.02em] display">
              Welcome {name}
            </h1>

            <p className="mt-2 text-sm leading-relaxed text-white/80">
              Happy Valentine's Day. I made something small... just to replay our memories.
              <span className="block mt-2 text-xs text-white/65">- Henok</span>
            </p>

            <div className="mt-4 rounded-2xl border border-red-400/70 bg-red-500/10 px-4 py-3 text-sm leading-relaxed text-white/90">
              <span className="font-extrabold text-red-200">Love:</span>{" "}
              I like you as a person, and you have been here for me, which I
              appreciate so much. I love you.
            </div>
          </div>

          <div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  (window as any).__valentineBurst?.();
                  onStart();
                }}
                className="btnPrimary"
              >
                Replay memory
              </button>

              <button
                onClick={() => (window as any).__valentineBurst?.()}
                className="btnGhost"
              >
                Send hearts
              </button>
            </div>

            <p className="mt-3 text-xs text-white/60">
              Tip: swipe cards like Instagram stories.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
