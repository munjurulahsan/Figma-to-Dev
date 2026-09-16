import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/sections/Hero";
import { CollectionIntro } from "@/sections/CollectionIntro";
import { ProductShowcase } from "@/sections/ProductShowcase";
import { EditorialStory } from "@/sections/EditorialStory";
import { ProductDiscovery } from "@/sections/ProductDiscovery";
import { MaterialCraftsmanship } from "@/sections/MaterialCraftsmanship";
import { LimitedDrop } from "@/sections/LimitedDrop";
import { CategoryStrip } from "@/sections/CategoryStrip";
import { EditorialJournal } from "@/sections/EditorialJournal";
import { Newsletter } from "@/sections/Newsletter";
import { AtelierCodex } from "@/sections/AtelierCodex";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col bg-surface-1">
        <Hero />
        <CollectionIntro />
        <ProductShowcase />
        <EditorialStory />
        <ProductDiscovery />
        <MaterialCraftsmanship />
        <LimitedDrop />
        <CategoryStrip />
        <EditorialJournal />
        <Newsletter />
        <AtelierCodex />
      </main>
      <Footer />
    </>
  );
}
