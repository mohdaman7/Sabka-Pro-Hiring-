"use client";

import {
  Briefcase,
  GraduationCap,
  Calendar,
  TrendingUp,
  ArrowRight,
  Clock,
  MapPin,
} from "lucide-react";

export default function StudentDashboard() {
  const stats = [
    {
      label: "Jobs Applied",
      value: "12",
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Courses Enrolled",
      value: "3",
      icon: GraduationCap,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
    },
    {
      label: "Interviews Scheduled",
      value: "2",
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Profile Views",
      value: "45",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const recommendedJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Solutions Pvt Ltd",
      location: "Mumbai, Maharashtra",
      type: "Full-time",
      salary: "₹6-8 LPA",
      postedDate: "2 days ago",
      matchScore: 95,
    },
    {
      id: 2,
      title: "React Developer",
      company: "Digital Innovations",
      location: "Bangalore, Karnataka",
      type: "Remote",
      salary: "₹8-12 LPA",
      postedDate: "1 week ago",
      matchScore: 88,
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "Global Tech Corp",
      location: "Pune, Maharashtra",
      type: "Full-time",
      salary: "₹10-15 LPA",
      postedDate: "3 days ago",
      matchScore: 82,
    },
  ];

  const upcomingInterviews = [
    {
      id: 1,
      company: "Tech Solutions Pvt Ltd",
      position: "Frontend Developer",
      date: "Tomorrow",
      time: "10:00 AM",
      type: "Video Call",
    },
    {
      id: 2,
      company: "Digital Innovations",
      position: "React Developer",
      date: "Jan 20, 2024",
      time: "2:00 PM",
      type: "In-person",
    },
  ];

  return (
    <div className="relative p-6 space-y-6 min-h-screen overflow-hidden">
      {/* Decorative background orbs matching landing theme */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(128,55,145,0.08)" }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(184,123,209,0.06)" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full blur-2xl"
          style={{ background: "rgba(240,194,238,0.03)" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(128,55,145,0.03),_transparent_30%)]" />
      </div>
      {/* Welcome Section - glass style matching landing */}
      <div
        className="relative overflow-hidden rounded-2xl p-8 text-white shadow-2xl backdrop-blur-md border border-white/6"
        style={{
          background:
            "linear-gradient(90deg, rgba(128,55,145,0.14), rgba(184,123,209,0.08))",
          boxShadow: "0 12px 40px rgba(128,55,145,0.12)",
        }}
      >
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
          Welcome back, Amit!
        </h1>
        <p className="text-white/85 mb-6">
          You have 2 upcoming interviews and 5 new job matches
        </p>
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-lg transition-transform transform hover:-translate-y-0.5 font-medium shadow-lg">
            Browse Jobs
          </button>
          <button className="px-6 py-2 bg-white/6 hover:bg-white/10 text-white rounded-lg transition-colors font-medium border border-white/12">
            Update Profile
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="rounded-xl p-6 shadow-lg transition-all hover:-translate-y-1"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center`}
                  style={{
                    background: "linear-gradient(135deg,#803791,#b87bd1)",
                  }}
                >
                  <Icon className={`w-6 h-6 text-white`} />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-white/80">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recommended Jobs */}
        <div
          className="lg:col-span-2 rounded-xl p-6 shadow-xl"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              Recommended Jobs
            </h2>
            <a
              href="/student/jobs"
              className="text-sm text-[#b87bd1] hover:underline flex items-center gap-1"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="space-y-4">
            {recommendedJobs.map((job) => (
              <div
                key={job.id}
                className="p-4 rounded-lg hover:shadow-2xl transition-all hover:-translate-y-0.5"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                  border: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-white mb-1">
                      {job.title}
                    </h3>
                    <p className="text-sm text-white/80">{job.company}</p>
                  </div>
                  <div
                    className="flex items-center gap-1 px-2 py-1 rounded-full"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                  >
                    <span className="text-xs font-medium text-white">
                      {job.matchScore}% Match
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 text-sm text-white/80 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-white/80" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4 text-white/80" />
                    {job.type}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-white/80" />
                    {job.postedDate}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">
                    {job.salary}
                  </span>
                  <button className="px-4 py-2 bg-gradient-to-r from-[#803791] to-[#b87bd1] hover:opacity-95 text-white rounded-lg transition-colors text-sm font-medium shadow-md">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Interviews */}
        <div
          className="rounded-xl p-6 shadow-xl"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <h2 className="text-xl font-semibold text-white mb-6">
            Upcoming Interviews
          </h2>
          <div className="space-y-4">
            {upcomingInterviews.map((interview) => (
              <div
                key={interview.id}
                className="p-4 rounded-lg"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                  border: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg,#803791,#b87bd1)",
                    }}
                  >
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-sm mb-1">
                      {interview.position}
                    </h3>
                    <p className="text-xs text-white/80 truncate">
                      {interview.company}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-white/85">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Date:</span>
                    <span className="font-medium">{interview.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Time:</span>
                    <span className="font-medium">{interview.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Type:</span>
                    <span
                      className="px-2 py-0.5 rounded text-xs font-medium"
                      style={{
                        background: "rgba(184,123,209,0.08)",
                        color: "#b87bd1",
                      }}
                    >
                      {interview.type}
                    </span>
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-white/6 hover:bg-white/10 text-white rounded-lg transition-colors text-sm font-medium border border-white/8">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course Progress */}
      <div
        className="rounded-xl p-6 shadow-xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Course Progress</h2>
          <a
            href="/student/courses"
            className="text-sm text-[#b87bd1] hover:underline flex items-center gap-1"
          >
            View All Courses
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "React Fundamentals",
              progress: 75,
              lessons: "12/16 lessons",
            },
            { title: "Node.js Backend", progress: 45, lessons: "9/20 lessons" },
            { title: "MongoDB Basics", progress: 90, lessons: "18/20 lessons" },
          ].map((course, index) => (
            <div
              key={index}
              className="p-4 rounded-lg"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                border: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <h3 className="font-semibold text-white mb-2">{course.title}</h3>
              <p className="text-sm text-white/80 mb-3">{course.lessons}</p>
              <div className="w-full bg-white/6 rounded-full h-2 mb-2 overflow-hidden">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: `${course.progress}%`,
                    background: "linear-gradient(90deg,#803791,#b87bd1)",
                  }}
                ></div>
              </div>
              <p className="text-sm text-[#b87bd1] font-medium">
                {course.progress}% Complete
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
