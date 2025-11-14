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
        opacity: 1,
        transform: `translateY(0px)`,
        transition: `all 0.6s ${index * 0.1}s`,
      }}
      className="review-card opacity-0 translate-y-8 group relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-[28px] p-8 hover:bg-white/[0.05] hover:border-white/[0.15] transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(147,51,234,0.2)] hover:-translate-y-2"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.03] via-transparent to-pink-500/[0.03] rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden rounded-[28px]">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>

      <div className="absolute -top-4 left-8 z-10">
        <div className="relative w-10 h-10 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-[0_8px_24px_-4px_rgba(147,51,234,0.4)]">
          <Quote className="w-5 h-5 text-white" />
          <div className="absolute inset-0 bg-white/20 rounded-2xl blur-sm" />
        </div>
      </div>

      <div className="relative flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={review.avatar}
              alt={review.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white/[0.15] shadow-lg hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
              <CheckCircle className="w-3 h-3 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-0.5">
              {review.name}
            </h3>
            <p className="text-purple-300/90 text-sm mb-2 font-medium">
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
          <span className="px-3 py-1.5 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 text-green-300 text-xs font-semibold rounded-full backdrop-blur-sm">
            ✓ Verified
          </span>
          {review.featured && (
            <span className="px-3 py-1.5 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold rounded-full backdrop-blur-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Featured
            </span>
          )}
        </div>
      </div>

      <div className="relative flex flex-wrap items-center gap-2 mb-5">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/[0.08] border border-purple-500/20 text-purple-300 rounded-xl text-xs font-medium backdrop-blur-sm">
          <Briefcase className="w-3.5 h-3.5" />
          {review.course}
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/[0.08] border border-blue-500/20 text-blue-300 rounded-xl text-xs font-medium backdrop-blur-sm">
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
            className="text-purple-400 hover:text-purple-300 text-sm mt-2.5 font-semibold transition-colors"
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
              className="px-3 py-1.5 bg-gradient-to-r from-orange-500/[0.08] to-red-500/[0.08] border border-orange-500/20 text-orange-300 text-xs font-semibold rounded-full backdrop-blur-sm"
            >
              {achievement}
            </span>
          ))}
        </div>
      )}

      <div className="relative flex items-center justify-between pt-5 border-t border-white/[0.08]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95 ${
              liked
                ? "bg-gradient-to-r from-red-500/15 to-pink-500/15 border border-red-500/30 text-red-300 shadow-lg shadow-red-500/10"
                : "bg-white/[0.03] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.12]"
            }`}
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
            {review.likes + (liked ? 1 : 0)}
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.12] rounded-xl text-sm font-semibold transition-all">
            <MessageCircle className="w-4 h-4" />
            Reply
          </button>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.12] rounded-xl text-sm font-semibold transition-all">
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

  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll(".review-card");
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.85;
        if (isInView) {
          card.classList.add("card-visible");
        }
      });
    };

    const styleElement = document.createElement("style");
    styleElement.textContent = `
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

      .animate-fade-in {
        animation: fadeIn 0.6s ease-out forwards;
      }

      .animate-fade-in-delay {
        animation: fadeIn 0.6s ease-out 0.2s forwards;
        opacity: 0;
      }

      .review-card {
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .review-card.card-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(styleElement);

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.head.removeChild(styleElement);
    };
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black py-8">
      <section className="py-4 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight animate-fade-in">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Student Reviews
              </span>
            </h1>

            <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-delay">
              Discover what our students say about their transformative learning
              journey
            </p>
          </div>

          <div className="flex justify-center mb-10">
            <div className="relative w-full max-w-xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400/60" />
              <input
                type="text"
                placeholder="Search reviews by name, course, or content..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-4 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl text-white placeholder-gray-400/60 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.05] transition-all shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {currentReviews.map((review, index) => (
              <ReviewCard key={review.id} review={review} index={index} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 animate-fade-in">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="group relative flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-purple-600/10 to-pink-600/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl text-white disabled:opacity-40 disabled:cursor-not-allowed hover:from-purple-600/20 hover:to-pink-600/20 hover:border-purple-500/40 transition-all duration-300 font-semibold text-sm overflow-hidden active:scale-95 shadow-lg shadow-purple-500/10"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                <ArrowLeft className="w-4 h-4 relative z-10 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="relative z-10">Previous</span>
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative w-12 h-12 rounded-2xl font-bold text-sm transition-all duration-300 overflow-hidden ${
                        currentPage === page
                          ? "bg-gradient-to-br from-purple-600 via-purple-500 to-pink-600 text-white shadow-[0_8px_24px_-4px_rgba(147,51,234,0.5)] border border-purple-400/30 scale-110"
                          : "bg-white/[0.03] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.15] hover:scale-105 active:scale-95"
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
                className="group relative flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-purple-600/10 to-pink-600/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl text-white disabled:opacity-40 disabled:cursor-not-allowed hover:from-purple-600/20 hover:to-pink-600/20 hover:border-purple-500/40 transition-all duration-300 font-semibold text-sm overflow-hidden active:scale-95 shadow-lg shadow-purple-500/10"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                <span className="relative z-10">Next</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
