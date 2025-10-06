import LandingHero from "@/views/landing/LandingHero"
import LandingFeatures from "@/views/landing/LandingFeatures"
import LandingAbout from "@/views/landing/LandingAbout"
import LandingTestimonials from "@/views/landing/LandingTestimonials"
import LandingCTA from "@/views/landing/LandingCTA"
import LandingFooter from "@/views/landing/LandingFooter"
import LandingPlans from "@/views/landing/LandingPlans"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <LandingHero />
      <LandingFeatures />
      <LandingPlans />
      <LandingAbout />
      <LandingTestimonials />
      <LandingCTA />
      <LandingFooter />
    </main>
  )
}