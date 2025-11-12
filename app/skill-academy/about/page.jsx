"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import {
  Target,
  Eye,
  Heart,
  Users,
  Award,
  Globe,
  Rocket,
  Brain,
  Lightbulb,
  Shield,
  TrendingUp,
  CheckCircle,
  Star,
  Play,
  ArrowRight,
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  BookOpen,
  Code,
  Palette,
  BarChart3,
  Zap,
  Coffee,
  Camera,
  Headphones,
  Smartphone,
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

// Team Member Card
const TeamMemberCard = ({ member, index }) => (
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
    className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center hover:border-white/20 transition-all duration-500"
  >
    <div className="relative mb-6">
      <motion.img
        whileHover={{ scale: 1.1, rotate: 5 }}
        src={member.avatar}
        alt={member.name}
        className="w-24 h-24 rounded-2xl object-cover mx-auto border-4 border-white/20 group-hover:border-purple-500/50 transition-colors"
      />
      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
        <CheckCircle className="w-4 h-4 text-white" />
      </div>
    </div>
    
    <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
    <p className="text-purple-300 mb-3">{member.role}</p>
    <p className="text-gray-400 text-sm mb-4">{member.experience}</p>
    
    <div className="flex flex-wrap justify-center gap-2 mb-4">
      {member.skills.map((skill, i) => (
        <span
          key={i}
          className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full"
        >
          {skill}
        </span>
      ))}
    </div>
    
    <div className="flex justify-center gap-3">
      {member.social.map((social, i) => {
        const Icon = social.icon;
        return (
          <motion.a
            key={i}
            href={social.url}
            whileHover={{ scale: 1.2, rotate: 15 }}
            className="w-8 h-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            <Icon className="w-4 h-4" />
          </motion.a>
        );
      })}
    </div>
  </motion.div>
);

