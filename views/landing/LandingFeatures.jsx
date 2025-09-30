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
    <section id="features" className="relative py-24 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 mb-6">
            <span className="text-sm font-medium text-blue-300">Features</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-gray-300 text-pretty">
            Comprehensive features designed to make hiring and job searching seamless and effective.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group relative p-8 bg-slate-900/40 backdrop-blur-sm hover:bg-slate-900/60 rounded-2xl border border-blue-500/10 hover:border-blue-400/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
                
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center mb-5 group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition-all duration-300 group-hover:scale-110 shadow-lg shadow-blue-500/20">
                    <Icon className="w-7 h-7 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">Ready to experience these features?</p>
          <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-200">
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  )
}