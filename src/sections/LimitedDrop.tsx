"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { CountdownTicker } from "@/components/CountdownTicker";

/**
 * Limited Drop 02 — Opposing slide-in layout with 3D Countdown Ticker
 */
export function LimitedDrop() {
  return (
    <section
      id="new"
      data-node-id="1:458"
      data-name="Section - CHAPTER 08: LIMITED DROP 02 (COUNTDOWN & PROTO-GARMENT)"
      className="w-full overflow-hidden bg-surface-0"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 py-20 md:px-16 md:py-24">
        {/* Background+Shadow */}
        <RevealOnScroll className="relative overflow-hidden bg-surface-2 p-6 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] sm:p-10 lg:p-16">
          {/* Glow ambient background */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 size-80 animate-pulse rounded-full bg-[rgba(255,86,55,0.15)] blur-[50px] [animation-duration:9s]"
          />

          {/* Grid with Opposing Slide-In */}
          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:grid-rows-[minmax(544px,auto)] lg:gap-8">
            {/* Left Column — Slides in from Left */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-center lg:col-span-7 lg:self-center will-change-transform"
            >
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="bg-accent px-2.5 py-1 font-mono text-[12px] font-bold uppercase leading-4 tracking-[1.2px] text-[#590800]">
                  Limited Drop 02
                </span>
                <span className="font-mono text-[11px] font-medium uppercase leading-[14px] tracking-[1.32px] text-ink-200">
                  Available for 72 Hours Only
                </span>
              </div>

              <h2 className="mb-2 font-display text-[clamp(2.25rem,4.375vw,56px)] font-bold uppercase leading-[1.0714] tracking-[-0.03em] text-ink-100">
                The Proto-
                <br />
                Shell
                <br />
                <span className="text-ink-300">Archive 002</span>
              </h2>

              {/* Underline reveal */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="mb-4 h-0.5 w-24 origin-left bg-gradient-to-r from-accent to-ink-300"
              />

              <p className="mb-8 max-w-[512px] font-body text-[15px] leading-[24.38px] text-ink-200">
                Constructed with dual-chamber aerodynamic cowls and asymmetrical fold-over
                volume. Produced in an irreproducible batch of exactly thirty units worldwide.
              </p>

              {/* Digital Countdown Ticker with 3D Flip */}
              <div className="mb-10 overflow-x-auto">
                <CountdownTicker />
              </div>

              {/* CTA and remaining */}
              <div className="flex flex-wrap items-center gap-4">
                <button className="group relative flex items-center gap-3 overflow-hidden bg-accent px-8 py-4 font-mono text-[11px] font-medium uppercase leading-[14px] tracking-[1.1px] text-[#590800] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_18px_32px_-16px_rgba(255,86,55,0.9)]">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                  />
                  <span className="relative">Secure Access // $1,250</span>
                  <img
                    src="/icons/lock.svg"
                    alt=""
                    width={12}
                    height={15.75}
                    className="relative h-[15.75px] w-3 shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-px"
                  />
                </button>
                <span className="font-mono text-[12px] leading-4 tracking-[0.24px] text-ink-200">
                  [09 REMAINING]
                </span>
              </div>
            </motion.div>

            {/* Right Column — Slides in from Right */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.95, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 lg:self-center will-change-transform"
            >
              <div className="group relative aspect-[3/4] w-full overflow-hidden bg-surface-0 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]">
                <Image
                  src="/images/product-vector-shell.png"
                  alt="Proto-Shell Archive 002 — individually numbered proto-garment"
                  fill
                  sizes="(min-width: 1280px) 408px, (min-width: 1024px) 32vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />

                {/* Accent rule that draws in on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
                />

                <div className="absolute bottom-4 left-4 flex flex-col gap-[1.5px] bg-[rgba(14,14,14,0.9)] p-3 backdrop-blur-[4px] transition-transform duration-300 ease-out group-hover:-translate-y-1">
                  <span className="font-mono text-[12px] leading-4 tracking-[0.24px] text-ink-300">
                    AUTHENTICATION CODE: #NR-2026-X02
                  </span>
                  <span className="font-mono text-[10px] uppercase leading-6 text-ink-200">
                    Individually Numbered
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
