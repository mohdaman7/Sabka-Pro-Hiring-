import { Target, Eye, Heart, Users, Award, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 opacity-70"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              About Us
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Empowering Careers,
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Building Futures
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Sabka Pro HIRING is a leading job consultancy and training platform dedicated to connecting talented
              professionals with exceptional career opportunities while providing comprehensive skill development.
            </p>
          </div>

          {/* Company Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              { value: "10,000+", label: "Active Users", color: "blue" },
              { value: "500+", label: "Partner Companies", color: "cyan" },
              { value: "50+", label: "Training Courses", color: "purple" },
              { value: "95%", label: "Success Rate", color: "green" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100"
              >
                <div
                  className={`text-4xl font-bold bg-gradient-to-r from-${stat.color}-600 to-${stat.color}-500 bg-clip-text text-transparent mb-2`}
                >
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="group relative bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-blue-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To bridge the gap between talent and opportunity by providing innovative solutions that empower job
                  seekers and help employers find the perfect match for their organizations.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="group relative bg-gradient-to-br from-cyan-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-cyan-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-200/30 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To become the most trusted and comprehensive career development platform, transforming the way people
                  find jobs and companies discover talent across the globe.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="group relative bg-gradient-to-br from-purple-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-purple-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
                <p className="text-gray-600 leading-relaxed">
                  Integrity, innovation, and inclusivity drive everything we do. We believe in creating meaningful
                  connections and fostering growth for every individual and organization we serve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded with a vision to revolutionize the job market, Sabka Pro HIRING emerged from the understanding
                  that finding the right career opportunity shouldn't be a challenge. We recognized the disconnect
                  between talented professionals and companies seeking exceptional talent.
                </p>
                <p>
                  What started as a simple job consultancy has evolved into a comprehensive platform offering job
                  matching, professional training, career guidance, and employer solutions. Our commitment to quality
                  and innovation has helped thousands of professionals advance their careers.
                </p>
                <p>
                  Today, we're proud to serve a diverse community of job seekers and employers, providing cutting-edge
                  technology, personalized support, and industry-leading training programs that make a real difference
                  in people's lives.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-semibold text-gray-700">Verified Profiles</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">Expert Training</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md">
                  <CheckCircle2 className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-semibold text-gray-700">24/7 Support</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                <img
                  src="/modern-office-collaboration.jpg"
                  alt="Team collaboration"
                  className="w-full h-80 object-cover rounded-2xl mb-6"
                />
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">2020</div>
                    <div className="text-sm text-gray-600">Founded</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-600">10K+</div>
                    <div className="text-sm text-gray-600">Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">500+</div>
                    <div className="text-sm text-gray-600">Partners</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
