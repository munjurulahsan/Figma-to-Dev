"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { markPreloaderDone } from "@/lib/scroll";

export function Preloader() {
  const [complete, setComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // If reduced motion is requested, complete immediately
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      const id = requestAnimationFrame(() => {
        setComplete(true);
        markPreloaderDone();
      });
      return () => cancelAnimationFrame(id);
    }

    const container = containerRef.current;
    const text = textRef.current;
    const line = lineRef.current;
    const counter = counterRef.current;
    if (!container || !text || !line || !counter) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setComplete(true);
          markPreloaderDone();
        },
      });

      // Split brand letters
      const letters = text.querySelectorAll(".brand-char");

      // Set initial states
      gsap.set(container, { display: "flex", opacity: 1 });
      gsap.set(letters, { y: 60, opacity: 0 });
      gsap.set(line, { scaleX: 0 });

      // Animate counter from 0 to 100
      const counterObj = { val: 0 };
      tl.to(
        counterObj,
        {
          val: 100,
          duration: 1.2,
          ease: "power2.inOut",
          onUpdate: () => {
            counter.textContent = String(Math.floor(counterObj.val)).padStart(3, "0");
          },
        },
        0
      );

      // Animate line scale
      tl.to(
        line,
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power2.inOut",
        },
        0
      );

      // Stagger letters reveal
      tl.to(
        letters,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
        },
        0.2
      );

      // Hold briefly at 100%
      tl.to({}, { duration: 0.2 });

      // Exit transition: letters lift out
      tl.to(
        letters,
        {
          y: -40,
          opacity: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: "power3.in",
        },
        "+=0.1"
      );

      // Slide up curtain
      tl.to(container, {
        yPercent: -100,
        duration: 0.9,
        ease: "expo.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  if (complete) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface-deep text-ink-100"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Subtitle / Chapter indicator */}
        <span className="font-mono text-[10px] tracking-[4px] uppercase text-ink-300">
          Atelier Édition // 2026
        </span>

        {/* Brand Name with overflow clip */}
        <div className="overflow-hidden py-1">
          <h1
            ref={textRef}
            className="flex items-center gap-2 font-display text-5xl font-extrabold tracking-[-1.5px] uppercase sm:text-7xl"
          >
            {"NOIRÉ".split("").map((char, i) => (
              <span key={i} className="brand-char inline-block will-change-transform">
                {char}
              </span>
            ))}
          </h1>
        </div>

        {/* Loading Progress Bar & Percentage */}
        <div className="flex w-48 flex-col items-center gap-2">
          <div className="h-0.5 w-full overflow-hidden bg-surface-3">
            <div
              ref={lineRef}
              className="h-full w-full origin-left scale-x-0 bg-accent shadow-[0_0_10px_rgba(255,86,55,0.8)]"
            />
          </div>
          <div className="flex w-full justify-between font-mono text-[11px] text-ink-200">
            <span>CALIBRATING</span>
            <span ref={counterRef}>000</span>
          </div>
        </div>
      </div>
    </div>
  );
}
