"use client";

import { Fragment, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Digital Countdown Ticker — with 3D Flip Card animation
 */
function getRemaining(target: number) {
  const diff = Math.max(0, target - Date.now());
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { hours, minutes, seconds };
}

/** Initial target time */
const INITIAL_TIME = { hours: 2, minutes: 14, seconds: 33 };

export function CountdownTicker() {
  const [time, setTime] = useState(INITIAL_TIME);
  const reduce = useReducedMotion();

  useEffect(() => {
    const target = Date.now() + (2 * 60 * 60 + 14 * 60 + 33) * 1000;
    const interval = setInterval(() => setTime(getRemaining(target)), 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { value: time.hours, label: "Hours" },
    { value: time.minutes, label: "Minutes" },
    { value: time.seconds, label: "Seconds" },
  ];

  return (
    <div className="flex items-center gap-4">
      {units.map((unit, i) => {
        const isLast = i === units.length - 1;
        const padded = String(unit.value).padStart(2, "0");

        return (
          <Fragment key={unit.label}>
            <div className="flex min-w-[88px] shrink-0 flex-col items-center bg-surface-0 px-4 py-4 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.5)] transition-colors duration-300 ease-out hover:bg-surface-3">
              <div
                style={{ perspective: 600 }}
                className={`relative block h-[42px] w-full overflow-hidden text-center font-display text-[36px] font-bold leading-[42px] tracking-[-0.72px] tabular-nums ${
                  isLast ? "text-ink-300" : "text-ink-100"
                }`}
              >
                {reduce ? (
                  padded
                ) : (
                  <AnimatePresence mode="popLayout" initial={false}>
                    {/* 3D split-flap flip digit animation */}
                    <motion.span
                      key={padded}
                      initial={{ rotateX: -90, opacity: 0, y: -6 }}
                      animate={{ rotateX: 0, opacity: 1, y: 0 }}
                      exit={{ rotateX: 90, opacity: 0, y: 6 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="block origin-center will-change-transform"
                    >
                      {padded}
                    </motion.span>
                  </AnimatePresence>
                )}
              </div>
              <span className="font-mono text-[10px] uppercase leading-6 text-ink-200">
                {unit.label}
              </span>
            </div>

            {!isLast && (
              <span className="font-display text-[36px] font-bold leading-[42px] tracking-[-0.72px] text-ink-300">
                :
              </span>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
