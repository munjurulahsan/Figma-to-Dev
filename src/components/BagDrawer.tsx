"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useBag } from "@/context/BagContext";
import { getLenis } from "@/lib/scroll";

const EASE_CINEMATIC = [0.16, 1, 0.3, 1] as const;

function formatUSD(value: number) {
  return value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function BagDrawer() {
  const { items, isOpen, itemCount, subtotal, removeItem, closeBag } = useBag();

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBag();
    };
    document.addEventListener("keydown", handleKey);
    // Lenis drives the page scroll itself, so body overflow alone won't hold it.
    const lenis = getLenis();
    lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
      lenis?.start();
    };
  }, [isOpen, closeBag]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Shopping bag">
          {/* Backdrop */}
          <motion.button
            aria-label="Close bag"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeBag}
            className="absolute inset-0 bg-[rgba(8,8,8,0.7)] backdrop-blur-[3px]"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: EASE_CINEMATIC }}
            className="absolute right-0 top-0 flex h-full w-full flex-col bg-surface-0 sm:w-[480px] lg:w-[588px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border-1 px-6 py-6 sm:px-10">
              <h2 className="flex items-baseline gap-2 font-display text-2xl font-bold uppercase tracking-[-0.24px] text-ink-100">
                Bag
                <span className="font-mono text-sm font-normal normal-case tracking-[0.24px] text-ink-200">
                  [{String(itemCount).padStart(2, "0")} items]
                </span>
              </h2>
              <button
                aria-label="Close bag"
                onClick={closeBag}
                className="flex size-9 items-center justify-center text-ink-200 transition-colors hover:text-ink-100"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                  <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain px-6 sm:px-10">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-2 py-20 text-center">
                  <p className="font-mono text-xs uppercase tracking-[1.1px] text-ink-200">
                    Your bag is empty
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-4 border-b border-border-1 py-6 first:pt-6"
                  >
                    <div className="relative size-24 shrink-0 overflow-hidden bg-surface-2">
                      <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-display text-lg font-bold uppercase tracking-[-0.18px] text-ink-100">
                          {item.name}
                        </h3>
                        <button
                          aria-label={`Remove ${item.name} from bag`}
                          onClick={() => removeItem(item.id)}
                          className="shrink-0 text-ink-200 transition-colors hover:text-accent"
                        >
                          <svg width="16" height="17" viewBox="0 0 16 17" fill="none" aria-hidden>
                            <path
                              d="M2 4.5H14M6 4.5V2.5H10V4.5M6.5 8V12.5M9.5 8V12.5M3.5 4.5L4 14.5H12L12.5 4.5"
                              stroke="currentColor"
                              strokeWidth="1.3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                      <span className="font-mono text-xs tracking-[0.24px] text-ink-200">
                        {item.variant}
                      </span>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs tracking-[0.24px] text-ink-200">
                          QTY {String(item.qty).padStart(2, "0")}
                        </span>
                        <span className="font-mono text-sm font-medium tracking-[0.24px] text-ink-300">
                          ${formatUSD(item.price * item.qty)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="flex flex-col gap-3 border-t border-border-1 px-6 py-6 sm:px-10">
                <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[1.1px] text-ink-200">
                  <span>Subtotal</span>
                  <span className="text-ink-100">${formatUSD(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[1.1px] text-ink-200">
                  <span>Estimated Duties &amp; Shipping</span>
                  <span>Complimentary</span>
                </div>
                <div className="flex items-center justify-between pt-2 font-mono text-sm font-medium uppercase tracking-[1.1px] text-ink-100">
                  <span>Total</span>
                  <span className="text-ink-300">${formatUSD(subtotal)} USD</span>
                </div>
                <button className="mt-2 flex items-center justify-center bg-ink-100 py-4 font-mono text-[11px] font-medium uppercase tracking-[1.1px] text-surface-0 transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
