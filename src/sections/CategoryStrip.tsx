import { RevealOnScroll } from "@/components/RevealOnScroll";

const CATEGORIES = [
  { index: "01", name: "Sculptural Outerwear", count: "[14 CUTS]" },
  { index: "02", name: "Aero Footwear", count: "[06 DESIGNS]" },
  { index: "03", name: "Structural Tailoring", count: "[09 PIECES]" },
  { index: "04", name: "Hardware & Hard Wear", count: "[03 OBJECTS]" },
];

export function CategoryStrip() {
  return (
    <section
      id="category"
      data-name="Section - CHAPTER 09: EXPANSIVE CATEGORY STRIP"
      className="flex flex-col gap-10 bg-surface-deep px-6 py-20 md:px-16 md:py-24"
    >
      <RevealOnScroll className="flex items-end justify-between gap-4">
        <span className="font-mono text-[11px] uppercase tracking-[1.1px] text-ink-300">
          Chapter 09 // Spectrum
        </span>
        <span className="hidden font-mono text-xs tracking-[0.24px] text-ink-200 sm:block">
          Select Genre to Expand
        </span>
      </RevealOnScroll>

      <div className="flex flex-col divide-y divide-border-1">
        {CATEGORIES.map((cat, i) => (
          <RevealOnScroll key={cat.index} delay={i * 0.06}>
            <a
              href="#shop"
              className="group flex items-center justify-between gap-4 py-6 transition-colors duration-200"
            >
              <span className="flex items-baseline gap-4 sm:gap-8">
                <span className="font-mono text-xs tracking-[0.24px] text-ink-200">
                  {cat.index}
                </span>
                <span className="font-display font-bold uppercase leading-[1.1] tracking-[-0.05em] text-[clamp(1.5rem,5vw,3rem)] text-ink-100 transition-colors duration-200 group-hover:text-ink-300">
                  {cat.name}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-3">
                <span className="hidden font-mono text-xs tracking-[0.24px] text-ink-200 sm:block">
                  {cat.count}
                </span>
                <img
                  src="/icons/arrow-right-lg.svg"
                  alt=""
                  className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                />
              </span>
            </a>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
