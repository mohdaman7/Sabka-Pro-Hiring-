import { Star } from "lucide-react"

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
    <section id="testimonials" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Trusted by Thousands</h2>
          <p className="text-xl text-muted-foreground text-pretty">
            See what our users have to say about their experience with Sabka Pro HIRIN.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-background rounded-xl border border-border p-6 space-y-4">
              {/* Rating */}
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground leading-relaxed">"{testimonial.content}"</p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
