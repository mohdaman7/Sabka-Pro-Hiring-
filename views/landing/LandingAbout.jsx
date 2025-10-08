"use client";

import {
  Target,
  Eye,
  Heart,
  Users,
  Award,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated background elements (subtle) */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
            style={{ background: "rgba(128,55,145,0.06)" }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
            style={{
              animationDelay: "1s",
              background: "rgba(184,123,209,0.04)",
            }}
          />
        </div>

        {/* Floating particles (subtle) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: "rgba(184,123,209,0.06)",
                animation: `float ${5 + Math.random() * 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0) translateX(0);
            }
            25% {
              transform: translateY(-20px) translateX(10px);
            }
            50% {
              transform: translateY(-40px) translateX(-10px);
            }
            75% {
              transform: translateY(-20px) translateX(5px);
            }
          }
        `}</style>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 backdrop-blur-sm border"
              style={{
                background:
                  "linear-gradient(90deg, rgba(128,55,145,0.12), rgba(184,123,209,0.08))",
                color: "#e8cfee",
                borderColor: "rgba(128,55,145,0.18)",
              }}
            >
              <Sparkles className="w-4 h-4" />
              About Us
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Empowering Careers,
              <br />
              <span className="gradient-text-blue">Building Futures</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Sabka Pro HIRING is a leading job consultancy and training
              platform dedicated to connecting talented professionals with
              exceptional career opportunities while providing comprehensive
              skill development.
            </p>
          </div>

          {/* Company Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              {
                value: "10,000+",
                label: "Active Users",
                gradient: "from-purple-500 to-fuchsia-500",
              },
              {
                value: "500+",
                label: "Partner Companies",
                gradient: "from-fuchsia-500 to-pink-500",
              },
              {
                value: "50+",
                label: "Training Courses",
                gradient: "from-indigo-500 to-purple-500",
              },
              {
                value: "95%",
                label: "Success Rate",
                gradient: "from-violet-500 to-purple-500",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:bg-white/10"
              >
                <div
                  className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                >
                  {stat.value}
                </div>
                <div className="text-gray-300 font-medium">{stat.label}</div>

                {/* Decorative corner */}
                <div
                  className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500 rounded-bl-full`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="group relative rounded-3xl p-8 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 overflow-hidden">
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ background: "rgba(128,55,145,0.5)" }}
              ></div>

              <div className="relative">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br from-purple-500 to-fuchsia-600 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  To bridge the gap between talent and opportunity by providing
                  innovative solutions that empower job seekers and help
                  employers find the perfect match for their organizations.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="group relative rounded-3xl p-8 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 overflow-hidden">
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ background: "rgba(184,123,209,0.5)" }}
              ></div>

              <div className="relative">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  To become the most trusted and comprehensive career
                  development platform, transforming the way people find jobs
                  and companies discover talent across the globe.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="group relative rounded-3xl p-8 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 overflow-hidden">
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ background: "rgba(240,194,238,0.5)" }}
              ></div>

              <div className="relative">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br from-fuchsia-500 to-pink-600 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Our Values
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Integrity, innovation, and inclusivity drive everything we do.
                  We believe in creating meaningful connections and fostering
                  growth for every individual and organization we serve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 backdrop-blur-sm"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(128,55,145,0.12), rgba(184,123,209,0.08))",
                  borderColor: "rgba(128,55,145,0.18)",
                }}
              >
                <Award className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-semibold text-[#e8cfee]">
                  Our Journey
                </span>
              </div>

              <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Founded with a vision to revolutionize the job market, Sabka
                  Pro HIRING emerged from the understanding that finding the
                  right career opportunity shouldn't be a challenge. We
                  recognized the disconnect between talented professionals and
                  companies seeking exceptional talent.
                </p>
                <p>
                  What started as a simple job consultancy has evolved into a
                  comprehensive platform offering job matching, professional
                  training, career guidance, and employer solutions. Our
                  commitment to quality and innovation has helped thousands of
                  professionals advance their careers.
                </p>
                <p>
                  Today, we're proud to serve a diverse community of job seekers
                  and employers, providing cutting-edge technology, personalized
                  support, and industry-leading training programs that make a
                  real difference in people's lives.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-semibold text-gray-200">
                    Verified Profiles
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-semibold text-gray-200">
                    Expert Training
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-purple-400" />
                  <span className="text-sm font-semibold text-gray-200">
                    24/7 Support
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute inset-0 rounded-3xl blur-3xl opacity-30"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(128,55,145,0.3), transparent)",
                }}
              ></div>

              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop"
                  alt="Team collaboration"
                  className="w-full h-80 object-cover rounded-2xl mb-6"
                />
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                      2020
                    </div>
                    <div className="text-sm text-gray-400">Founded</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-2xl font-bold bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                      10K+
                    </div>
                    <div className="text-sm text-gray-400">Users</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                      500+
                    </div>
                    <div className="text-sm text-gray-400">Partners</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/10 overflow-hidden group">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-fuchsia-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands who have transformed their careers with us
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="group/btn relative px-8 py-4 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:scale-105 overflow-hidden"
                  style={{
                    background: "linear-gradient(90deg,#803791,#b87bd1)",
                    boxShadow: "0 10px 40px rgba(128,55,145,0.3)",
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Get Started Today
                    <ArrowRight className="w-5 h-5" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                </button>

                <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold border-2 border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
