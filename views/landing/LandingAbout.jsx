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
  const pillars = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "Bridge the gap between talent and opportunity with innovative, empowering solutions for job seekers and employers.",
      gradientFrom: "from-purple-500",
      gradientTo: "to-fuchsia-600",
      bgColor: "bg-purple-900/40",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "Be the most trusted career development platform, transforming talent discovery and job search globally.",
      gradientFrom: "from-indigo-500",
      gradientTo: "to-purple-600",
      bgColor: "bg-indigo-900/40",
    },
    {
      icon: Heart,
      title: "Our Values",
      description:
        "Integrity, innovation, and inclusivity drive us to create meaningful connections and foster growth for all.",
      gradientFrom: "from-fuchsia-500",
      gradientTo: "to-pink-600",
      bgColor: "bg-pink-900/40",
    },
  ];

  return (
    <div className="min-h-screen relative bg-transparent">
      {/* Retain background and subtle animated blobs */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute top-1/3 left-1/4 w-[28rem] h-[28rem] rounded-full blur-[90px] animate-[pulse_8s_ease-in-out_infinite]"
          style={{ backgroundColor: "rgba(128,55,145,0.12)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] rounded-full blur-[90px] animate-[pulse_8s_ease-in-out_2s_infinite]"
          style={{ backgroundColor: "rgba(184,123,209,0.08)" }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-6 max-w-6xl mx-auto text-center select-none">
        <div
          className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full mb-8 font-semibold text-purple-200 shadow-lg backdrop-blur-sm bg-gradient-to-r from-purple-700/20 to-indigo-900/20 border border-purple-600"
          aria-label="About us badge"
        >
          <Sparkles className="w-5 h-5 animate-pulse text-purple-300" />
          About Us
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
          Empowering Careers,{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            Building Futures
          </span>
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-purple-300 font-light leading-relaxed tracking-wide">
          Sabka Pro HIRING connects talented professionals with career
          opportunities while providing comprehensive skill development and
          personalized support.
        </p>
      </section>

      {/* Pillars Section */}
      <section className="relative py-20 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 select-text">
          {pillars.map(
            (
              {
                icon: Icon,
                title,
                description,
                gradientFrom,
                gradientTo,
                bgColor,
              },
              i
            ) => (
              <article
                key={i}
                className={`relative rounded-3xl p-10 ${bgColor} border border-white/20 backdrop-blur-xl shadow-xl hover:shadow-purple-700/50 transition-shadow duration-500 cursor-default group`}
                tabIndex={0}
                aria-labelledby={`pillar-title-${i}`}
                aria-describedby={`pillar-desc-${i}`}
              >
                {/* Animated glowing orb on hover */}
                <div
                  className="absolute top-6 right-6 w-28 h-28 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle, var(--tw-gradient-stops))`,
                    "--tw-gradient-from": `var(--${gradientFrom})`,
                    "--tw-gradient-to": `var(--${gradientTo})`,
                    filter: "blur(48px)",
                    pointerEvents: "none",
                  }}
                  aria-hidden="true"
                />

                <div
                  className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-6 bg-gradient-to-br ${gradientFrom} ${gradientTo} shadow-lg text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
                >
                  <Icon className="w-8 h-8" />
                </div>
                <h3
                  id={`pillar-title-${i}`}
                  className="text-2xl font-extrabold text-white mb-4 tracking-tight"
                >
                  {title}
                </h3>
                <p
                  id={`pillar-desc-${i}`}
                  className="text-purple-200 leading-relaxed font-light"
                >
                  {description}
                </p>
              </article>
            )
          )}
        </div>
      </section>

      {/* Our Story Section */}
      <section className="relative py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 select-text">
        {/* Text Content */}
        <div className="flex flex-col justify-center">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-purple-600 text-purple-300 mb-6 backdrop-blur-sm shadow-lg"
            aria-label="Our Journey label"
          >
            <Award className="w-5 h-5" />
            Our Journey
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-6 tracking-tight leading-snug">
            Our Story
          </h2>
          <div className="space-y-5 text-purple-300 font-light leading-relaxed text-lg">
            <p>
              Founded to revolutionize the job market, Sabka Pro HIRING emerged
              to connect talented professionals with the right career
              opportunities, overcoming disconnects in the hiring landscape.
            </p>
            <p>
              From a humble consultancy to a comprehensive platform, we offer
              job matching, expert training, career guidance, and employer
              solutions backed by innovative technology and personalized care.
            </p>
            <p>
              Proudly serving thousands of professionals and companies,
              delivering real impact through trusted technology and inclusive
              growth.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            {[
              { iconColor: "text-emerald-400", label: "Verified Profiles" },
              { iconColor: "text-blue-400", label: "Expert Training" },
              { iconColor: "text-purple-400", label: "24/7 Support" },
            ].map(({ iconColor, label }, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-lg px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20"
              >
                <CheckCircle2 className={`w-5 h-5 ${iconColor}`} />
                <span className="text-purple-200 font-semibold">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Image Card with stats */}
        <div
          className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
          aria-label="Team collaboration and milestones"
        >
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop"
            alt="Team collaboration"
            className="w-full h-96 object-cover rounded-t-3xl"
            loading="lazy"
            decoding="async"
          />
          <div className="grid grid-cols-3 text-center p-6 bg-gradient-to-t from-black/70 to-transparent gap-6">
            <div>
              <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                2020
              </p>
              <p className="text-sm text-purple-300 font-medium tracking-wide">
                Founded
              </p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                10K+
              </p>
              <p className="text-sm text-purple-300 font-medium tracking-wide">
                Users
              </p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-500">
                500+
              </p>
              <p className="text-sm text-purple-300 font-medium tracking-wide">
                Partners
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
