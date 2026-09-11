import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { DownloadSection } from "@/components/DownloadSection";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { LatestNews } from "@/components/LatestNews";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <Features />
      <DownloadSection />
      <Testimonials />
      <FAQ />
      <LatestNews />
      <FinalCta />
      <Footer />
    </main>
  );
}
