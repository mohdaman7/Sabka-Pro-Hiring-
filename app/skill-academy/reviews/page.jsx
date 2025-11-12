"use client";

import { motion, useInView } from "framer-motion";
import { useState, useRef } from "react";
import {
  Star,
  Quote,
  Play,
  ThumbsUp,
  Award,
  TrendingUp,
  Users,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Filter,
  Search,
  Heart,
  MessageCircle,
  Share2,
  Calendar,
  MapPin,
  Briefcase,
} from "lucide-react";
import Link from "next/link";

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  React.useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value.replace(/[^0-9]/g, ''));
      const increment = end / (duration * 60);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{value.replace(/[0-9]/g, '').replace(',', '')}
    </span>
  );
};

// Review Card Component
const ReviewCard = ({ review, index }) => {
  const [liked, setLiked] = useState(false);
  const [showFullReview, setShowFullReview] = useState(false);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-400"
        }`}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        y: -10,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500"
    >
      {/* Quote Icon */}
      <div className="absolute -top-4 left-8">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
          <Quote className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Review Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <motion.img
            whileHover={{ scale: 1.1, rotate: 5 }}
            src={review.avatar}
            alt={review.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20"
          />
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{review.name}</h3>
            <p className="text-purple-300 text-sm mb-2">{review.role}</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {renderStars(review.rating)}
              </div>
              <span className="text-sm text-gray-400">
                {review.date}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-green-500/20 text-green-300 text-xs font-medium rounded-full">
            Verified
          </span>
          {review.featured && (
            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 text-xs font-medium rounded-full">
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Course Info */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
          <Briefcase className="w-3 h-3" />
          {review.course}
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
          <MapPin className="w-3 h-3" />
          {review.location}
        </div>
      </div>

      {/* Review Content */}
      <div className="mb-6">
        <p className="text-gray-300 leading-relaxed">
          {showFullReview ? review.content : `${review.content.substring(0, 200)}...`}
        </p>
        {review.content.length > 200 && (
          <button
            onClick={() => setShowFullReview(!showFullReview)}
            className="text-purple-400 hover:text-purple-300 text-sm mt-2 font-medium"
          >
            {showFullReview ? "Show Less" : "Read More"}
          </button>
        )}
      </div>

      {/* Achievement Tags */}
      {review.achievements && (
        <div className="flex flex-wrap gap-2 mb-6">
          {review.achievements.map((achievement, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 text-xs rounded-full"
            >
              {achievement}
            </span>
          ))}
        </div>
      )}

      {/* Review Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-colors ${
              liked
                ? "bg-red-500/20 text-red-300"
                : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
            {review.likes + (liked ? 1 : 0)}
          </motion.button>
          
          <button className="flex items-center gap-2 px-3 py-1 bg-white/5 text-gray-400 hover:text-white rounded-full text-sm transition-colors">
            <MessageCircle className="w-4 h-4" />
            Reply
          </button>
        </div>
        
        <button className="flex items-center gap-2 px-3 py-1 bg-white/5 text-gray-400 hover:text-white rounded-full text-sm transition-colors">
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>
    </motion.div>
  );
};

export default function ReviewsPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6;

  // Sample reviews data
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Full Stack Developer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      rating: 5,
      date: "2 weeks ago",
      course: "Full Stack Web Development",
      location: "San Francisco, CA",
      content: "This course completely transformed my career! The instructors are incredibly knowledgeable and the hands-on projects really helped me understand the concepts. I landed my dream job just 3 months after completing the course. The support from the community and mentors was outstanding throughout my learning journey.",
      likes: 24,
      featured: true,
      achievements: ["Job Placement", "Salary Increase", "Career Change"]
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Data Scientist",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      rating: 5,
      date: "1 month ago",
      course: "Data Science & AI",
      location: "New York, NY",
      content: "Exceptional quality content and real-world applications. The AI modules were particularly impressive and helped me transition from traditional analytics to machine learning. The career support team was fantastic in helping me prepare for interviews.",
      likes: 18,
      achievements: ["Certification", "Skill Upgrade", "Promotion"]
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "UX Designer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      rating: 5,
      date: "3 weeks ago",
      course: "UI/UX Design Mastery",
      location: "Austin, TX",
      content: "The design thinking approach taught here is revolutionary. I've applied these principles in my current role and seen immediate improvements in user engagement. The portfolio projects were industry-standard and really showcased my skills to potential employers.",
      likes: 31,
      featured: true,
      achievements: ["Portfolio Building", "Client Success", "Design Awards"]
    },
    {
      id: 4,
      name: "David Kim",
      role: "DevOps Engineer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      rating: 4,
      date: "1 week ago",
      course: "Cloud Architecture",
      location: "Seattle, WA",
      content: "Great practical approach to cloud technologies. The AWS and Azure modules were comprehensive and the hands-on labs were exactly what I needed to gain confidence in cloud deployment strategies.",
      likes: 15,
      achievements: ["AWS Certified", "Infrastructure Optimization"]
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
      content: "This course gave me the strategic thinking skills I needed to excel in product management. The case studies from real companies and the mentorship program were invaluable for my career growth.",
      likes: 22,
      achievements: ["Leadership Role", "Product Launch", "Team Growth"]
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Cybersecurity Analyst",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150",
      rating: 5,
      date: "5 days ago",
      course: "Cybersecurity Fundamentals",
      location: "Washington, DC",
      content: "Outstanding curriculum covering all aspects of cybersecurity. The ethical hacking modules and incident response training prepared me for real-world scenarios. Highly recommend for anyone serious about cybersecurity.",
      likes: 19,
      featured: true,
      achievements: ["Security Certification", "Incident Response", "Penetration Testing"]
    }
  ];

  // Filter reviews
  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === "all" ||
                         (selectedFilter === "featured" && review.featured) ||
                         (selectedFilter === "5-star" && review.rating === 5) ||
                         (selectedFilter === "recent" && review.date.includes("week"));
    
    return matchesSearch && matchesFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const currentReviews = filteredReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  // Stats
  const stats = [
    { icon: Star, label: "Average Rating", value: "4.9", color: "from-yellow-500 to-orange-500" },
    { icon: Users, label: "Total Reviews", value: "12,500+", color: "from-blue-500 to-cyan-500" },
    { icon: Award, label: "5-Star Reviews", value: "89%", color: "from-purple-500 to-pink-500" },
    { icon: TrendingUp, label: "Success Rate", value: "95%", color: "from-green-500 to-emerald-500" },
  ];

  const filterOptions = [
    { value: "all", label: "All Reviews" },
    { value: "featured", label: "Featured" },
    { value: "5-star", label: "5 Stars" },
    { value: "recent", label: "Recent" },
  ];

  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-8 shadow-2xl"
            >
              <Star className="w-10 h-10 text-white fill-current" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Student Reviews
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover what our students say about their transformative learning journey
            </p>
          </motion.div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 10,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-white/20 transition-all duration-300"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                  
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl mb-4 shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                    <AnimatedCounter value={stat.value} />
                  </h3>
                  
                  <p className="text-gray-400 font-medium">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedFilter(option.value)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all ${
                      selectedFilter === option.value
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                        : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentReviews.map((review, index) => (
              <ReviewCard key={review.id} review={review} index={index} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-xl font-medium transition-all ${
                      currentPage === page
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                        : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-white/10 rounded-3xl p-8 lg:p-16 overflow-hidden"
          >
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Ready to Join Our Success Stories?
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Start your learning journey today and become our next success story
              </p>
              
              <Link href="/skill-academy/courses">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-xl font-bold text-white shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-3 mx-auto"
                >
                  <CheckCircle className="w-6 h-6" />
                  Start Learning Now
                  <ArrowRight className="w-6 h-6" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
