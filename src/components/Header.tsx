"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useBag } from "@/context/BagContext";

const NAV_LINKS = [
  { label: "New", href: "#new" },
  { label: "Collection", href: "#collection" },
  { label: "Shop", href: "#shop" },
  { label: "Journal", href: "#journal" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount, openBag } = useBag();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ease-out ${
        scrolled
          ? "bg-[rgba(12,12,12,0.92)] backdrop-blur-xl border-b border-border-1/60 shadow-[0_8px_32px_rgba(0,0,0,0.7)]"
          : "bg-[rgba(19,19,19,0.4)] backdrop-blur-md border-b border-transparent shadow-[0px_1px_8px_0px_rgba(0,0,0,0.04)]"
      }`}
      data-name="Header"
    >
      <div className="flex h-20 items-center justify-between px-6 md:px-16">
        <Link
          href="/"
          className="font-display font-semibold text-2xl tracking-[-0.6px] uppercase text-ink-100"
        >
          NOIRÉ
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-mono font-medium text-[11px] tracking-[1.32px] uppercase text-ink-200 transition-colors duration-200 hover:text-ink-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 md:gap-6">
          <button className="hidden sm:flex items-center gap-1 font-mono font-medium text-[11px] tracking-[1.32px] uppercase text-ink-200 transition-colors duration-200 hover:text-ink-300">
            <img src="/icons/search.svg" alt="" className="size-[15px]" />
            Search
          </button>
          <Link
            href="#account"
            className="hidden md:flex items-center gap-1 font-mono font-medium text-[11px] tracking-[1.32px] uppercase text-ink-200 transition-colors duration-200 hover:text-ink-300"
          >
            <img src="/icons/account.svg" alt="" className="size-[16.667px]" />
            Account
          </Link>
          <button
            onClick={openBag}
            className="hidden sm:flex items-center gap-1 font-mono font-medium text-[11px] tracking-[1.32px] uppercase text-ink-200 transition-colors duration-200 hover:text-ink-300"
          >
            <img src="/icons/bag.svg" alt="" className="h-[16.667px] w-[13.333px]" />
            Bag
            <span className="min-w-[18px] rounded-full bg-[#c62201] px-1.5 py-0.5 text-center font-mono text-xs text-white tracking-[0.24px]">
              {String(itemCount).padStart(2, "0")}
            </span>
          </button>
          <button
            aria-label="Profile"
            className="hidden sm:flex size-8 items-center justify-center rounded-full bg-ink-300 transition-transform duration-200 hover:scale-105"
          >
            <img src="/icons/user.svg" alt="" className="size-3" />
          </button>

          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex lg:hidden flex-col gap-1.5 p-2"
          >
            <span
              className={`block h-px w-5 bg-ink-100 transition-transform duration-200 ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-5 bg-ink-100 transition-transform duration-200 ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-border-1 bg-surface-0"
          >
            <div className="flex flex-col gap-5 px-6 py-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-mono font-medium text-xs tracking-[1.32px] uppercase text-ink-200 hover:text-ink-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
