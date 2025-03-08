import { Suspense, lazy } from "react"
import LoadingScreen from "@/components/loading-screen"
import AdminPortal from "@/components/admin-portal"
import FeaturesSection from "@/components/features-section"
import HowItWorks from "@/components/how-it-works"
import ArchitectureDiagram from "@/components/architecture-diagram"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import ParticleBackground from "@/components/particle-background"
import Navbar from "@/components/navbar"

// Lazy load the HeroSection to handle WebGL initialization properly
const HeroSection = lazy(() => import("@/components/hero-section"))

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      <Navbar />

      <Suspense fallback={<LoadingScreen />}>
        <HeroSection />
        <AdminPortal />
        <FeaturesSection />
        <HowItWorks />
        <ArchitectureDiagram />
        <AboutSection />
        <ContactSection />
        <Footer />
      </Suspense>
    </main>
  )
}

