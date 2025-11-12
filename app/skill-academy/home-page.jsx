"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  GraduationCap,
  Users,
  Award,
  Clock,
  Star,
  Play,
  BookOpen,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Globe,
  Video,
  Download,
  MessageCircle,
  Zap,
  Target,
  Rocket,
  Brain,
  Code,
  Palette,
  BarChart3,
  Shield,
  Sparkles,
  MousePointer2,
  ChevronRight,
  Plus,
  Minus,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";

// Floating Animation Component
const FloatingElement = ({ children, delay = 0, duration = 3 }) => (
  <motion.div
    animate={{
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);

// Magnetic Button Component
const MagneticButton = ({ children, className, href, ...props }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.1, y: y * 0.1 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const ButtonComponent = (
    <motion.button
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );

  return href ? <Link href={href}>{ButtonComponent}</Link> : ButtonComponent;
};

// Parallax Section Component
const ParallaxSection = ({ children, speed = 0.5 }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50 * speed]);

  return (
    <motion.div style={{ y }}>
      {children}
    </motion.div>
  );
};

// Mouse Follower Component
const MouseFollower = ({ mousePosition }) => (
  <motion.div
    className="fixed top-0 left-0 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full pointer-events-none z-50 mix-blend-difference"
    animate={{
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
    }}
    transition={{
      type: "spring",
      stiffness: 500,
      damping: 28,
    }}
  />
);

