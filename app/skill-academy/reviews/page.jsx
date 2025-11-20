"use client";
import { useState, useEffect } from "react";
import {
  Star,
  Quote,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Search,
  Heart,
  MessageCircle,
  Share2,
  MapPin,
  Briefcase,
  Sparkles,
} from "lucide-react";

const ReviewCard = ({ review, index }) => {
  const [liked, setLiked] = useState(false);
  const [showFullReview, setShowFullReview] = useState(false);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-400/40"
        }`}
      />
    ));
  };

  return (
    <div
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
      className="animate-fadeInUp group relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-[28px] p-8 hover:bg-white/[0.05] hover:border-[#9463a8]/30 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(105,44,122,0.3)] hover:-translate-y-2"
    >
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#692c7a]/10 via-[#9463a8]/5 to-transparent rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow" />

      {/* Shine Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden rounded-[28px]">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent animate-shine" />
      </div>

      {/* Quote Icon */}
      <div className="absolute -top-4 left-8 z-10">
        <div className="relative w-10 h-10 bg-gradient-to-br from-[#692c7a] via-[#9463a8] to-[#b893d1] rounded-2xl flex items-center justify-center shadow-[0_8px_24px_-4px_rgba(105,44,122,0.4)] hover:rotate-12 hover:scale-110 transition-transform duration-300">
          <Quote className="w-5 h-5 text-white" />
          <div className="absolute inset-0 bg-white/20 rounded-2xl blur-sm" />
        </div>
      </div>

      <div className="relative flex items-start justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={review.avatar}
              alt={review.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white/[0.15] shadow-lg hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-2 border-[#1a0d2e] flex items-center justify-center">
              <CheckCircle className="w-3 h-3 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-0.5">
              {review.name}
            </h3>
            <p className="text-[#b893d1] text-sm mb-2 font-medium">
              {review.role}
            </p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {renderStars(review.rating)}
              </div>
              <span className="text-xs text-gray-400/80 font-medium">
                {review.date}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className="px-3 py-1.5 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 text-green-300 text-xs font-semibold rounded-full backdrop-blur-sm hover:scale-105 transition-transform duration-200">
            ✓ Verified
          </span>
          {review.featured && (
            <span className="px-3 py-1.5 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold rounded-full backdrop-blur-sm flex items-center gap-1 hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-3 h-3" />
              Featured
            </span>
          )}
        </div>
      </div>

      <div className="relative flex flex-wrap items-center gap-2 mb-5">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#692c7a]/10 border border-[#9463a8]/30 text-[#b893d1] rounded-xl text-xs font-medium backdrop-blur-sm hover:scale-105 transition-transform duration-200">
          <Briefcase className="w-3.5 h-3.5" />
          {review.course}
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/[0.08] border border-blue-500/20 text-blue-300 rounded-xl text-xs font-medium backdrop-blur-sm hover:scale-105 transition-transform duration-200">
          <MapPin className="w-3.5 h-3.5" />
          {review.location}
        </div>
      </div>

      <div className="relative mb-6">
        <p className="text-gray-300/90 leading-relaxed text-[15px]">
          {showFullReview
            ? review.content
            : `${review.content.substring(0, 200)}...`}
        </p>
        {review.content.length > 200 && (
          <button
            onClick={() => setShowFullReview(!showFullReview)}
            className="text-[#9463a8] hover:text-[#b893d1] hover:translate-x-1 text-sm mt-2.5 font-semibold transition-all duration-200 inline-block"
          >
            {showFullReview ? "Show Less" : "Read More →"}
          </button>
        )}
      </div>

      {review.achievements && (
        <div className="relative flex flex-wrap gap-2 mb-6">
          {review.achievements.map((achievement, i) => (
            <span
              key={i}
              className="px-3 py-1.5 bg-gradient-to-r from-[#692c7a]/10 to-[#9463a8]/10 border border-[#692c7a]/30 text-[#d8b4f0] text-xs font-semibold rounded-full backdrop-blur-sm hover:scale-105 transition-transform duration-200"
            >
              {achievement}
            </span>
          ))}
        </div>
      )}

      <div className="relative flex items-center justify-between pt-5 border-t border-white/[0.08] flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95 ${
              liked
                ? "bg-gradient-to-r from-red-500/15 to-pink-500/15 border border-red-500/30 text-red-300 shadow-lg shadow-red-500/10"
                : "bg-white/[0.03] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.12]"
            }`}
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
            {review.likes + (liked ? 1 : 0)}
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.12] rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95">
            <MessageCircle className="w-4 h-4" />
            Reply
          </button>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.12] rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95">
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>
    </div>
  );
};

