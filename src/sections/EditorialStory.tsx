"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealOnScroll } from "@/components/RevealOnScroll";

type StatConfig = {
  label: string;
  value: string;
  isNumeric: boolean;
  targetNumber?: number;
  decimals?: number;
  suffix?: string;
};

const STATS: StatConfig[] = [
  {
    label: "Carbon Circular",
    value: "100%",
    isNumeric: true,
    targetNumber: 100,
    decimals: 0,
    suffix: "%",
  },
  {
    label: "Seam Tolerance",
    value: "0.4mm",
    isNumeric: true,
    targetNumber: 0.4,
    decimals: 1,
    suffix: "mm",
  },
  {
    label: "Hardware Alloy",
    value: "TITAN",
    isNumeric: false,
  },
  {
    label: "Origin Atelier",
    value: "PARIS",
    isNumeric: false,
  },
];

function StatCard({ stat, index }: { stat: StatConfig; index: number }) {
  const [displayValue, setDisplayValue] = useState(stat.isNumeric ? "0" + (stat.suffix || "") : stat.value);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.registerPlugin(ScrollTrigger);

    if (stat.isNumeric && stat.targetNumber !== undefined) {
      const target = stat.targetNumber;
      const decimals = stat.decimals || 0;
      const suffix = stat.suffix || "";
      const obj = { val: 0 };

      const tween = gsap.to(obj, {
        val: target,
        duration: 1.6,
        delay: index * 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          setDisplayValue((decimals > 0 ? obj.val.toFixed(decimals) : String(Math.floor(obj.val))) + suffix);
        },
      });

      return () => {
        tween.kill();
      };
    } else {
      const tween = gsap.fromTo(
        textRef.current,
        { opacity: 0, scale: 0.78, y: 10 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.75,
          delay: 0.15 + index * 0.12,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          },
        }
      );

      return () => {
        tween.kill();
      };
    }
  }, [stat, index]);

  return (
    <div
      ref={cardRef}
      className="group flex flex-col items-center bg-surface-0 p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-surface-3 hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.6)]"
    >
      <span
        ref={textRef}
        className="font-display text-3xl font-bold tracking-[-0.72px] text-ink-300 tabular-nums transition-colors duration-200 group-hover:text-accent"
      >
        {displayValue}
      </span>
      <span className="pt-1.5 font-mono text-[10px] uppercase tracking-[0.8px] text-ink-200">
        {stat.label}
      </span>
    </div>
  );
}

export function EditorialStory() {
  return (
    <section
      id="story"
      data-name="Section - CHAPTER 05: EDITORIAL STORY (FULL-BLEED CINEMATIC SPREAD)"
      className="relative flex flex-col items-center overflow-hidden bg-surface-deep px-6 py-24 md:px-16 md:py-40"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-10 left-0 right-0 select-none whitespace-nowrap text-center font-display font-black uppercase leading-none text-[16vw] tracking-[-0.05em] text-[rgba(32,31,31,0.3)] md:text-[10vw]"
      >
        PERMANENCE
      </span>

      <RevealOnScroll className="relative flex w-full max-w-4xl flex-col items-center text-center">
        <span className="pb-4 font-mono text-[11px] uppercase tracking-[3.3px] text-ink-300">
          Philosophical Codex
        </span>
        <h2 className="max-w-2xl font-display text-[clamp(2rem,6vw,3.5rem)] font-bold uppercase leading-[60px] tracking-[-1.68px] text-ink-100">
          Built for What Comes Next
        </h2>
        {/* Underline reveal line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 mt-3 h-0.5 w-32 origin-center bg-gradient-to-r from-transparent via-accent to-transparent"
        />

        <p className="max-w-2xl pb-16 font-body text-lg font-light leading-[29.25px] text-ink-200">
          NOIRÉ rejects seasonal obsolescence. We engineer garments as monumental objects that
          resist the entropic pull of trends. Through bonded carbon textiles and biometric
          pattern-making, our work exists in the continuum between human shelter and living
          sculpture.
        </p>

        <div className="mb-16 grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        <a
          href="#journal"
          className="group flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[1.1px] text-ink-300 transition-colors hover:text-ink-100"
        >
          Read Complete Manifesto
          <img
            src="/icons/arrow-right.svg"
            alt=""
            className="size-[10.667px] transition-transform duration-200 group-hover:translate-x-1"
          />
        </a>
      </RevealOnScroll>
    </section>
  );
}
