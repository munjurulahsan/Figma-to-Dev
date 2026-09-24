"use client";

import { useState } from "react";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubmitted(true);
  };

  return (
    <section
      id="newsletter"
      data-name="Section - CHAPTER 11: NEWSLETTER PORTAL (ENTER THE FUTURE)"
      className="flex flex-col items-center bg-surface-deep px-6 py-20 md:px-16 md:py-24"
    >
      <RevealOnScroll className="flex w-full max-w-3xl flex-col items-center text-center">
        <span className="pb-2 font-mono text-[11px] uppercase tracking-[1.1px] text-ink-300">
          Confidential Transmissions
        </span>
        <h2 className="pb-3 font-display font-bold uppercase leading-[1.07] tracking-[-0.03em] text-[clamp(2rem,6vw,3.5rem)] text-ink-100">
          Enter the Future
        </h2>
        <p className="pb-10 font-body text-[15px] leading-6 text-ink-200">
          Receive private monographic previews, runway access tokens, and limited drop
          allocations.
        </p>

        {submitted ? (
          <p className="font-mono text-sm uppercase tracking-[0.24px] text-ink-300">
            Transmission received — welcome to NOIRÉ.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full max-w-xl flex-col gap-2 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="COLLECTOR@DOMAIN.COM"
              className="flex-1 bg-surface-3 px-6 py-4 font-mono text-xs uppercase tracking-[0.24px] text-ink-100 placeholder:text-ink-200/40 outline-none focus:ring-1 focus:ring-ink-300"
            />
            <button
              type="submit"
              className="bg-ink-100 px-8 py-[17px] font-mono font-medium text-[11px] uppercase tracking-[1.1px] text-surface-0 transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg"
            >
              Join NOIRÉ →
            </button>
          </form>
        )}
      </RevealOnScroll>
    </section>
  );
}
