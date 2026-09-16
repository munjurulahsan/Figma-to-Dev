"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Hero — full-bleed editorial redesign: a cutout model portrait anchored to
 * the right edge with the headline, metadata and CTA overlaid on the left.
 */
const EASE_CINEMATIC = [0.16, 1, 0.3, 1] as const;

/** Mouse + scroll motion values shared by the hero's layers. */
function useHeroMotion(sectionRef: RefObject<HTMLElement | null>) {
  const prefersReducedMotion = useReducedMotion();
  const interactive = !prefersReducedMotion;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springConfig = { stiffness: 45, damping: 16, mass: 0.6 };
  const mouseX = useSpring(rawX, springConfig);
  const mouseY = useSpring(rawY, springConfig);

  useEffect(() => {
    if (!interactive) return;
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const handlePointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      rawX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
      rawY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    const handleLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };
    el.addEventListener("pointermove", handlePointerMove);
    el.addEventListener("pointerleave", handleLeave);
    return () => {
      el.removeEventListener("pointermove", handlePointerMove);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, [interactive, sectionRef, rawX, rawY]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  return { prefersReducedMotion, interactive, mouseX, mouseY, scrollYProgress };
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);

  const { prefersReducedMotion, interactive, mouseX, mouseY, scrollYProgress } =
    useHeroMotion(sectionRef);

  const reduce = !!prefersReducedMotion;
  const range = (v: number) => (interactive ? [-v, v] : [0, 0]);

  // Mouse parallax for the portrait; text drifts a touch less on scroll.
  const imageX = useTransform(mouseX, [-1, 1], range(12));
  const imageMouseY = useTransform(mouseY, [-1, 1], range(8));
  const imageScrollY = useTransform(scrollYProgress, [0, 1], [0, interactive ? -48 : 0]);
  const imageY = useTransform(
    [imageMouseY, imageScrollY],
    (v) => (v as number[])[0] + (v as number[])[1],
  );
  const textScrollY = useTransform(scrollYProgress, [0, 1], [0, interactive ? -14 : 0]);

  // GSAP ScrollTrigger for ambient blob and video parallax
  useEffect(() => {
    if (reduce || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Rotating + scaling orange ambient blob on scroll
      if (blobRef.current) {
        gsap.to(blobRef.current, {
          rotation: 120,
          scale: 1.35,
          xPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      // Parallax scroll on the hero model video (slower move = data-speed ~ 0.5)
      if (videoWrapRef.current) {
        gsap.to(videoWrapRef.current, {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce]);

  // Entrance timeline (seconds).
  const T = {
    metadata: 0,
    lineForm: 0.15,
    lineThe: 0.28,
    lineFuture: 0.41,
    description: 0.55,
    cta: 0.7,
    image: 0.1,
    ribbon: 0.9,
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      data-name="Hero — Full Bleed Editorial Portrait"
      className="relative min-h-[820px] w-full overflow-hidden bg-surface-1 lg:min-h-screen"
    >
      {/* Large circular/orange blob background shape — slow rotate + scale with scroll */}
      <div
        ref={blobRef}
        aria-hidden
        className="pointer-events-none absolute -right-24 top-12 z-[1] size-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,86,55,0.24)_0%,rgba(255,86,55,0.08)_50%,transparent_72%)] blur-[80px] will-change-transform"
      />

      {/* Atmospheric ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 right-[45%] top-[-128px] z-[1] h-[384px] rounded-full bg-[rgba(255,86,55,0.12)] blur-[90px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 z-[1] h-[70%] w-[65%] bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,86,55,0.16),transparent_65%)]"
      />

      {/* Full-bleed cinematic backdrop video with subtle parallax */}
      <motion.div
        ref={videoWrapRef}
        initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, delay: T.image, ease: EASE_CINEMATIC }}
        className="absolute inset-0 z-0 size-full will-change-transform"
      >
        <motion.div style={{ x: imageX, y: imageY }} className="relative size-full">
          <video
            src="/images/hero-video.mp4"
            aria-label="Model in the Vector Over-Armor Shell jacket, Runway 01 Look 14"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 size-full object-cover object-[70%_20%]"
          />
        </motion.div>
      </motion.div>

      {/* Legibility scrim so the headline stays readable over the video */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-surface-1 via-surface-1/55 to-transparent lg:via-surface-1/15"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-40 bg-gradient-to-t from-surface-1 to-transparent lg:hidden"
      />

      <div className="relative z-10 mx-auto flex min-h-[820px] w-full max-w-[1440px] flex-col px-6 pb-8 pt-[104px] lg:min-h-screen lg:px-16 lg:pb-10 lg:pt-[120px]">
        {/* Header Meta Row */}
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: T.metadata, ease: EASE_CINEMATIC }}
          className="flex w-full items-start justify-between gap-4 pt-2"
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <span className="size-2 shrink-0 rounded-full bg-accent" />
              <span className="font-mono text-xs leading-4 tracking-[0.24px] text-ink-300">
                AUTUMN / WINTER 2026
              </span>
            </div>
            <span className="font-mono text-[11px] font-medium uppercase leading-[14px] tracking-[1.1px] text-ink-200">
              MONOGRAPH IV — PROTO-SCULPTURE
            </span>
          </div>
          <div className="hidden flex-col items-end sm:flex">
            <span className="font-mono text-xs leading-4 tracking-[0.24px] text-ink-200">
              EDITION: LIMITED TO 48 CUTS
            </span>
            <span className="font-mono text-xs leading-4 tracking-[0.24px] text-ink-100">
              PARIS ATELIER № 09
            </span>
          </div>
        </motion.div>

        {/* Headline block, vertically centered on the left */}
        <motion.div
          style={reduce ? undefined : { y: textScrollY }}
          className="flex w-full max-w-[620px] flex-1 flex-col items-start justify-center py-12"
        >
          <h1 className="w-full pb-4 font-display text-[clamp(2.75rem,8.5vw,80px)] font-extrabold uppercase leading-[1.12] tracking-[-0.048em] text-ink-100">
            {(
              [
                { text: "FORM", delay: T.lineForm, gradient: false },
                { text: "THE", delay: T.lineThe, gradient: true },
                { text: "FUTURE", delay: T.lineFuture, gradient: true },
              ] as const
            ).map((line) => (
              <span
                key={line.text}
                className="block overflow-hidden [clip-path:polygon(0_0,100%_0,100%_100%,0%_100%)]"
              >
                <motion.span
                  initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: "115%" }}
                  animate={{ opacity: 1, y: "0%" }}
                  transition={{
                    duration: 0.95,
                    delay: line.delay,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={
                    line.gradient
                      ? "block bg-gradient-to-r from-ink-100 via-ink-300 to-ink-200 bg-clip-text text-transparent will-change-transform"
                      : "block will-change-transform"
                  }
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <div className="w-full max-w-[480px] overflow-hidden pb-10">
            <motion.p
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: "40%" }}
              animate={{ opacity: 1, y: "0%" }}
              transition={{ duration: 0.8, delay: T.description, ease: EASE_CINEMATIC }}
              className="font-body text-[18px] font-light leading-[28px] tracking-[-0.18px] text-ink-200"
            >
              A new vocabulary of silhouette, carbon-infused structural tailoring and aerodynamic
              drapery engineered for physical and digital presence.
            </motion.p>
          </div>

          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: T.cta, ease: EASE_CINEMATIC }}
            className="flex w-full flex-wrap items-center gap-4"
          >
            <a
              href="#collection"
              className="group flex items-center gap-3 bg-ink-100 px-8 py-4 font-mono text-[11px] font-medium uppercase leading-[14px] tracking-[1.1px] text-surface-0 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-8px_rgba(255,255,255,0.2)]"
            >
              Explore Monographs
              <img
                src="/icons/arrow-right.svg"
                alt=""
                width={10.667}
                height={10.667}
                className="size-[10.667px] shrink-0 transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>

            <a
              href="#showcase"
              className="group flex items-center gap-3 border border-border-1 bg-surface-2/60 px-8 py-4 font-mono text-[11px] font-medium uppercase leading-[14px] tracking-[1.1px] text-ink-100 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-ink-300 hover:text-ink-300 hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.5)]"
            >
              Inspect Spec 01
              <img
                src="/icons/arrow-right.svg"
                alt=""
                width={10.667}
                height={10.667}
                className="size-[10.667px] shrink-0 transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
          </motion.div>
        </motion.div>

        {/* Bottom Action Ribbon */}
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: T.ribbon, ease: EASE_CINEMATIC }}
          className="flex w-full items-center justify-between gap-4 pt-4"
        >
          <div className="hidden items-center gap-6 sm:flex">
            <span className="font-mono text-xs leading-4 tracking-[0.24px] text-ink-200">
              SCROLL ELEVATION 00 // 12
            </span>
            <span className="flex h-px w-24 overflow-hidden bg-border-1">
              <span className="block h-full w-8 bg-ink-300" />
            </span>
          </div>
          <a
            href="#collection"
            className="ml-auto flex items-center gap-2 font-mono text-[11px] font-medium uppercase leading-[14px] tracking-[1.32px] text-ink-200 transition-colors hover:text-ink-300"
          >
            Scroll to Enter
            <motion.img
              src="/icons/arrow-down.svg"
              alt=""
              width={10.667}
              height={10.667}
              className="size-[10.667px] shrink-0"
              animate={reduce ? undefined : { y: [0, 4, 0] }}
              transition={reduce ? undefined : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </a>
        </motion.div>
      </div>

      {/* Slide indicator, right edge */}
      <div className="pointer-events-none absolute right-8 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-3 xl:flex">
        <span className="font-mono text-[11px] tracking-[0.24px] text-ink-200">01 / 12</span>
        <span className="relative h-20 w-px bg-border-1">
          <span className="absolute left-1/2 top-0 h-6 w-px -translate-x-1/2 bg-ink-100" />
        </span>
      </div>
    </section>
  );
}
