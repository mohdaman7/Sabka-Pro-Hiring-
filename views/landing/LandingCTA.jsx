import { ArrowRight } from "lucide-react"

export default function LandingCTA() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 overflow-hidden">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-300/20 via-transparent to-transparent"></div>
      
      {/* Decorative animated circles */}
      <div className="absolute top-10 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 left-20 w-80 h-80 bg-cyan-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 border-2 border-white/20 rounded-full"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 border-2 border-white/10 rounded-lg rotate-45"></div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6">
          <span className="text-sm font-medium text-white">Join Us Today</span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance leading-tight">
          Ready to Take the Next Step?
        </h2>
        
        {/* Description */}
        <p className="text-xl md:text-2xl text-white/95 mb-12 text-pretty max-w-2xl mx-auto leading-relaxed">
          Join thousands of professionals who have found success with Sabka Pro HIRIN.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/register?type=candidate"
            className="group px-8 py-4 bg-white text-blue-600 hover:bg-gray-50 rounded-xl transition-all duration-300 font-semibold inline-flex items-center justify-center gap-2 shadow-2xl shadow-black/20 hover:shadow-black/30 hover:scale-105 min-w-[240px]"
          >
            Get Started as Candidate
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="/register?type=employer"
            className="group px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-blue-600 rounded-xl transition-all duration-300 font-semibold inline-flex items-center justify-center gap-2 hover:scale-105 min-w-[240px]"
          >
            Post Jobs as Employer
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/90">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium">10,000+ Success Stories</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">Verified Platform</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-sm font-medium">Quick Placements</span>
          </div>
        </div>
      </div>
    </section>
  )
}