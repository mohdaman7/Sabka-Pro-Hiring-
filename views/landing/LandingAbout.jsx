import { Building2, Users, GraduationCap, Briefcase, Shield, TrendingUp } from "lucide-react"

export default function LandingAbout() {
  return (
    <section
      id="about"
      className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-200/30 to-blue-200/30 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
            <Building2 className="w-4 h-4" />
            About Sabka Pro HIRING
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Connecting Talent with Opportunity</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A comprehensive job consultancy and training platform that bridges the gap between verified candidates and
            verified employers through innovative technology and personalized support.
          </p>
        </div>

        {/* Mission Statement Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16 border border-blue-100 hover:shadow-2xl transition-shadow duration-300">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To empower job seekers with the skills, guidance, and opportunities they need to succeed while helping
                employers find the perfect talent for their organizations. We believe in creating meaningful connections
                that drive career growth and business success.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 border-2 border-white"></div>
                </div>
                <span className="text-sm font-semibold text-gray-700">Trusted by 10,000+ users</span>
              </div>
            </div>
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop"
                alt="Team collaboration"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Key Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-blue-100 group">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/30">
              <Users className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">For Candidates</h3>
            <p className="text-gray-600 leading-relaxed">
              Access personalized job matching, skill development courses, interview preparation, and career guidance
              through our intuitive PWA app.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-purple-100 group">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/30">
              <Briefcase className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">For Employers</h3>
            <p className="text-gray-600 leading-relaxed">
              Post jobs, access verified candidates, manage applications through our ATS, and find the perfect talent
              for your organization efficiently.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-cyan-100 group">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-500/30">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Training & Development</h3>
            <p className="text-gray-600 leading-relaxed">
              Comprehensive courses across IT, Management, Engineering, and Marketing with progress tracking and
              certification.
            </p>
          </div>
        </div>

        {/* Platform Highlights */}
        <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl p-8 md:p-12 shadow-2xl">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Our Comprehensive Platform</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Verified Profiles</h4>
                <p className="text-blue-200 text-sm">
                  All candidates and employers go through a thorough verification process ensuring authenticity and
                  trust.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Advanced CRM</h4>
                <p className="text-blue-200 text-sm">
                  Powerful internal management system for staff to track leads, manage proposals, and monitor progress.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">ATS Integration</h4>
                <p className="text-blue-200 text-sm">
                  Complete applicant tracking system with resume parsing, filtering, and interview scheduling.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Video Learning</h4>
                <p className="text-blue-200 text-sm">
                  DRM-protected video courses with progress tracking and category-wise organization.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-pink-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">PWA Apps</h4>
                <p className="text-blue-200 text-sm">
                  Dedicated mobile apps for candidates and employers with offline capabilities and push notifications.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Smart Matching</h4>
                <p className="text-blue-200 text-sm">
                  AI-powered job matching based on skills, experience, location, and preferences.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center border border-blue-100 hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
            <div className="text-gray-600 font-medium">Active Users</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center border border-purple-100 hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
            <div className="text-gray-600 font-medium">Partner Companies</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center border border-cyan-100 hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl font-bold text-cyan-600 mb-2">50+</div>
            <div className="text-gray-600 font-medium">Training Courses</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center border border-orange-100 hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl font-bold text-orange-600 mb-2">95%</div>
            <div className="text-gray-600 font-medium">Success Rate</div>
          </div>
        </div>
      </div>
    </section>
  )
}
