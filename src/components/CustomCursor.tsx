"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * Site-wide cursor accent: an orange ring (with a small dot at its centre)
 * that trails the real pointer on a spring. The native OS cursor stays
 * visible underneath — this only adds a decorative halo around it.
 *
 * Only mounts for a real mouse (`pointer: fine`) and when the visitor has not
 * asked for reduced motion — touch devices keep their native behaviour.
 */
const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, summary, label, [role="button"], [data-cursor="interactive"]';

function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const finePointer = useMediaQuery("(pointer: fine)");
  const enabled = finePointer && !prefersReducedMotion;

  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  // Parked off-screen so nothing flashes in the corner before the first move.
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 32, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 320, damping: 32, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const handleOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      setHovering(Boolean(target?.closest?.(INTERACTIVE_SELECTOR)));
    };
    const handleDown = () => setPressed(true);
    const handleUp = () => setPressed(false);
    const handleLeave = () => setVisible(false);

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerover", handleOver, { passive: true });
    window.addEventListener("pointerdown", handleDown, { passive: true });
    window.addEventListener("pointerup", handleUp, { passive: true });
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerover", handleOver);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ringScale = pressed ? 0.8 : hovering ? 1.75 : 1;

  return (
    <>
      {/* Trailing orange ring */}
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-5 -mt-5"
      >
        <motion.span
          animate={{ scale: ringScale, opacity: visible ? 1 : 0 }}
          transition={{ scale: { duration: 0.32, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.2 } }}
          className="block size-10 rounded-full border-2 border-accent bg-accent/15"
        />
      </motion.div>

      {/* Precise centre dot */}
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-[3px] -mt-[3px]"
      >
        <motion.span
          animate={{ scale: hovering ? 0 : 1, opacity: visible ? 1 : 0 }}
          transition={{ scale: { duration: 0.28, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.2 } }}
          className="block size-1.5 rounded-full bg-accent"
        />
      </motion.div>
    </>
  );
}
