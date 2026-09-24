"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useBag } from "@/context/BagContext";

const ProductTurntable = dynamic(() => import("@/components/ProductTurntable"), {
  ssr: false,
});

const SIZES = ["39", "40", "41", "42", "43", "44"];
const FINISHES = [
  { name: "Obsidian / Shadow Chrome", color: "#111111", ring: true },
  { name: "Slate", color: "#2a2a2a", ring: false },
  { name: "Signal Orange", color: "#ff5637", ring: false },
];

/**
 * Page-local animation language for CHAPTER 04 only — a premium, cinematic
 * reveal as the section enters view, plus a subtle scroll-linked parallax on
 * the product stage. Nothing here is shared outside this file.
 */
const EASE = [0.22, 1, 0.36, 1] as const;

const headerGroup: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const headerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const showcaseGrid: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};
const stageReveal: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.1, ease: EASE } },
};
const panelReveal: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE, staggerChildren: 0.1, delayChildren: 0.15 },
  },
};
const panelItem: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const swatchGroup: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const swatchItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

const sizeGroup: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};
const sizeItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

export function ProductShowcase() {
  const [degrees, setDegrees] = useState(0);
  const [selectedSize, setSelectedSize] = useState("41");
  const [selectedFinish, setSelectedFinish] = useState(0);
  const { addItem } = useBag();

  const sectionRef = useRef<HTMLElement>(null);
  const magneticRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const interactive = !prefersReducedMotion;

  const stageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "end start"],
  });
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], interactive ? [0.97, 1, 0.98] : [1, 1, 1]);
  const rawY = useTransform(scrollYProgress, [0, 0.5, 1], interactive ? [14, 0, -14] : [0, 0, 0]);
  const stageScale = useSpring(rawScale, { stiffness: 90, damping: 20, mass: 0.5 });
  const stageY = useSpring(rawY, { stiffness: 90, damping: 20, mass: 0.5 });

  // GSAP Desktop Pinning
  useEffect(() => {
    if (!interactive || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      // Only pin when the whole section fits below the header — otherwise the
      // configurator's CTA would sit off-screen for the length of the pin.
      if (section.offsetHeight > window.innerHeight - 80) return;
      ScrollTrigger.create({
        trigger: section,
        start: "top 80px",
        end: "+=480",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });
    });

    return () => mm.revert();
  }, [interactive]);

  // Magnetic button physics for "ADD SPECIMEN TO BAG"
  useEffect(() => {
    const btn = magneticRef.current;
    if (!btn || !interactive) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      gsap.to(btn, {
        x: x * 0.32,
        y: y * 0.32,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.65,
        ease: "elastic.out(1, 0.4)",
      });
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [interactive]);

  const handleAddToBag = () => {
    const finish = FINISHES[selectedFinish].name.split(" / ")[0];
    addItem({
      id: `aero-form-01-${selectedSize}-${finish.toLowerCase()}`,
      name: "Aero Form 01",
      image: "/images/product-aero-form.png",
      variant: `SIZE: ${selectedSize} · ${finish.toUpperCase()}`,
      price: 420,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="showcase"
      data-name="Section - CHAPTER 04: 3D INTERACTIVE PRODUCT SHOWCASE (AERO FORM 01)"
      className="flex flex-col gap-10 bg-surface-0 px-6 py-20 md:px-16 md:py-24"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={headerGroup}
        className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-end"
      >
        <div className="flex flex-col gap-2">
          <motion.div variants={headerItem} className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-ink-300" />
            <span className="font-mono font-medium text-[11px] uppercase tracking-[1.1px] text-ink-300">
              Laboratory Stage 01 // 360° Inspector
            </span>
          </motion.div>
          <motion.h2
            variants={headerItem}
            className="font-display font-bold uppercase leading-[1.07] tracking-[-0.03em] text-[clamp(2.25rem,6vw,3.5rem)] text-ink-100"
          >
            Aero Form 01
          </motion.h2>
        </div>
        <motion.div variants={headerItem} className="flex flex-wrap items-center gap-x-4 gap-y-2 whitespace-nowrap">
          <span className="font-mono text-xs tracking-[0.24px] text-ink-200">
            ROTATION DEGREE: <span className="font-medium text-ink-300">{String(degrees).padStart(3, "0")}°</span>
          </span>
          <span className="bg-surface-3 px-2 py-1 font-mono text-xs tracking-[0.24px] text-ink-100">
            DRAG TO PIVOT
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={showcaseGrid}
        className="grid grid-cols-1 overflow-hidden bg-surface-deep shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] lg:grid-cols-12"
      >
        {/* Interactive stage */}
        <motion.div
          ref={stageRef}
          variants={stageReveal}
          className="relative col-span-1 flex h-[420px] items-center justify-center overflow-hidden p-4 sm:h-[520px] lg:col-span-7 lg:h-[640px] xl:col-span-8"
        >
          {/* Scroll-linked parallax wrapper — visuals only, independent of the turntable's own drag/rotation state. */}
          <motion.div style={{ scale: stageScale, y: stageY }} className="absolute inset-0">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(154,203,255,0.06) 0%, rgba(154,203,255,0) 70%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-12 left-1/4 right-1/4 h-8 rounded-full bg-[rgba(42,42,42,0.4)] blur-[12px]"
            />
            <ProductTurntable imageUrl="/images/showcase-shoe.png" onDegreesChange={setDegrees} />
          </motion.div>

          <div className="pointer-events-none absolute bottom-6 left-6 flex items-center gap-2">
            <img src="/icons/drag-hand.svg" alt="" className="h-3.5 w-3" />
            <span className="font-mono text-[10px] text-ink-200">
              DRAG HORIZONTALLY TO ROTATE ARCHITECTURE
            </span>
          </div>
        </motion.div>

        {/* Configurator */}
        <motion.div
          variants={panelReveal}
          className="col-span-1 flex flex-col justify-between gap-10 bg-surface-2 p-6 sm:p-10 lg:col-span-5 lg:p-8 xl:col-span-4 xl:p-10"
        >
          <div className="flex flex-col gap-2">
            <motion.div variants={panelItem} className="flex items-center justify-between gap-3">
              <span className="font-mono font-medium text-[11px] uppercase tracking-[0.55px] text-ink-200">
                Footwear Artifact
              </span>
              <span className="shrink-0 bg-surface-3 px-2 py-0.5 font-mono text-xs tracking-[0.24px] text-ink-300">
                ED. 120 PAIRS
              </span>
            </motion.div>
            <motion.h3
              variants={panelItem}
              className="font-display font-semibold uppercase leading-[1.15] tracking-[-0.72px] text-[clamp(1.75rem,5vw,2.25rem)] text-ink-100"
            >
              Aero Form 01
            </motion.h3>
            <motion.p variants={panelItem} className="flex items-baseline gap-2">
              <span className="font-display font-bold text-2xl tracking-[-0.24px] text-ink-300">
                $420.00
              </span>
              <span className="font-mono text-xs tracking-[0.24px] text-ink-200">USD</span>
            </motion.p>
            <motion.p
              variants={panelItem}
              className="pt-4 font-body text-[13px] leading-[21.13px] tracking-[0.13px] text-ink-200"
            >
              Constructed with a continuous curvilinear chassis. The shoe eliminates traditional
              stitching in favor of high-frequency ultrasonic fusion.
            </motion.p>

            <motion.div variants={panelItem} className="flex flex-col gap-2 pt-4">
              <div className="flex items-baseline justify-between gap-3">
                <span className="shrink-0 font-mono font-medium text-[11px] uppercase tracking-[1.32px] text-ink-200">
                  Finish
                </span>
                <span className="text-right font-mono font-medium text-[11px] uppercase tracking-[1.32px] text-ink-100">
                  {FINISHES[selectedFinish].name}
                </span>
              </div>
              <motion.div
                variants={swatchGroup}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
                className="flex items-center gap-2"
              >
                {FINISHES.map((finish, i) => (
                  <motion.button
                    key={finish.name}
                    variants={swatchItem}
                    aria-label={finish.name}
                    onClick={() => setSelectedFinish(i)}
                    whileTap={{ scale: 0.88 }}
                    animate={selectedFinish === i ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`flex size-9 items-center justify-center bg-surface-3 p-1 transition-shadow duration-200 ${
                      selectedFinish === i ? "shadow-[0_0_0_2px_var(--color-ink-300)] ring-2 ring-accent/30" : ""
                    }`}
                  >
                    <span
                      className="size-full"
                      style={{ backgroundColor: finish.color }}
                    />
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>

            <motion.div variants={panelItem} className="flex flex-col gap-2 pt-4">
              <div className="flex items-center justify-between">
                <span className="font-mono font-medium text-[11px] uppercase tracking-[1.32px] text-ink-200">
                  Select Size (EU)
                </span>
                <button className="font-mono font-medium text-[11px] uppercase tracking-[1.32px] text-ink-200 underline underline-offset-2 hover:text-ink-300">
                  Size Guide
                </button>
              </div>
              <motion.div
                variants={sizeGroup}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
                className="flex flex-wrap gap-2"
              >
                {SIZES.map((size) => (
                  <motion.button
                    key={size}
                    variants={sizeItem}
                    onClick={() => setSelectedSize(size)}
                    whileTap={{ scale: 0.9 }}
                    animate={selectedSize === size ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className={`px-3.5 py-2.5 font-mono text-xs tracking-[0.24px] transition-colors duration-200 ${
                      selectedSize === size
                        ? "bg-border-1 font-medium text-ink-300 shadow-[0_0_12px_rgba(255,180,165,0.25)]"
                        : "bg-surface-3 text-ink-100 hover:bg-surface-4"
                    }`}
                  >
                    {size}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          </div>

          <div className="flex flex-col gap-2">
            {/* GSAP drives the magnetic pull on this wrapper; Framer animates the button inside. */}
            <div ref={magneticRef} className="will-change-transform">
              <motion.button
                variants={panelItem}
                onClick={handleAddToBag}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex w-full items-center justify-center gap-3 bg-ink-100 py-4 font-mono font-medium text-[11px] uppercase tracking-[1.1px] text-surface-0 transition-shadow duration-200 ease-out hover:shadow-[0_12px_28px_-8px_rgba(255,255,255,0.3)]"
              >
                <img src="/icons/bag-outline.svg" alt="" className="h-[15px] w-3" />
                Add Specimen to Bag
              </motion.button>
            </div>
            <motion.div variants={panelItem} className="flex items-center justify-between px-1 py-2">
              <span className="font-mono text-[11px] leading-6 text-ink-200">
                AUTHENTICITY CHIP
                <br />
                EMBEDDED
              </span>
              <span className="font-mono text-[11px] leading-6 text-ink-200">
                SHIPS GLOBALLY IN
                <br />
                48H
              </span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
