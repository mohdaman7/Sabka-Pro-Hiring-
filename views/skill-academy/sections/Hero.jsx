"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Star, Sparkles, Award, Users, BookOpen, Zap } from "lucide-react";
import { MagneticButton } from "../components/MagneticButton";

export const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Premium Background with Multiple Layers */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-900 z-10" />
        
        {/* Overlay pattern */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/50 via-transparent to-indigo-900/30 z-20" />
        
        {/* Professional background image with better overlay */}
        <img
          src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Professional Learning Environment"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Advanced Animated Background Elements */}
      <div className="absolute inset-0 z-30 overflow-hidden">
        {/* Premium Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.1)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        
        {/* Multiple Floating Orbs */}
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 60, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -120, 80, 0],
            y: [0, 100, -60, 0],
            scale: [1, 0.8, 1.3, 1],
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/12 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 60, -60, 0],
            y: [0, -40, 40, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-500/8 rounded-full blur-2xl"
        />

        {/* Elegant Geometric Lines with Variations */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-purple-400/6 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-indigo-400/8 rounded-full"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-purple-300/10 rounded-full"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-40 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen py-20">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-left"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-purple-500/15 border border-purple-400/30 rounded-full backdrop-blur-xl shadow-lg shadow-purple-500/20"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-purple-400" />
              </motion.div>
              <span className="text-sm font-bold text-purple-300 tracking-wide">SABKA SKILL ACADEMY</span>
              <Star className="w-4 h-4 text-purple-400" />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight"
            >
              <motion.span 
                className="block text-white mb-4"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Transform Your
              </motion.span>
              <motion.span 
                className="block bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Career Today
              </motion.span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-2xl"
            >
              Master in-demand skills with expert-led courses, hands-on projects, and personalized mentorship. 
              Join <span className="text-purple-400 font-semibold">50,000+</span> professionals who've transformed their careers.
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              {[
                { icon: Award, text: "Industry Certified" },
                { icon: Users, text: "Expert Mentors" },
                { icon: Zap, text: "Job Guarantee" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-400/20 rounded-full backdrop-blur-sm"
                >
                  <item.icon className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-purple-300">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="flex flex-col sm:flex-row items-start gap-6"
            >
              <MagneticButton
                href="/skill-academy/courses"
                className="group relative px-12 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl font-bold text-lg text-white shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/75 transition-all duration-300 flex items-center gap-4 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
                <Sparkles className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform" />
                <span className="relative z-10">Start Learning Now</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="relative z-10"
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </MagneticButton>

              <MagneticButton
                href="/skill-academy/about"
                className="group px-12 py-5 bg-white/5 border-2 border-purple-500/30 rounded-2xl font-semibold text-lg text-white hover:bg-purple-500/10 hover:border-purple-500/60 transition-all duration-300 flex items-center gap-4 backdrop-blur-xl"
              >
                <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Watch Demo
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right Content - Premium Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative h-[600px] lg:h-[700px] flex items-center justify-center"
          >
            {/* Glowing background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-indigo-600/15 to-pink-600/10 rounded-3xl blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />

            {/* Premium Cards Stack */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Main Card */}
              <motion.div
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="relative w-80 h-96 bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-purple-500/30 rounded-3xl p-8 backdrop-blur-xl shadow-2xl shadow-purple-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/5 rounded-3xl" />
                
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Premium Course</h3>
                        <p className="text-sm text-purple-300">Full Stack Development</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-purple-400 font-semibold">78%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <motion.div 
                          className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "78%" }}
                          transition={{ duration: 2, delay: 1.5 }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-gray-300">2,847 students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-gray-300">4.9 rating</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Achievement Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute top-8 right-8 bg-white/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <div>
                    <div className="text-sm font-bold text-green-400">Live Classes</div>
                    <div className="text-xs text-gray-300">3.2K+ Active</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-sm font-bold text-white">95% Success</div>
                    <div className="text-xs text-gray-300">Job Placement</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40"
      >
        <motion.div
          className="w-6 h-10 border-2 border-purple-500/40 rounded-full flex justify-center backdrop-blur-sm"
          animate={{ 
            borderColor: ["rgba(147,51,234,0.4)", "rgba(147,51,234,0.8)", "rgba(147,51,234,0.4)"],
            boxShadow: ["0 0 0 rgba(147,51,234,0.4)", "0 0 20px rgba(147,51,234,0.6)", "0 0 0 rgba(147,51,234,0.4)"]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gradient-to-b from-purple-400 to-indigo-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
