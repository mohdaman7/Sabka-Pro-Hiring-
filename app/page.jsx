import LandingHero from "@/views/landing/LandingHero"
import LandingFeatures from "@/views/landing/LandingFeatures"
import LandingTestimonials from "@/views/landing/LandingTestimonials"
import LandingCTA from "@/views/landing/LandingCTA"
import LandingFooter from "@/views/landing/LandingFooter"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <LandingHero />
      <LandingFeatures />
      <LandingTestimonials />
      <LandingCTA />
      <LandingFooter />
    </main>
  )
}
