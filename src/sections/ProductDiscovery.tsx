"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { useBag } from "@/context/BagContext";

const FILTERS = ["All Artifacts [04]", "Outerwear", "Footwear", "Tailoring"];

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  meta: string;
  variant: string;
  edition: string;
  image: string;
};

const PRODUCTS: Product[] = [
  {
    id: "aero-form-01-41-obsidian",
    name: "Aero Form 01",
    category: "Footwear",
    price: 420,
    variant: "SIZE: 41 · OBSIDIAN",
    meta: "Aerodynamic Sneaker // Obsidian",
    edition: "ED. 120/120",
    image: "/images/product-aero-form.png",
  },
  {
    id: "vector-shell-02-noir",
    name: "Vector Shell",
    category: "Outerwear",
    price: 680,
    variant: "SIZE: 02 · NOIR",
    meta: "Outer Armor // Carbon Cowl",
    edition: "ED. 48/48",
    image: "/images/product-vector-shell.png",
  },
  {
    id: "void-runner-02-noir",
    name: "Void Runner",
    category: "Tailoring",
    price: 510,
    variant: "SIZE: 02 · NOIR",
    meta: "Tailoring // Folded Collar",
    edition: "ED. 64/64",
    image: "/images/product-void-runner.png",
  },
  {
    id: "frame-02-fastener-titanium",
    name: "Frame 02 Fastener",
    category: "Outerwear",
    price: 390,
    variant: "FINISH: TITANIUM",
    meta: "Hardware // Machined Titanium",
    edition: "ED. 80/80",
    image: "/images/product-frame-fastener.png",
  },
];

export function ProductDiscovery() {
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);
  const { addItem } = useBag();

  const filteredProducts = PRODUCTS.filter((product) => {
    if (activeFilter.startsWith("All")) return true;
    return product.category.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <section
      id="shop"
      data-name="Section - CHAPTER 06: PRODUCT DISCOVERY (OBJECTS OF DESIRE)"
      className="flex flex-col gap-16 bg-surface-0 px-6 py-20 md:px-16 md:py-24"
    >
      <RevealOnScroll className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[11px] uppercase tracking-[1.1px] text-ink-300">
            Catalogue // 2026
          </span>
          <h2 className="font-display text-[clamp(2.25rem,6vw,3.5rem)] font-bold uppercase leading-[1.07] tracking-[-0.03em] text-ink-100">
            Objects of
            <br />
            Desire
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2 h-0.5 w-24 origin-left bg-gradient-to-r from-accent to-ink-300"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
              className={`px-4 py-2 font-mono text-[11px] uppercase tracking-[1.32px] transition-all duration-300 ease-out hover:-translate-y-0.5 ${
                activeFilter === filter
                  ? "bg-ink-100 text-surface-0 shadow-[0_4px_16px_rgba(255,255,255,0.15)]"
                  : "bg-surface-3 text-ink-200 hover:bg-surface-4 hover:text-ink-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </RevealOnScroll>

      <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, i) => (
            <motion.article
              layout
              key={product.name}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
              transition={{
                duration: 0.55,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex flex-col bg-surface-deep p-4 transition-shadow lg:p-3 xl:p-4 duration-500 ease-out hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)]"
            >
              {/* Product Image with Zoom and Darken Overlay */}
              <div className="relative mb-4 aspect-[232/309] w-full overflow-hidden bg-surface-3">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.08] will-change-transform"
                />

                {/* Subtle Overlay Darken Effect */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 ease-out group-hover:bg-black/35"
                />

                <span className="absolute left-3 top-3 bg-[rgba(14,14,14,0.8)] px-2 py-0.5 font-mono text-[10px] text-ink-300 backdrop-blur-[4px]">
                  {product.edition}
                </span>
                <button
                  aria-label="Add to wishlist"
                  className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-[rgba(19,19,19,0.8)] transition-transform duration-200 hover:scale-110 hover:bg-accent/20"
                >
                  <img src="/icons/heart.svg" alt="" className="h-[12.2px] w-[13.3px]" />
                </button>
              </div>

              <div className="mb-1 flex items-start justify-between gap-2">
                <h3 className="font-body text-[15px] font-semibold uppercase leading-5 text-ink-100 transition-colors duration-200 group-hover:text-ink-300">
                  {product.name}
                </h3>
                <span className="shrink-0 font-mono text-xs font-medium tracking-[0.24px] text-ink-300">
                  ${product.price}
                </span>
              </div>
              <p className="mb-4 font-mono text-[11px] uppercase text-ink-200">{product.meta}</p>

              <button
                onClick={() =>
                  addItem({
                    id: product.id,
                    name: product.name,
                    image: product.image,
                    variant: product.variant,
                    price: product.price,
                  })
                }
                className="mt-auto bg-surface-3 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.55px] text-ink-100 transition-all duration-200 hover:bg-ink-100 hover:text-surface-0 hover:shadow-md">
                Add to Bag +
              </button>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
