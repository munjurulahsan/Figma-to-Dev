import type { Metadata } from "next";
import { Syne, JetBrains_Mono, Hanken_Grotesk } from "next/font/google";
import { CustomCursor } from "@/components/CustomCursor";
import { BagProvider } from "@/context/BagContext";
import { BagDrawer } from "@/components/BagDrawer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Preloader } from "@/components/Preloader";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "NOIRÉ — Form the Future",
  description:
    "A new vocabulary of silhouette, carbon-infused structural tailoring and aerodynamic drapery engineered for physical and digital presence.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${jetbrainsMono.variable} ${hankenGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface-1 text-ink-100 font-body selection:bg-accent selection:text-surface-0">
        <Preloader />
        <ScrollProgress />
        <SmoothScroll>
          <BagProvider>
            {children}
            <BagDrawer />
          </BagProvider>
        </SmoothScroll>
        <CustomCursor />
      </body>
    </html>
  );
}
