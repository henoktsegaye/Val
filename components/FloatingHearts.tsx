"use client";

import { useEffect, useRef } from "react";

function rand(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

export default function FloatingHearts() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let alive = true;
    let intervalId: number | null = null;

    function spawnHeart(x?: number, y?: number, big?: boolean) {
      if (!alive) return;

      const heart = document.createElement("div");
      heart.className = "heart";

      const size = big ? rand(1.2, 1.8) : rand(0.7, 1.25);
      const dur = big ? rand(4.8, 7.2) : rand(4.0, 6.6);
      const rise = rand(window.innerHeight * 0.65, window.innerHeight * 1.15);

      const startX = x ?? rand(0, window.innerWidth);
      const startY = y ?? window.innerHeight + 40;

      const huePick = Math.random();
      const color =
        huePick < 0.6
          ? "rgba(255,77,141,.95)"
          : huePick < 0.9
          ? "rgba(255,45,85,.92)"
          : "rgba(255,209,220,.92)";

      heart.style.left = `${startX}px`;
      heart.style.top = `${startY}px`;
      heart.style.setProperty("--s", `${size}`);
      heart.style.setProperty("--dur", `${dur}s`);
      heart.style.setProperty("--rise", `${rise}px`);
      heart.style.color = color;

      const drift = rand(-70, 70);
      heart.style.marginLeft = `${drift}px`;

      host.appendChild(heart);

      window.setTimeout(() => heart.remove(), dur * 1000 + 250);
    }

    function burst() {
      const cx = window.innerWidth * 0.5;
      const cy = window.innerHeight * 0.32;
      for (let i = 0; i < 26; i++) {
        window.setTimeout(() => {
          spawnHeart(cx + rand(-140, 140), cy + rand(-30, 120), true);
        }, i * 24);
      }
    }

    intervalId = window.setInterval(() => spawnHeart(), 420);

    const onPointerDown = (e: PointerEvent) => {
      // avoid spamming during carousel swipes (handled elsewhere)
      const target = e.target as HTMLElement | null;
      if (target?.closest?.("[data-no-hearts]")) return;
      spawnHeart(e.clientX, e.clientY, false);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "h") burst();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);

    const onVisibility = () => {
      if (document.hidden) {
        if (intervalId) window.clearInterval(intervalId);
        intervalId = null;
      } else if (!intervalId) {
        intervalId = window.setInterval(() => spawnHeart(), 420);
      }
    };

    document.addEventListener("visibilitychange", onVisibility);

    // Expose a tiny hook for other components (optional)
    (window as any).__valentineBurst = burst;

    return () => {
      alive = false;
      if (intervalId) window.clearInterval(intervalId);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("visibilitychange", onVisibility);
      host.innerHTML = "";
      delete (window as any).__valentineBurst;
    };
  }, []);

  return <div ref={hostRef} className="heartsLayer" aria-hidden="true" />;
}
