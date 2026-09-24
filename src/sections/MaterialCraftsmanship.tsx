"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/RevealOnScroll";

const SPECS = [
  { label: "Abrasion Resistance Index", value: "99.4%", pct: 99, color: "bg-ink-300" },
  { label: "Thermal Conductivity Dampening", value: "88.2%", pct: 88, color: "bg-accent" },
];

export function MaterialCraftsmanship() {
  return (
    <section
      id="material"
      data-name="Section - CHAPTER 07: MATERIAL & CRAFTSMANSHIP (MACRO TECHNICAL WEAVE)"
      className="flex flex-col bg-surface-deep px-6 py-20 md:px-16 md:py-24"
    >
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <RevealOnScroll className="relative order-2 aspect-[736/412] w-full overflow-hidden bg-surface-3 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] lg:order-1 lg:col-span-7">
          <Image
            src="/images/pillar-structure.png"
            alt="Macro technical weave detail"
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[rgba(14,14,14,0.7)] to-transparent" />
          <div className="absolute left-6 top-6 flex flex-col gap-0.5">
            <span className="font-mono text-[10px] text-ink-300">MICRON SCAN: 42.8μm</span>
            <span className="font-mono text-[10px] text-ink-300">TENSILE STRENGTH: 940 MPa</span>
          </div>
          <span className="absolute bottom-6 right-6 bg-[rgba(14,14,14,0.8)] px-2 py-1 font-mono text-[10px] text-ink-200">
            SPECTRAL DENSITY: GRADE 5 TITANIUM
          </span>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1} className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
          <div className="mb-2 flex items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[1.32px] text-ink-300">07</span>
            <span className="h-px w-8 bg-ink-300" />
            <span className="font-mono text-[11px] uppercase tracking-[1.32px] text-ink-300">
              Material Matrix
            </span>
          </div>
          <h2 className="mb-2 font-display font-semibold uppercase leading-[1.17] tracking-[-0.72px] text-[clamp(1.75rem,4vw,2.25rem)] text-ink-100">
            Detail Is the Difference
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 h-0.5 w-20 origin-left bg-gradient-to-r from-accent to-ink-300"
          />
          <p className="mb-6 font-body text-[15px] leading-[24.38px] text-ink-200">
            Every fastener is custom cast from salvaged aerospace alloys and sand-blasted to a
            muted bronze lustre. The twill weave incorporates microscopic carbon monofilaments to
            guarantee perpetual shape retention without creasing.
          </p>

          <div className="mb-10 flex flex-col gap-3">
            {SPECS.map((spec) => (
              <div key={spec.label} className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-ink-200">{spec.label}</span>
                  <span className="font-mono text-[11px] text-ink-100">{spec.value}</span>
                </div>
                <div className="h-1 w-full overflow-hidden bg-surface-3">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${spec.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${spec.color}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <a
            href="#collection"
            className="group flex items-center gap-2 font-mono font-medium text-[11px] uppercase tracking-[1.1px] text-ink-100 transition-colors hover:text-ink-300"
          >
            Browse Harnessed Silhouettes
            <img
              src="/icons/arrow-right.svg"
              alt=""
              className="size-[10.667px] transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>
        </RevealOnScroll>
      </div>
    </section>
  );
}
