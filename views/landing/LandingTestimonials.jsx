"use client"

import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export default function LandingTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const cardsPerPage = 3

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer",
      company: "Tech Corp",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop",
      bgImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop",
      content:
        "Sabka Pro HIRIN helped me land my dream job in just 2 weeks. The training courses were excellent and the support team was always there to help.",
      rating: 5,
      gradient: "from-blue-600/95 to-cyan-600/95",
    },
    {
      name: "Rajesh Kumar",
      role: "HR Manager",
      company: "Global Solutions",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop",
      bgImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop",
      content:
        "We have hired 15+ candidates through this platform. The quality of candidates is exceptional and the verification process gives us confidence.",
      rating: 5,
      gradient: "from-purple-600/95 to-indigo-600/95",
    },
    {
      name: "Anita Desai",
      role: "Marketing Specialist",
      company: "Creative Agency",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop",
      bgImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop",
      content:
        "The video resume feature helped me stand out. I got multiple interview calls within days of registering. Highly recommended!",
      rating: 5,
      gradient: "from-emerald-600/95 to-teal-600/95",
    },
    {
      name: "Priya Sharma",
      role: "Software Engineer",
      company: "Tech Corp",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop",
      bgImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop",
      content:
        "Sabka Pro HIRIN helped me land my dream job in just 2 weeks. The training courses were excellent and the support team was always there to help.",
      rating: 5,
      gradient: "from-blue-600/95 to-cyan-600/95",
    },
  ]

  const totalPages = Math.ceil(testimonials.length / cardsPerPage)
  const currentPage = Math.floor(currentIndex / cardsPerPage)

  const handlePrevious = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - cardsPerPage
      return newIndex < 0 ? Math.max(0, testimonials.length - cardsPerPage) : newIndex
    })
  }

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev + cardsPerPage
      return newIndex >= testimonials.length ? 0 : newIndex
    })
  }

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + cardsPerPage)

  return (
    <section
      id="testimonials"
      className="relative py-24 bg-gradient-to-b from-[#0f172a] via-slate-900 to-[#0f172a] overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-400/30 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-blue-300">Success Stories</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Thousands
            </span>
          </h2>
          <p className="text-xl text-gray-400">Real stories from professionals who transformed their careers with us</p>
        </div>

        <div className="relative flex items-center justify-center gap-8">
          {/* Left Arrow - Only show if there are more than 3 testimonials */}
          {testimonials.length > cardsPerPage && (
            <button
              onClick={handlePrevious}
              className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-xl"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Testimonials Grid - 3 cards */}
          <div className="flex-1 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleTestimonials.map((testimonial, index) => (
                <div
                  key={currentIndex + index}
                  className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-105"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={testimonial.bgImage || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} transition-opacity duration-500`}
                    ></div>
                    {/* Dark overlay for text readability */}
                    <div className="absolute inset-0 bg-black/50"></div>
                  </div>

                  {/* Content */}
                  <div className="relative p-8 min-h-[420px] flex flex-col">
                    {/* Quote Icon */}
                    <div className="mb-6">
                      <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110 group-hover:rotate-6 shadow-xl">
                        <Quote className="w-7 h-7 text-white" />
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-lg" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-white text-lg leading-relaxed mb-auto flex-grow">"{testimonial.content}"</p>

                    {/* Author Info */}
                    <div className="mt-8 pt-6 border-t border-white/20">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            className="w-14 h-14 rounded-full object-cover ring-4 ring-white/30 transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
                        </div>
                        <div>
                          <div className="font-bold text-white text-lg">{testimonial.name}</div>
                          <div className="text-sm text-gray-200">{testimonial.role}</div>
                          <div className="text-xs text-gray-300 mt-0.5">{testimonial.company}</div>
                        </div>
                      </div>
                    </div>

                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {testimonials.length > cardsPerPage && (
            <button
              onClick={handleNext}
              className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-xl"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {testimonials.length > cardsPerPage && (
          <div className="flex justify-center gap-2 mt-8">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * cardsPerPage)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentPage ? "bg-white w-8" : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="max-w-2xl mx-auto">
            <p className="text-gray-400 mb-8 text-lg">Join thousands of satisfied users</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* Primary button */}
              <button className="group relative px-8 py-4 bg-white text-slate-900 rounded-lg font-semibold text-base transition-all duration-300 hover:shadow-xl hover:shadow-white/20 hover:-translate-y-0.5 min-w-[200px]">
                <span className="relative z-10">Get Started Today</span>
              </button>

              {/* Secondary button */}
              <button className="group relative px-8 py-4 bg-transparent text-white rounded-lg font-semibold text-base border-2 border-white/20 hover:border-white/40 transition-all duration-300 hover:bg-white/5 hover:-translate-y-0.5 min-w-[200px]">
                <span className="relative z-10">View All Stories</span>
              </button>
            </div>

            <p className="text-gray-500 text-sm mt-6">No credit card required • Free forever plan available</p>
          </div>
        </div>
      </div>
    </section>
  )
}
