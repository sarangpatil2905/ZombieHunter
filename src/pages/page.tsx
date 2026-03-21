import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { StatsSection } from "@/components/landing/stats-section"
import { Footer } from "@/components/landing/footer"
import { Navbar } from "@/components/landing/navbar"

export default function LandingPage() {
  return (
    <div className="min-h-screen  relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="fixed inset-0 grid-pattern bg-background opacity-100 pointer-events-none" />

      {/* Gradient orbs */}
      {/* <div className="fixed top-1/4 left-1/4 w-100 h-100 bg-neon-blue/15 rounded-full blur-[120px] pointer-events-none" /> */}
      <div className="fixed bottom-0 right-1/4 w-125 h-125 bg-neon-blue/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 ">
        <Navbar />
        <main >
          <HeroSection />
          <FeaturesSection />
          <StatsSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
