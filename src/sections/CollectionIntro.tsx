"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { RevealOnScroll } from "@/components/RevealOnScroll";

/**
 * Collection Intro — 1:1 port of Figma node 1:111
 * "Section - CHAPTER 03: COLLECTION INTRO (THE NEW SILHOUETTE)".
 *
 * Figma canvas 1280 wide, `px-64 py-96`, `gap-64`. The header row is a
 * 264 / 560 / 264 track split with a 32px gutter (expressed as `fr` so it stays
 * proportional below 1280 and lands exact at 1280). The pillar grid is Figma's
 * 12-column / 32px-gutter grid with each pillar spanning 4 — identical to three
 * equal columns with the same gutter — staggered 0 / +64 / −32.
 *
 * Each pillar's plate also carries a scroll-linked parallax (image drifts,
 * card lifts and settles) driven by its own position in the viewport, so the
 * section keeps animating continuously as the visitor scrolls rather than
 * only firing once on first reveal.
 */

type Pillar = {
  tag: string;
  caption: string;
  title: string[];
  body: string;
  specs: string;
  image: string;
  /** Figma vertical stagger for the asymmetric display. */
  offset: string;
  /** Figma applies a white `mix-blend-saturation` overlay to pillar 01 only. */
  desaturated: boolean;
  /** Figma crop maps to `cover`; pillar 01 is anchored to the top edge. */
  objectPosition: string;
};

const PILLARS: Pillar[] = [
  {
    tag: "01 / FORM",
    caption: "VOID COLLAR TUNIC",
    title: ["HYPER-CONSTRUCTED", "LAPEL"],
    body: "Precision-creased bonded wool contours the cervical vertebra, creating an erect, imperious silhouette that defies conventional tailoring gravity.",
    specs: "SPECS: 620GSM BONDED MELTON WOOL",
    image: "/images/pillar-form.png",
    offset: "",
    desaturated: true,
    objectPosition: "object-top",
  },
  {
    tag: "02 / MOTION",
    caption: "AERO FORM 01",
    title: ["DYNAMIC BIOMECHANICS"],
    body: "Calculated flex zones with lightweight carbon stabilizer shanks provide instantaneous kinetic return without aesthetic compromise.",
    specs: "SPECS: CARBON-FIBER TORQUE PLATE",
    image: "/images/pillar-motion.png",
    offset: "lg:mt-16",
    desaturated: false,
    objectPosition: "object-center",
  },
  {
    tag: "03 / STRUCTURE",
    caption: "TITANIUM CARRIER",
    title: ["ARCHIVAL HARDWARE"],
    body: "Custom sand-cast bronze and titanium fastenings machined to aerospace tolerance ratings, sealed against external humidity and decay.",
    specs: "SPECS: GRADE 5 TITANIUM ZIP TEETH",
    image: "/images/pillar-structure.png",
    offset: "lg:-mt-8",
    desaturated: false,
    objectPosition: "object-center",
  },
];

/** One pillar card with its own scroll-linked parallax, tracked against its position in the viewport. */
function PillarCard({ pillar, index }: { pillar: Pillar; index: number }) {
  const cardRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const interactive = !prefersReducedMotion;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], interactive ? [-36, 36] : [0, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], interactive ? [1, 1.05, 1] : [1, 1, 1]);
  const cardY = useTransform(scrollYProgress, [0, 0.5, 1], interactive ? [48, 0, -24] : [0, 0, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.6]);

  return (
    <RevealOnScroll
      delay={index * 0.15}
      className={`${pillar.offset} ${index === 2 ? "md:col-span-2 md:mx-auto md:w-[calc(50%-20px)] lg:col-span-1 lg:w-auto" : ""}`}
    >
      <motion.article
        ref={cardRef}
        style={{ y: cardY, opacity }}
        className="group flex flex-col will-change-transform"
      >
        {/* Background — node 1:143 (bg #201f1f, overflow-clip, image 362.67×453.31 = 4/5) */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-3 transition-[transform,box-shadow] duration-500 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.8)]">
          <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-[-40px] will-change-transform">
            <Image
              src={pillar.image}
              alt={pillar.caption}
              fill
              sizes="(min-width: 1280px) 363px, (min-width: 1024px) 30vw, (min-width: 768px) 46vw, 100vw"
              className={`object-cover ${pillar.objectPosition} transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.04] ${
                pillar.desaturated ? "saturate-0 group-hover:saturate-100" : ""
              }`}
            />
          </motion.div>

          {/* Accent rule that draws in on hover */}
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-ink-300 transition-transform duration-500 ease-out group-hover:scale-x-100"
          />

          {/* Overlay+OverlayBlur — node 1:145 (left/top 16, px-10 py-4) */}
          <span className="absolute left-4 top-4 bg-[rgba(14,14,14,0.8)] px-2.5 py-1 font-mono text-[11px] font-medium leading-[14px] tracking-[1.32px] text-ink-300 backdrop-blur-[4px] transition-colors duration-300 ease-out group-hover:bg-ink-300 group-hover:text-surface-0">
            {pillar.tag}
          </span>

          {/* Overlay — node 1:147 (left 16, bottom 16, px-8 py-4) */}
          <span className="absolute bottom-4 left-4 bg-[rgba(19,19,19,0.9)] px-2 py-1 font-mono text-[11px] leading-6 text-ink-100 transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
            {pillar.caption}
          </span>
        </div>

        {/* Heading 3 — node 1:136 (Syne SemiBold 24px / 30px / -0.24px), 16px below image */}
        <h3 className="mt-4 font-display text-[24px] font-semibold uppercase leading-[30px] tracking-[-0.24px] text-ink-100 transition-colors duration-300 ease-out group-hover:text-ink-300">
          {pillar.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h3>

        {/* Body — node 1:139 (Hanken Grotesk 13px / 21.13px / 0.13px), 8px below heading */}
        <p className="mt-2 font-body text-[13px] leading-[21.13px] tracking-[0.13px] text-ink-200">
          {pillar.body}
        </p>

        {/* Specs — node 1:141 (JetBrains Mono 12px / 16px / 0.24px), 12px below body */}
        <span className="mt-3 w-fit font-mono text-[12px] leading-4 tracking-[0.24px] text-ink-300">
          <span className="bg-gradient-to-r from-ink-300 to-ink-300 bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_1px]">
            {pillar.specs}
          </span>
        </span>
      </motion.article>
    </RevealOnScroll>
  );
}

