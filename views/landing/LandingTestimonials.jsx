import { Star, Quote } from "lucide-react"

export default function LandingTestimonials() {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer",
      company: "Tech Corp",
      image: "/professional-woman-diverse.png",
      content:
        "Sabka Pro HIRIN helped me land my dream job in just 2 weeks. The training courses were excellent and the support team was always there to help.",
      rating: 5,
    },
    {
      name: "Rajesh Kumar",
      role: "HR Manager",
      company: "Global Solutions",
      image: "/professional-man.jpg",
      content:
        "We have hired 15+ candidates through this platform. The quality of candidates is exceptional and the verification process gives us confidence.",
      rating: 5,
    },
    {
      name: "Anita Desai",
      role: "Marketing Specialist",
      company: "Creative Agency",
      image: "/professional-woman-smiling.png",
      content:
        "The video resume feature helped me stand out. I got multiple interview calls within days of registering. Highly recommended!",
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" className="relative py-24 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 overflow-hidden">
      {/* Decorative background elements matching features section */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 mb-6">
            <span className="text-sm font-medium text-blue-300">Testimonials</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
            Trusted by Thousands
          </h2>
          <p className="text-lg text-gray-300 text-pretty">
            See what our users have to say about their experience with Sabka Pro HIRIN.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative p-8 bg-slate-900/40 backdrop-blur-sm hover:bg-slate-900/60 rounded-2xl border border-blue-500/10 hover:border-blue-400/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
              
              <div className="relative space-y-5">
                {/* Quote icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition-all duration-300 shadow-lg shadow-blue-500/20">
                  <Quote className="w-6 h-6 text-blue-400" />
                </div>

                {/* Rating */}
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-blue-400 text-blue-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-300 leading-relaxed">"{testimonial.content}"</p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-blue-500/10">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/20"
                  />
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">Join thousands of satisfied users</p>
          <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-200">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  )
}