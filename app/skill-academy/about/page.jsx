"use client";

import {
  Target,
  Eye,
  Heart,
  Lightbulb,
  Shield,
  Award,
  Rocket,
  Users,
  GraduationCap,
  ArrowRight,
  Coffee,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  // Core values
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description:
        "We strive for the highest quality in everything we do, from course content to student support.",
      color: "from-[#692c7a] to-[#9463a8]",
    },
    {
      icon: Heart,
      title: "Passion",
      description:
        "We're passionate about education and helping students achieve their dreams and career goals.",
      color: "from-[#8b4fa8] to-[#b893d1]",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We continuously innovate our teaching methods and embrace new technologies for better learning.",
      color: "from-[#9463a8] to-[#d8b4f0]",
    },
    {
      icon: Shield,
      title: "Integrity",
      description:
        "We maintain the highest standards of honesty and transparency in all our interactions.",
      color: "from-[#692c7a] to-[#b893d1]",
    },
  ];

  return (
    <div className="min-h-screen py-12">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#692c7a]/40 to-[#9463a8]/15 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-l from-[#8b4fa8]/30 to-[#692c7a]/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#9463a8]/20 to-transparent rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Hero Section */}
      <section className="py-12 lg:py-20 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeIn">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-[#b893d1] to-[#d8b4f0] bg-clip-text text-transparent">
                Empowering Through Education
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              At Sabka Skill Academy, we believe in democratizing quality
              education and empowering individuals with the skills they need to
              thrive in the digital age.
            </p>
          </div>

          {/* Mission, Vision, Values Cards */}
          <div className="grid lg:grid-cols-3 gap-6 mb-16">
            <div className="group bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center hover:border-[#9463a8]/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(105,44,122,0.3)] animate-fadeInUp">
              <div className="w-16 h-16 bg-gradient-to-r from-[#692c7a] to-[#9463a8] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Our Mission
              </h3>
              <p className="text-gray-300 leading-relaxed">
                To provide accessible, high-quality education that empowers
                learners to achieve their career goals and transform their lives
                through skill development.
              </p>
            </div>

            <div
              className="group bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center hover:border-[#9463a8]/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(105,44,122,0.3)] animate-fadeInUp"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#8b4fa8] to-[#b893d1] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed">
                To become a leading platform for skill-based learning, bridging
                the gap between education and industry requirements across the
                nation.
              </p>
            </div>

            <div
              className="group bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center hover:border-[#9463a8]/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(105,44,122,0.3)] animate-fadeInUp"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#9463a8] to-[#d8b4f0] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Our Commitment
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Excellence, innovation, integrity, and passion drive everything
                we do. We believe in the transformative power of quality
                education.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fadeIn">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-[#b893d1] bg-clip-text text-transparent">
              Who We Are
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Sabka Skill Academy is a comprehensive learning platform dedicated
              to providing high-quality, industry-relevant courses that prepare
              students for real-world challenges.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-12 hover:border-[#9463a8]/40 transition-all duration-500 animate-fadeInUp">
            <div className="space-y-6 text-gray-300 leading-relaxed text-base lg:text-lg">
              <p>
                Founded with a vision to make quality education accessible to
                everyone, we have grown into a trusted platform that connects
                passionate learners with expert instructors across various
                domains.
              </p>
              <p>
                Our carefully curated courses span multiple disciplines
                including technology, design, business, and personal
                development. Each course is designed by industry professionals
                who bring real-world experience and practical knowledge to the
                classroom.
              </p>
              <p>
                We understand that every learner is unique, which is why our
                platform offers flexible learning paths, hands-on projects, and
                personalized support to ensure your success. Whether you're
                looking to start a new career, upgrade your skills, or pursue a
                passion, Sabka Skill Academy is here to guide you every step of
                the way.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-10">
              <div className="text-center p-6 bg-white/[0.03] rounded-2xl border border-white/10 hover:border-[#692c7a]/30 transition-all hover:scale-105">
                <Users className="w-10 h-10 text-[#b893d1] mx-auto mb-3" />
                <h4 className="text-white font-bold text-lg mb-2">
                  Expert Instructors
                </h4>
                <p className="text-gray-400 text-sm">
                  Learn from industry professionals
                </p>
              </div>
              <div className="text-center p-6 bg-white/[0.03] rounded-2xl border border-white/10 hover:border-[#692c7a]/30 transition-all hover:scale-105">
                <GraduationCap className="w-10 h-10 text-[#b893d1] mx-auto mb-3" />
                <h4 className="text-white font-bold text-lg mb-2">
                  Quality Courses
                </h4>
                <p className="text-gray-400 text-sm">
                  Industry-relevant curriculum
                </p>
              </div>
              <div className="text-center p-6 bg-white/[0.03] rounded-2xl border border-white/10 hover:border-[#692c7a]/30 transition-all hover:scale-105">
                <CheckCircle className="w-10 h-10 text-[#b893d1] mx-auto mb-3" />
                <h4 className="text-white font-bold text-lg mb-2">
                  Lifetime Access
                </h4>
                <p className="text-gray-400 text-sm">Learn at your own pace</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fadeIn">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-[#b893d1] bg-clip-text text-transparent">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              The principles that guide our decisions and shape our culture
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="group text-center bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-[#9463a8]/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(105,44,122,0.3)] animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#b893d1] transition-colors">
                    {value.title}
                  </h3>

                  <p className="text-gray-300 leading-relaxed text-sm">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, 30px);
          }
        }

        @keyframes floatDelayed {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-20px, -30px);
          }
        }

        @keyframes pulseSlow {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: floatDelayed 10s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animate-pulse-slow {
          animation: pulseSlow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
