import { Navbar } from "@/components/website/navbar"
import { HeroSection } from "@/components/website/hero-section"
import { ServicesSection } from "@/components/website/services-section"
import { HowItWorks } from "@/components/website/how-it-works"
import { PricingSection } from "@/components/website/pricing-section"
import { TrustSection } from "@/components/website/trust-section"
import { Footer } from "@/components/website/footer"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <HowItWorks />
      <PricingSection />
      <TrustSection />
      <Footer />
    </main>
  )
}
