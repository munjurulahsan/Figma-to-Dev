import type Lenis from "lenis";

export const PRELOADER_DONE_EVENT = "noire:preloader-done";

type NoireWindow = Window & { __lenis?: Lenis; __noirePreloaderDone?: boolean };

export function getLenis() {
  return (window as NoireWindow).__lenis;
}

export function isPreloaderDone() {
  return Boolean((window as NoireWindow).__noirePreloaderDone);
}

/** Marks the preloader finished (sticky flag + event) so late subscribers still see it. */
export function markPreloaderDone() {
  (window as NoireWindow).__noirePreloaderDone = true;
  window.dispatchEvent(new CustomEvent(PRELOADER_DONE_EVENT));
}

/** Runs `callback` once the preloader has finished — immediately if it already has. */
export function onPreloaderDone(callback: () => void) {
  if (isPreloaderDone()) {
    callback();
    return () => {};
  }
  window.addEventListener(PRELOADER_DONE_EVENT, callback, { once: true });
  return () => window.removeEventListener(PRELOADER_DONE_EVENT, callback);
}
