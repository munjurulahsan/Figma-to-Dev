export function AtelierCodex() {
  return (
    <section
      id="atelier"
      data-name="Section - CHAPTER 12: MONUMENTAL ATELIER CODEX (SUPPLEMENT TO FOOTER)"
      className="flex flex-col gap-10 overflow-hidden bg-surface-deep px-6 pb-6 pt-12 md:gap-16 md:px-16 md:pt-16"
    >
      <span
        aria-hidden
        className="pointer-events-none block select-none overflow-hidden whitespace-nowrap text-center font-display font-extrabold uppercase leading-none text-[18vw] tracking-[-0.05em] text-[rgba(229,226,225,0.05)]"
      >
        NOIRÉ
      </span>

      <div className="grid grid-cols-1 gap-6 pb-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-3">
        <div className="flex flex-col gap-1">
          <span className="font-mono font-bold text-xs tracking-[0.24px] text-ink-100">
            ATELIER LOCATION
          </span>
          <span className="font-mono text-xs leading-4 text-ink-200">
            14 RUE DU TEMPLE, 75004 PARIS, FRANCE
            <br />
            BY APPOINTMENT ONLY
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-mono font-bold text-xs tracking-[0.24px] text-ink-100">
            CERTIFICATE OF PROVENANCE
          </span>
          <span className="font-mono text-xs leading-4 text-ink-200">
            EACH NOIRÉ ARTIFACT IS ENGRAVED WITH A CRYPTOGRAPHIC SERIAL AND REGISTERED IN OUR
            ARCHIVE DATABASE.
          </span>
        </div>
        <div className="flex flex-col gap-1 md:items-end md:text-right">
          <span className="font-mono font-bold text-xs tracking-[0.24px] text-ink-100">
            DIGITAL FLAGSHIP
          </span>
          <span className="font-mono text-xs leading-4 text-ink-200">
            SYSTEM STATUS: OPERATIONAL 99.98%
            <br />
            FRAMEWORK: MONOLITHIC HAUTE 2026
          </span>
        </div>
      </div>
    </section>
  );
}
