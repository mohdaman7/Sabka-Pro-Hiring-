import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function LandingCTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary to-accent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">Ready to Take the Next Step?</h2>
        <p className="text-xl text-white/90 mb-8 text-pretty">
          Join thousands of professionals who have found success with Sabka Pro HIRIN.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register?type=candidate"
            className="px-8 py-4 bg-white text-primary hover:bg-gray-100 rounded-lg transition-colors font-semibold inline-flex items-center justify-center gap-2"
          >
            Get Started as Candidate
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/register?type=employer"
            className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-lg transition-colors font-semibold inline-flex items-center justify-center gap-2"
          >
            Post Jobs as Employer
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
