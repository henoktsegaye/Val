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
      "IMG_1846.jpg",
      "IMG_1880.jpg",
      "IMG_3071.jpg",
      "IMG_3261.jpg",
      "IMG_4209.JPG",
      "IMG_5493.JPG",
      "20231224_165408.jpg",
      "IMG_5854.jpg",
      "IMG_7465.JPG",
      "IMG_7830.jpg",
    ];

    const subtitles = [
      "It was your birthday and I was so excited to celebrate that with you",
      "You looked unreal here.",
      "It was our 1st year anniversary",
      "This is the moment I knew separating from you was not easy",
      "We went out and had a lovely day on a sunday",
      "One of my favorite snapshots.",
      "You look more beautiful than the flower and always happy to celebrate you.",
      "You, and my borch.",
      "We have gone to so many places over the years.",
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
