"use client";

import { useState } from "react";
import { getLenis } from "@/lib/scroll";

type FooterLink = { label: string; href: string };

const COLUMNS: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Explore",
    links: [
      { label: "New Releases", href: "#new" },
      { label: "Monographs", href: "#collection" },
      { label: "Objects & Wear", href: "#shop" },
    ],
  },
  {
    heading: "Atelier",
    links: [
      { label: "Editorial Journal", href: "#journal" },
      { label: "Manifesto", href: "#story" },
      { label: "Runway Archive", href: "#showcase" },
    ],
  },
  {
    heading: "Client Service",
    links: [
      { label: "Private Concierge", href: "#newsletter" },
      { label: "Collector Account", href: "#newsletter" },
      { label: "Authentication", href: "#atelier" },
    ],
  },
];

// Terms and Privacy have no pages yet; `#` is a no-op (see SmoothScroll).
const LEGAL: FooterLink[] = [
  { label: "Terms", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Provenance", href: "#atelier" },
];

function scrollToTop() {
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(0);
  else window.scrollTo({ top: 0 });
}

export function Footer() {
  // Mobile collapses each link column into an accordion; from `sm` up they are always open.
  const [openColumn, setOpenColumn] = useState<string | null>(null);

  return (
    <footer
      data-name="Footer"
      className="flex flex-col gap-10 border-t border-border-1 bg-surface-deep px-6 pb-8 pt-12 md:gap-16 md:px-16 md:py-20 lg:py-24"
    >
      <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-16">
        <div className="flex max-w-sm flex-col gap-3">
          <span className="font-display font-semibold uppercase tracking-[-0.6px] text-2xl text-ink-100">
            NOIRÉ
          </span>
          <p className="font-body text-sm leading-6 tracking-[0.13px] text-ink-200 sm:text-[13px] sm:leading-5">
            Atelier ready-to-wear and sculptural couture garments engineered for physical and
            digital permanence.
          </p>
        </div>

        <div className="grid grid-cols-1 border-t border-border-1 sm:grid-cols-3 sm:gap-8 sm:border-0 lg:flex lg:gap-16">
          {COLUMNS.map((col) => {
            const open = openColumn === col.heading;
            const panelId = `footer-${col.heading.toLowerCase().replace(/\s+/g, "-")}`;
            return (
              <div key={col.heading} className="border-b border-border-1 sm:border-0">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenColumn(open ? null : col.heading)}
                  className="flex w-full items-center justify-between py-4 text-left sm:pointer-events-none sm:py-0 sm:pb-3"
                >
                  <span className="font-mono font-medium text-[11px] uppercase tracking-[1.32px] text-ink-300">
                    {col.heading}
                  </span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden
                    className={`text-ink-200 transition-transform duration-300 sm:hidden ${open ? "rotate-45" : ""}`}
                  >
                    <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                </button>
                <ul
                  id={panelId}
                  className={`${open ? "flex" : "hidden"} flex-col gap-3 pb-5 sm:flex sm:gap-2 sm:pb-0`}
                >
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="font-body text-sm tracking-[0.13px] text-ink-200 transition-colors hover:text-ink-100 sm:text-[13px]"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-5 border-t border-border-1 pt-6 sm:flex-row sm:items-center sm:justify-between sm:pt-8">
        <div className="flex items-center justify-between gap-4 sm:order-2 sm:gap-6">
          <div className="flex gap-5 sm:gap-4">
            {LEGAL.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-xs uppercase tracking-[0.24px] text-ink-200 transition-colors hover:text-ink-100"
              >
                {link.label}
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.24px] text-ink-300 transition-colors hover:text-ink-100"
          >
            Top
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
              <path d="M5 9V1M1.5 4.5L5 1L8.5 4.5" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </button>
        </div>
        <span className="font-mono text-[11px] leading-4 tracking-[0.24px] text-ink-200 sm:text-xs">
          © 2025 NOIRÉ ATELIER CORP. ALL RIGHTS RESERVED.
        </span>
      </div>
    </footer>
  );
}
