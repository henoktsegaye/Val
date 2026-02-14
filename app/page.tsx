"use client";

import { useMemo, useState } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import WelcomeScreen from "@/components/WelcomeScreen";
import MemoryCarousel from "@/components/MemoryCarousel";

type Slide = {
  id: string;
  imageSrc: string;
  title: string;
  subtitle: string;
  bg: { a: string; b: string; c: string };
};

export default function Page() {
  // You can hardcode, or read from query param, etc.
  const [name] = useState("Selome");
  const [stage, setStage] = useState<"welcome" | "memories">("welcome");

  const slides: Slide[] = useMemo(() => {
    const imageFiles = [
      "20231224_165408.jpg",
      "IMG_1846.jpg",
      "IMG_1880.jpg",
      "IMG_3071.jpg",
      "IMG_3261.jpg",
      "IMG_4209.JPG",
      "IMG_5493.JPG",
      "IMG_5854.jpg",
      "IMG_7465.JPG",
      "IMG_7830.jpg",
    ];

    const subtitles = [
      "The day I asked you to be my girlfriend, and you looked so beautiful.",
      "It was your birthday, and I was so excited to celebrate with you.",
      "You looked so beautiful here.",
      "Our first-year anniversary.",
      "The moment I knew being away from you would never be easy.",
      "We went out and had a lovely Sunday together.",
      "One of my favorite snapshots.",
      "You looked more beautiful than the flowers, and I was so happy to celebrate you.",
      "We have gone to so many places together over the years.",
      "Still my favorite person.",
    ];

    const gradients = [
      { a: "#ff4d8d", b: "#1b0b1a", c: "#0b0b14" },
      { a: "#ffd1dc", b: "#3b1232", c: "#0b0b14" },
      { a: "#ff2d55", b: "#1a0b24", c: "#0b0b14" },
      { a: "#ff7aa8", b: "#10112a", c: "#0b0b14" },
      { a: "#ffe3ea", b: "#2a0f1f", c: "#0b0b14" },
    ];

    return imageFiles.map((file, i) => ({
      id: String(i + 1),
      imageSrc: `/${file}`,
      title: `Moment #${i + 1}`,
      subtitle: subtitles[i] ?? "A moment I'll always remember.",
      bg: gradients[i % gradients.length],
    }));
  }, []);

  return (
    <div className="relative h-dvh overflow-hidden">
      {/* Background glow layer driven by carousel state (passed via props) */}
      <div className="pointer-events-none absolute inset-0 opacity-90 z-0" id="bgLayer" />

      <div className="relative z-10 mx-auto flex h-dvh w-full max-w-[520px] flex-col px-4 py-4 min-h-0">
        {stage === "welcome" ? (
          <WelcomeScreen
            name={name}
            onStart={() => setStage("memories")}
          />
        ) : (
          <MemoryCarousel
            name={name}
            slides={slides}
            onBackToWelcome={() => setStage("welcome")}
          />
        )}
      </div>

      <FloatingHearts />
    </div>
  );
}
