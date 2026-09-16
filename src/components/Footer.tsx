import Link from "next/link";

const COLUMNS = [
  {
    heading: "Explore",
    links: ["New Releases", "Monographs", "Objects & Wear"],
  },
  {
    heading: "Atelier",
    links: ["Editorial Journal", "Manifesto", "Runway Archive"],
  },
  {
    heading: "Client Service",
    links: ["Private Concierge", "Collector Account", "Authentication"],
  },
];

export function Footer() {
  return (
    <footer
      data-name="Footer"
      className="flex flex-col gap-16 bg-surface-deep px-6 py-16 md:px-16 md:py-24"
    >
      <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
        <div className="flex max-w-xs flex-col gap-2">
          <span className="font-display font-semibold uppercase tracking-[-0.6px] text-2xl text-ink-100">
            NOIRÉ
          </span>
          <p className="font-body text-[13px] leading-5 tracking-[0.13px] text-ink-200">
            Atelier ready-to-wear and sculptural couture garments engineered for physical and
            digital permanence.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:flex sm:gap-10">
          {COLUMNS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-2">
              <span className="font-mono font-medium text-[11px] uppercase tracking-[1.32px] text-ink-300">
                {col.heading}
              </span>
              {col.links.map((link) => (
                <Link
                  key={link}
                  href="#"
                  className="font-body text-[13px] tracking-[0.13px] text-ink-200 transition-colors hover:text-ink-100"
                >
                  {link}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-border-1 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-mono text-xs tracking-[0.24px] text-ink-200">
          © 2025 NOIRÉ ATELIER CORP. ALL RIGHTS RESERVED.
        </span>
        <div className="flex gap-4">
          {["Terms", "Privacy", "Provenance"].map((link) => (
            <Link
              key={link}
              href="#"
              className="font-mono text-xs uppercase tracking-[0.24px] text-ink-200 transition-colors hover:text-ink-100"
            >
              {link}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