export function CollectionIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const interactive = !prefersReducedMotion;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headingX = useTransform(scrollYProgress, [0, 0.5], interactive ? [-24, 0] : [0, 0]);

  return (
    <section
      ref={sectionRef}
      id="collection"
      data-node-id="1:111"
      data-name="Section - CHAPTER 03: COLLECTION INTRO (THE NEW SILHOUETTE)"
      className="w-full overflow-hidden bg-surface-deep"
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-16 px-6 py-20 md:px-16 md:py-24">
        {/* Header row — node 1:112 (264 / 560 / 264, gap-32, items-end) */}
        <RevealOnScroll className="flex flex-col gap-8 lg:grid lg:grid-cols-[1fr_2fr] lg:items-end xl:grid-cols-[264fr_560fr_264fr] xl:gap-8">
          {/* Container — node 1:113 (w-264, gap-8) */}
          <motion.div style={{ x: headingX }} className="flex flex-col gap-2">
            {/* Container — node 1:114 (gap-8) */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-medium uppercase leading-[14px] tracking-[1.32px] text-ink-300">
                03
              </span>
              <span className="h-px w-8 shrink-0 bg-ink-300" />
              <span className="font-mono text-[11px] font-medium uppercase leading-[14px] tracking-[1.32px] text-ink-300">
                Manifesto
              </span>
            </div>
            {/* Heading 2 — node 1:121 (Syne Bold 56px / 60px / -1.68px) */}
            <h2 className="font-display text-[clamp(2.25rem,4.375vw,56px)] font-bold uppercase leading-[1.0714] tracking-[-0.03em] text-ink-100">
              The
              <br />
              New
              <br />
              Silhouette
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2 h-0.5 w-28 origin-left bg-gradient-to-r from-accent to-ink-300"
            />
          </motion.div>

          {/* Container — node 1:122 (w-560) */}
          <p className="font-body text-[18px] font-light leading-[29.25px] tracking-[-0.18px] text-ink-100">
            Garments should not mimic nature; they should architect new biological forms. NOIRÉ
            interrogates the tension between raw organic anatomy and brutalist technical drafting.
            Each garment acts as an exoskeleton of quiet power.
          </p>

          {/* Container — node 1:124 (w-264, items-start justify-end) */}
          <div className="flex lg:col-span-2 xl:col-span-1 xl:justify-end">
            {/* Background — node 1:125 (bg #201f1f, p-16, gap-8) */}
            <div className="flex w-full flex-col gap-2 bg-surface-3 p-4 transition-colors duration-300 ease-out hover:bg-surface-4 sm:w-auto">
              <span className="font-mono text-[11px] font-medium uppercase leading-[14px] tracking-[1.32px] text-ink-200">
                Curatorial Core
              </span>
              <span className="font-mono text-[12px] font-medium leading-4 tracking-[0.24px] text-ink-300">
                32 PIECES // 04 PHASES
              </span>
              <span className="font-mono text-[11px] leading-6 text-ink-200">
                HAND-CONSTRUCTED IN PARIS
              </span>
            </div>
          </div>
        </RevealOnScroll>

        {/* Triple Editorial Pillar Asymmetric Display — node 1:132 (12-col grid, gap-32) */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {PILLARS.map((pillar, i) => (
            <PillarCard key={pillar.tag} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