// FAQ Item Component
const FAQItem = ({ faq, index, isOpen, onToggle }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
  >
    <motion.button
      onClick={onToggle}
      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
      <motion.div
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.3 }}
        className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center"
      >
        <Plus className="w-5 h-5 text-white" />
      </motion.div>
    </motion.button>
    
    <motion.div
      initial={false}
      animate={{
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <div className="px-6 pb-4">
        <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
      </div>
    </motion.div>
  </motion.div>
);

export default function SkillAcademyHome() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [openFAQ, setOpenFAQ] = useState(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Stats data
  const stats = [
    { icon: Users, label: "Active Students", value: "50,000+", color: "from-blue-500 to-cyan-500" },
    { icon: BookOpen, label: "Courses Available", value: "200+", color: "from-purple-500 to-pink-500" },
    { icon: Award, label: "Certifications", value: "15,000+", color: "from-orange-500 to-red-500" },
    { icon: TrendingUp, label: "Success Rate", value: "95%", color: "from-green-500 to-emerald-500" },
  ];

  // Featured courses
  const featuredCourses = [
    {
      id: 1,
      title: "Full Stack Web Development",
      category: "Development",
      students: "12.5k",
      rating: 4.9,
      duration: "40 hours",
      price: "Free",
      icon: Code,
      gradient: "from-blue-500 to-purple-600",
      description: "Master modern web development with React, Node.js, and MongoDB"
    },
    {
      id: 2,
      title: "Data Science & AI",
      category: "Data Science",
      students: "8.3k",
      rating: 4.8,
      duration: "35 hours",
      price: "$299",
      icon: Brain,
      gradient: "from-emerald-500 to-teal-600",
      description: "Learn machine learning, data analysis, and AI fundamentals"
    },
    {
      id: 3,
      title: "UI/UX Design Mastery",
      category: "Design",
      students: "6.7k",
      rating: 4.9,
      duration: "30 hours",
      price: "$199",
      icon: Palette,
      gradient: "from-pink-500 to-rose-600",
      description: "Create stunning user interfaces and experiences"
    },
  ];

  // Features data
  const features = [
    {
      icon: Rocket,
      title: "Fast-Track Learning",
      description: "Accelerated courses designed for quick skill acquisition",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Target,
      title: "Industry-Focused",
      description: "Curriculum aligned with current market demands",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Shield,
      title: "Certified Programs",
      description: "Globally recognized certifications and credentials",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Expert Mentors",
      description: "Learn from industry professionals and experts",
      color: "from-purple-500 to-pink-500"
    },
  ];

  // FAQ data
  const faqs = [
    {
      question: "How do I get started with Sabka Skill Academy?",
      answer: "Getting started is easy! Simply create a free account, browse our course catalog, and enroll in courses that match your learning goals. Many of our courses are free, and you can start learning immediately."
    },
    {
      question: "Are the certificates recognized by employers?",
      answer: "Yes! Our certificates are industry-recognized and valued by employers worldwide. We partner with leading companies to ensure our curriculum meets current industry standards and requirements."
    },
    {
      question: "Can I learn at my own pace?",
      answer: "Absolutely! All our courses are self-paced, allowing you to learn when it's convenient for you. You have lifetime access to course materials, so you can revisit content anytime."
    },
    {
      question: "Do you offer job placement assistance?",
      answer: "Yes, we provide comprehensive career support including resume reviews, interview preparation, and job placement assistance. Our career services team works with you to help achieve your professional goals."
    },
    {
      question: "What if I'm not satisfied with a course?",
      answer: "We offer a 30-day money-back guarantee on all paid courses. If you're not completely satisfied, contact our support team for a full refund within 30 days of purchase."
    },
    {
      question: "Are there any prerequisites for the courses?",
      answer: "Most of our beginner courses have no prerequisites. For intermediate and advanced courses, we clearly list any required knowledge or skills. You can always start with our foundational courses if needed."
    },
  ];

  return (
    <div className="relative">
      <MouseFollower mousePosition={mousePosition} />
      
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <FloatingElement delay={0} duration={4}>
            <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl" />
          </FloatingElement>
          <FloatingElement delay={1} duration={5}>
            <div className="absolute top-40 right-32 w-24 h-24 bg-pink-500/20 rounded-full blur-xl" />
          </FloatingElement>
          <FloatingElement delay={2} duration={3}>
            <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-500/20 rounded-full blur-xl" />
          </FloatingElement>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <FloatingElement delay={0.5}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full mb-8">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-300">
                  Transform Your Career Today
                </span>
              </div>
            </FloatingElement>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Master Skills
              </span>
              <br />
              <motion.span
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto]"
              >
                Shape Future
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Join the revolution of online learning with cutting-edge courses, 
              expert mentors, and industry-recognized certifications.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <MagneticButton
                href="/skill-academy/courses"
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold text-lg text-white shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-3"
              >
                <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                Start Learning Now
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </MagneticButton>

              <MagneticButton
                href="/skill-academy/about"
                className="group px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl font-semibold text-lg text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-3"
              >
                <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Watch Demo
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <ParallaxSection speed={0.3}>
        <section className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Trusted by Learners Worldwide
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Join a community of ambitious learners and industry professionals
              </p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
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
                    
                    <motion.h3
                      initial={{ scale: 1 }}
                      whileInView={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="text-3xl lg:text-4xl font-bold text-white mb-2"
                    >
                      {stat.value}
                    </motion.h3>
                    
                    <p className="text-gray-400 font-medium">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* Featured Courses Section */}
      <ParallaxSection speed={0.4}>
        <section className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Featured Courses
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Discover our most popular and highly-rated courses
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.map((course, index) => {
                const Icon = course.icon;
                return (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    whileHover={{ 
                      y: -10,
                      rotateX: 5,
                      transition: { duration: 0.3 }
                    }}
                    className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500"
                  >
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                    
                    {/* Course Icon */}
                    <div className="relative p-8">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${course.gradient} rounded-2xl mb-6 shadow-lg`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>

                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm font-medium rounded-full">
                          {course.category}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                          course.price === "Free" 
                            ? "bg-green-500/20 text-green-300" 
                            : "bg-orange-500/20 text-orange-300"
                        }`}>
                          {course.price}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                        {course.title}
                      </h3>
                      
                      <p className="text-gray-400 mb-6 leading-relaxed">
                        {course.description}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {course.students}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {course.duration}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          {course.rating}
                        </div>
                      </div>

                      <MagneticButton
                        href={`/skill-academy/courses/${course.id}`}
                        className="w-full py-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl font-semibold text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2 group"
                      >
                        <span>Enroll Now</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.div>
                      </MagneticButton>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mt-12"
            >
              <MagneticButton
                href="/skill-academy/courses"
                className="px-8 py-4 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/20 rounded-2xl font-semibold text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-3 mx-auto"
              >
                View All Courses
                <ChevronRight className="w-5 h-5" />
              </MagneticButton>
            </motion.div>
          </div>
        </section>
      </ParallaxSection>

      {/* Features Section */}
      <ParallaxSection speed={0.2}>
        <section className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Why Choose Sabka Skill Academy?
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Experience the future of online learning with our innovative approach
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ 
                      y: -10,
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                    className="group text-center"
                  >
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${feature.color} rounded-3xl mb-6 shadow-2xl group-hover:shadow-3xl transition-shadow duration-300`}
                    >
                      <Icon className="w-10 h-10 text-white" />
                    </motion.div>
                    
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* FAQ Section */}
      <ParallaxSection speed={0.3}>
        <section className="py-20 lg:py-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-8 shadow-2xl"
              >
                <HelpCircle className="w-10 h-10 text-white" />
              </motion.div>

              <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Got questions? We've got answers. Here are the most common questions about our platform.
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  faq={faq}
                  index={index}
                  isOpen={openFAQ === index}
                  onToggle={() => toggleFAQ(index)}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mt-12"
            >
              <p className="text-gray-400 mb-6">
                Still have questions? We're here to help!
              </p>
              <Link href="/skill-academy/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/20 rounded-2xl font-semibold text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-3 mx-auto"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contact Support
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </ParallaxSection>

      {/* CTA Section */}
      <ParallaxSection speed={0.1}>
        <section className="py-20 lg:py-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-white/10 rounded-3xl p-8 lg:p-16 overflow-hidden"
            >
              {/* Animated Background */}
              <div className="absolute inset-0">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
                />
              </div>

              <div className="relative z-10">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-8 shadow-2xl"
                >
                  <Rocket className="w-10 h-10 text-white" />
                </motion.div>

                <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Ready to Transform Your Career?
                </h2>
                
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Join thousands of successful students and start your journey today. 
                  Your future self will thank you.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <MagneticButton
                    href="/skill-academy/register"
                    className="group px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-xl font-bold text-white shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-3"
                  >
                    <Sparkles className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                    Start Learning Now
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-6 h-6" />
                    </motion.div>
                  </MagneticButton>

                  <MagneticButton
                    href="/skill-academy/contact"
                    className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl font-semibold text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-3"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Talk to Expert
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </ParallaxSection>
    </div>
  );
}
