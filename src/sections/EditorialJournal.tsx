"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import pillarForm from "../../public/images/pillar-form.png";
import pillarMotion from "../../public/images/pillar-motion.png";
import pillarStructure from "../../public/images/pillar-structure.png";

const ARTICLES = [
  {
    date: "October 14, 2025",
    title: ["The Architecture of", "Silent Form"],
    excerpt: "Deconstructing the psychological weight of sculptural clothing in high-density urban environments.",
    tag: "ESSAY // 04 MIN READ",
    image: pillarForm,
  },
  {
    date: "November 02, 2025",
    title: ["Beyond the Silhouette"],
    excerpt: "How aerodynamic automotive wind-tunnels shaped the contour parameters of the Aero Form 01 chassis.",
    tag: "TECHNICAL // 07 MIN READ",
    image: pillarMotion,
  },
  {
    date: "December 19, 2025",
    title: ["A New Material", "Language"],
    excerpt: "A dialogue with our metallurgy partner on annealing titanium closures for tactile permanence.",
    tag: "DIALOGUE // 05 MIN READ",
    image: pillarStructure,
  },
];

export function EditorialJournal() {
  return (
    <section
      id="journal"
      data-name="Section - CHAPTER 10: EDITORIAL JOURNAL"
      className="flex flex-col gap-16 bg-surface-0 px-6 py-20 md:px-16 md:py-24"
    >
      <RevealOnScroll className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[11px] uppercase tracking-[1.1px] text-ink-300">
            Monograph Dispatches
          </span>
          <h2 className="font-display text-[clamp(2.25rem,6vw,3.5rem)] font-bold uppercase leading-[60px] tracking-[-1.68px] text-ink-100">
            The Editorial Journal
          </h2>
          {/* Heading Underline Reveal */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2 h-0.5 w-24 origin-left bg-gradient-to-r from-accent to-ink-300"
          />
        </div>
        <span className="font-mono text-xs tracking-[0.24px] text-ink-200">
          Curated by Atelier NOIRÉ
        </span>
      </RevealOnScroll>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {ARTICLES.map((article, i) => (
          <RevealOnScroll key={article.tag} delay={i * 0.15}>
            <article className="group flex flex-col transition-all duration-300">
              <div className="relative mb-4 aspect-[352/227] w-full overflow-hidden bg-surface-deep shadow-[0_12px_24px_-8px_rgba(0,0,0,0.4)]">
                <Image
                  src={article.image}
                  alt={article.title.join(" ")}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.08] will-change-transform"
                />

                {/* Subtle dark gradient overlay on hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 ease-out group-hover:bg-black/25"
                />

                {/* Tag pill */}
                <span className="absolute bottom-3 left-3 bg-[rgba(14,14,14,0.85)] px-2.5 py-1 font-mono text-[10px] tracking-wider text-ink-300 backdrop-blur-[4px] transition-transform duration-300 group-hover:-translate-y-6">
                  {article.tag}
                </span>

                {/* Caption reveal sliding up from bottom */}
                <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between bg-[rgba(14,14,14,0.92)] px-3 py-2 backdrop-blur-[6px] transition-transform duration-300 ease-out group-hover:translate-y-0">
                  <span className="font-mono text-[10px] font-medium tracking-wider text-accent uppercase">
                    Read Dispatch →
                  </span>
                  <span className="font-mono text-[9px] text-ink-200 uppercase">
                    Paris Atelier
                  </span>
                </div>
              </div>

              <span className="mb-1 font-mono text-xs tracking-[0.24px] text-ink-200">
                {article.date}
              </span>
              <h3 className="mb-2 font-display text-2xl font-semibold uppercase leading-[30px] tracking-[-0.24px] text-ink-100 transition-colors duration-200 group-hover:text-ink-300">
                {article.title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h3>
              <p className="mb-3 font-body text-[13px] leading-[21.13px] tracking-[0.13px] text-ink-200">
                {article.excerpt}
              </p>
              <a
                href="#"
                className="font-mono text-[11px] font-medium uppercase tracking-[1.32px] text-ink-300 transition-colors hover:text-ink-100"
              >
                Read Essay →
              </a>
            </article>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