export default function ReviewsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Full Stack Developer",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      rating: 5,
      date: "2 weeks ago",
      course: "Full Stack Development",
      location: "San Francisco, CA",
      content:
        "This course completely transformed my career! The instructors are incredibly knowledgeable and the hands-on projects really helped me understand the concepts. I landed my dream job just 3 months after completing the course. The support from the community and mentors was outstanding throughout my learning journey.",
      likes: 24,
      featured: true,
      achievements: ["Job Placement", "Salary Increase", "Career Change"],
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Data Scientist",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      rating: 5,
      date: "1 month ago",
      course: "Data Science & AI",
      location: "New York, NY",
      content:
        "Exceptional quality content and real-world applications. The AI modules were particularly impressive and helped me transition from traditional analytics to machine learning. The career support team was fantastic in helping me prepare for interviews.",
      likes: 18,
      achievements: ["Certification", "Skill Upgrade", "Promotion"],
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "UX Designer",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      rating: 5,
      date: "3 weeks ago",
      course: "UI/UX Design",
      location: "Austin, TX",
      content:
        "The design thinking approach taught here is revolutionary. I've applied these principles in my current role and seen immediate improvements in user engagement. The portfolio projects were industry-standard and really showcased my skills to potential employers.",
      likes: 31,
      featured: true,
      achievements: ["Portfolio Building", "Client Success", "Design Awards"],
    },
    {
      id: 4,
      name: "David Kim",
      role: "DevOps Engineer",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      rating: 4,
      date: "1 week ago",
      course: "Cloud Architecture",
      location: "Seattle, WA",
      content:
        "Great practical approach to cloud technologies. The AWS and Azure modules were comprehensive and the hands-on labs were exactly what I needed to gain confidence in cloud deployment strategies.",
      likes: 15,
      achievements: ["AWS Certified", "Infrastructure Optimization"],
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Product Manager",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
      rating: 5,
      date: "2 months ago",
      course: "Product Management",
      location: "Boston, MA",
      content:
        "This course gave me the strategic thinking skills I needed to excel in product management. The case studies from real companies and the mentorship program were invaluable for my career growth.",
      likes: 22,
      achievements: ["Leadership Role", "Product Launch", "Team Growth"],
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Cybersecurity Analyst",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150",
      rating: 5,
      date: "5 days ago",
      course: "Cybersecurity",
      location: "Washington, DC",
      content:
        "Outstanding curriculum covering all aspects of cybersecurity. The ethical hacking modules and incident response training prepared me for real-world scenarios. Highly recommend for anyone serious about cybersecurity.",
      likes: 19,
      featured: true,
      achievements: [
        "Security Certification",
        "Incident Response",
        "Penetration Testing",
      ],
    },
  ];

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const currentReviews = filteredReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  return (
    <div className="min-h-screen py-8">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#692c7a]/40 to-[#9463a8]/15 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-l from-[#8b4fa8]/30 to-[#692c7a]/10 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <section className="py-4 lg:py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 animate-fadeIn">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight animate-fadeIn">
              <span className="bg-gradient-to-r from-white via-[#b893d1] to-[#d8b4f0] bg-clip-text text-transparent">
                Student Reviews
              </span>
            </h1>

            <p
              className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed animate-fadeIn"
              style={{ animationDelay: "0.2s" }}
            >
              Discover what our students say about their transformative learning
              journey
            </p>
          </div>

          {/* Search Bar */}
          <div
            className="flex justify-center mb-10 animate-fadeIn"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative w-full max-w-xl group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#692c7a] to-[#9463a8] rounded-2xl opacity-20 group-hover:opacity-40 blur transition-opacity duration-300" />
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9463a8]" />
                <input
                  type="text"
                  placeholder="Search reviews by name, course, or content..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-12 pr-4 py-4 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl text-white placeholder-gray-400/60 focus:outline-none focus:border-[#9463a8]/50 focus:bg-white/[0.05] transition-all shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="pb-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {currentReviews.map((review, index) => (
              <ReviewCard key={review.id} review={review} index={index} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 flex-wrap animate-fadeIn">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="group relative flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#692c7a]/10 to-[#9463a8]/10 backdrop-blur-xl border border-[#692c7a]/30 rounded-2xl text-white disabled:opacity-40 disabled:cursor-not-allowed hover:from-[#692c7a]/20 hover:to-[#9463a8]/20 hover:border-[#9463a8]/50 transition-all duration-300 font-semibold text-sm overflow-hidden shadow-lg hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#692c7a]/0 via-[#9463a8]/10 to-[#692c7a]/0 animate-shine-slow" />
                <ArrowLeft className="w-4 h-4 relative z-10 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="relative z-10">Previous</span>
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative w-12 h-12 rounded-2xl font-bold text-sm transition-all duration-300 overflow-hidden hover:scale-105 active:scale-95 ${
                        currentPage === page
                          ? "bg-gradient-to-br from-[#692c7a] via-[#9463a8] to-[#b893d1] text-white shadow-[0_8px_24px_-4px_rgba(105,44,122,0.5)] border border-[#9463a8]/50 scale-110"
                          : "bg-white/[0.03] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.15]"
                      }`}
                    >
                      {currentPage === page && (
                        <div className="absolute inset-0 bg-white/20 blur-xl animate-pulse" />
                      )}
                      <span className="relative z-10">{page}</span>
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="group relative flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#692c7a]/10 to-[#9463a8]/10 backdrop-blur-xl border border-[#692c7a]/30 rounded-2xl text-white disabled:opacity-40 disabled:cursor-not-allowed hover:from-[#692c7a]/20 hover:to-[#9463a8]/20 hover:border-[#9463a8]/50 transition-all duration-300 font-semibold text-sm overflow-hidden shadow-lg hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#692c7a]/0 via-[#9463a8]/10 to-[#692c7a]/0 animate-shine-slow" />
                <span className="relative z-10">Next</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          )}
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

        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes shineSlow {
          0%,
          100% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
        }

        @keyframes pulseSlow {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: floatDelayed 10s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animate-shine {
          animation: shine 1.5s ease-in-out infinite;
          animation-delay: 3s;
        }

        .animate-shine-slow {
          animation: shineSlow 4s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulseSlow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