// Timeline Item
const TimelineItem = ({ item, index, isLast }) => (
  <motion.div
    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
  >
    <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center shadow-lg`}>
            <item.icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{item.title}</h3>
            <p className="text-purple-300 text-sm">{item.year}</p>
          </div>
        </div>
        <p className="text-gray-400">{item.description}</p>
      </motion.div>
    </div>
    
    <div className="relative flex flex-col items-center">
      <motion.div
        whileHover={{ scale: 1.2 }}
        className={`w-4 h-4 bg-gradient-to-r ${item.color} rounded-full shadow-lg z-10`}
      />
      {!isLast && (
        <div className="w-0.5 h-16 bg-gradient-to-b from-purple-500/50 to-transparent mt-2" />
      )}
    </div>
    
    <div className="flex-1" />
  </motion.div>
);

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Company stats
  const stats = [
    { icon: Users, label: "Students Worldwide", value: "50,000+", color: "from-blue-500 to-cyan-500" },
    { icon: GraduationCap, label: "Expert Instructors", value: "200+", color: "from-purple-500 to-pink-500" },
    { icon: BookOpen, label: "Courses Available", value: "500+", color: "from-orange-500 to-red-500" },
    { icon: Award, label: "Certifications Issued", value: "25,000+", color: "from-green-500 to-emerald-500" },
    { icon: Globe, label: "Countries Reached", value: "150+", color: "from-indigo-500 to-purple-500" },
    { icon: TrendingUp, label: "Success Rate", value: "95%", color: "from-yellow-500 to-orange-500" },
  ];

  // Core values
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for the highest quality in everything we do, from course content to student support.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Heart,
      title: "Passion",
      description: "We're passionate about education and helping students achieve their dreams and career goals.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously innovate our teaching methods and embrace new technologies for better learning.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "We maintain the highest standards of honesty and transparency in all our interactions.",
      color: "from-green-500 to-emerald-500"
    },
  ];

  // Team members
  const teamMembers = [
    {
      name: "Dr. Sarah Mitchell",
      role: "Founder & CEO",
      experience: "15+ years in EdTech",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      skills: ["Leadership", "EdTech", "Strategy"],
      social: [
        { icon: Briefcase, url: "#" },
        { icon: Globe, url: "#" },
        { icon: Camera, url: "#" }
      ]
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Technology",
      experience: "12+ years in Software Development",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      skills: ["Full Stack", "AI/ML", "Cloud"],
      social: [
        { icon: Code, url: "#" },
        { icon: Globe, url: "#" },
        { icon: Smartphone, url: "#" }
      ]
    },
    {
      name: "Emily Chen",
      role: "Head of Curriculum",
      experience: "10+ years in Education",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      skills: ["Curriculum Design", "Pedagogy", "Assessment"],
      social: [
        { icon: BookOpen, url: "#" },
        { icon: Globe, url: "#" },
        { icon: Headphones, url: "#" }
      ]
    },
    {
      name: "David Kim",
      role: "Head of Design",
      experience: "8+ years in UX/UI Design",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      skills: ["UI/UX", "Design Systems", "Prototyping"],
      social: [
        { icon: Palette, url: "#" },
        { icon: Globe, url: "#" },
        { icon: Camera, url: "#" }
      ]
    },
  ];

  // Company timeline
  const timeline = [
    {
      year: "2024",
      title: "Global Expansion",
      description: "Reached 50,000+ students across 150 countries with AI-powered personalized learning.",
      icon: Globe,
      color: "from-purple-500 to-pink-500"
    },
    {
      year: "2023",
      title: "AI Integration",
      description: "Launched AI-powered learning assistant and personalized curriculum recommendations.",
      icon: Brain,
      color: "from-blue-500 to-cyan-500"
    },
    {
      year: "2022",
      title: "Industry Partnerships",
      description: "Formed partnerships with leading tech companies for job placement programs.",
      icon: Briefcase,
      color: "from-green-500 to-emerald-500"
    },
    {
      year: "2021",
      title: "Platform Launch",
      description: "Officially launched Sabka Skill Academy with 50+ courses and expert instructors.",
      icon: Rocket,
      color: "from-orange-500 to-red-500"
    },
    {
      year: "2020",
      title: "Foundation",
      description: "Founded with a vision to democratize quality education and make skills accessible to all.",
      icon: Lightbulb,
      color: "from-yellow-500 to-orange-500"
    },
  ];

  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <motion.section 
        style={{ y }}
        className="py-20 lg:py-32 relative overflow-hidden"
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <Heart className="w-10 h-10 text-white fill-current" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                About Us
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              We're on a mission to democratize quality education and empower individuals 
              with the skills they need to thrive in the digital age.
            </p>
          </motion.div>

          {/* Mission, Vision, Values */}
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center hover:border-white/20 transition-all duration-500"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-400 leading-relaxed">
                To provide accessible, high-quality education that empowers learners 
                to achieve their career goals and transform their lives through skill development.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center hover:border-white/20 transition-all duration-500"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-400 leading-relaxed">
                To become the world's leading platform for skill-based learning, 
                bridging the gap between education and industry requirements.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center hover:border-white/20 transition-all duration-500"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Values</h3>
              <p className="text-gray-400 leading-relaxed">
                Excellence, innovation, integrity, and passion drive everything we do. 
                We believe in the transformative power of education.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
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
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              These numbers represent the lives we've touched and the dreams we've helped realize
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
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
                    {stat.value}
                  </h3>
                  
                  <p className="text-gray-400 font-medium">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
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
              Our Core Values
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The principles that guide our decisions and shape our culture
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
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
                    className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${value.color} rounded-3xl mb-6 shadow-2xl group-hover:shadow-3xl transition-shadow duration-300`}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                    {value.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The passionate individuals behind Sabka Skill Academy's success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={index} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Our Journey
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              From a simple idea to a global platform transforming lives
            </p>
          </motion.div>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <TimelineItem 
                key={index} 
                item={item} 
                index={index} 
                isLast={index === timeline.length - 1}
              />
            ))}
          </div>
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
                Ready to Join Our Mission?
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Be part of the education revolution. Start your learning journey today 
                and help us shape the future of skill-based education.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/skill-academy/courses">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-xl font-bold text-white shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-3"
                  >
                    <GraduationCap className="w-6 h-6" />
                    Start Learning
                    <ArrowRight className="w-6 h-6" />
                  </motion.button>
                </Link>

                <Link href="/skill-academy/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl font-semibold text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-3"
                  >
                    <Coffee className="w-5 h-5" />
                    Get in Touch
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
