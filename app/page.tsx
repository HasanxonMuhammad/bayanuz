import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { StatsBand } from "@/components/StatsBand";
import { WhatsNew } from "@/components/WhatsNew";
import { AiDemo } from "@/components/AiDemo";
import { FeatureBento } from "@/components/FeatureBento";
import { PremiumSection } from "@/components/PremiumSection";
import { FAQ } from "@/components/FAQ";
import { LatestNews } from "@/components/LatestNews";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/RevealObserver";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <StatsBand />
      <WhatsNew />
      <AiDemo />
      <FeatureBento />
      <PremiumSection />
      <FAQ />
      <LatestNews />
      <FinalCta />
      <Footer />
      <RevealObserver />
    </main>
  );
}
