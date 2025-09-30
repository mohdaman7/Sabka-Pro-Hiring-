import { Briefcase, Users, GraduationCap, Shield, TrendingUp, Clock } from "lucide-react"

export default function LandingFeatures() {
  const features = [
    {
      icon: Shield,
      title: "Verified Profiles",
      description:
        "All candidates and employers go through a rigorous verification process to ensure authenticity and quality.",
    },
    {
      icon: Briefcase,
      title: "Smart Job Matching",
      description:
        "Our AI-powered system matches candidates with the most suitable job opportunities based on skills and preferences.",
    },
    {
      icon: GraduationCap,
      title: "Professional Training",
      description: "Access industry-leading courses and training programs to enhance your skills and career prospects.",
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "Get personalized assistance from our expert team throughout your job search or hiring journey.",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Track your progress, get insights, and receive recommendations to accelerate your career growth.",
    },
    {
      icon: Clock,
      title: "Quick Placement",
      description: "Our streamlined process ensures faster job placements with an average time of just 2 weeks.",
    },
  ]

  return (
    <section id="features" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Everything You Need to Succeed</h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Comprehensive features designed to make hiring and job searching seamless and effective.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group p-6 bg-surface hover:bg-surface-hover rounded-xl border border-border transition-all duration-300 hover:border-primary/50"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
