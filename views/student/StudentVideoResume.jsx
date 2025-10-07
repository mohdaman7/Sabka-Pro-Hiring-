"use client";

import { useState, useRef } from "react";
import {
  Video,
  Upload,
  Play,
  Trash2,
  Check,
  Clock,
  Camera,
  FileVideo,
  Sparkles,
  AlertCircle,
  Share2,
  Eye,
  FileText,
  Download,
  Edit3,
  Award,
  Briefcase,
  GraduationCap,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Crown,
  Lock,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function VideoResumePage() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideos, setRecordedVideos] = useState([
    {
      id: 1,
      title: "Introduction Video",
      duration: "2:34",
      uploadDate: "2024-01-15",
      status: "active",
      thumbnail: "/videoresume.jpg",
      views: 127,
      size: "24.5 MB",
    },
  ]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState("video"); // "video" or "ats"
  const [isProStudent, setIsProStudent] = useState(true); // Change this to false to see locked state
  const fileInputRef = useRef(null);

  // Mock ATS Resume Data
  const [atsResume, setAtsResume] = useState({
    personalInfo: {
      name: "John Doe",
      title: "Senior Frontend Developer",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      portfolio: "johndoe.dev",
      linkedin: "linkedin.com/in/johndoe",
      github: "github.com/johndoe",
    },
    summary:
      "Experienced Frontend Developer with 5+ years of expertise in React, TypeScript, and modern web technologies. Passionate about creating responsive, accessible, and performant web applications.",
    experience: [
      {
        id: 1,
        title: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        period: "2022 - Present",
        description:
          "Lead development of customer-facing web applications using React and TypeScript. Improved application performance by 40% through code optimization.",
        skills: ["React", "TypeScript", "Next.js", "GraphQL"],
      },
      {
        id: 2,
        title: "Frontend Developer",
        company: "StartUpXYZ",
        period: "2020 - 2022",
        description:
          "Developed and maintained multiple client projects using Vue.js and Node.js. Collaborated with design team to implement responsive UI components.",
        skills: ["Vue.js", "JavaScript", "Node.js", "SASS"],
      },
    ],
    education: [
      {
        id: 1,
        degree: "Bachelor of Science in Computer Science",
        institution: "University of Technology",
        period: "2016 - 2020",
        gpa: "3.8/4.0",
      },
    ],
    skills: {
      technical: [
        "React",
        "TypeScript",
        "Next.js",
        "Node.js",
        "GraphQL",
        "Tailwind CSS",
        "Jest",
        "Cypress",
      ],
      soft: [
        "Team Leadership",
        "Problem Solving",
        "Agile Methodology",
        "Communication",
      ],
    },
    atsScore: 85,
  });

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file drop logic here
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleDelete = (id) => {
    setRecordedVideos(recordedVideos.filter((video) => video.id !== id));
  };

  const handleUpgradeToPro = () => {
    // Handle upgrade logic here
    setIsProStudent(true);
  };

  const handleConvertToATS = () => {
    // Handle ATS conversion logic here
    alert("Converting your resume to ATS-optimized format...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Stand out with video & ATS-optimized resumes
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-balance">
            Create Your Professional Profile
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto text-pretty">
            Make a lasting impression with video resumes and ATS-optimized
            documents that get you noticed by employers.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-2 rounded-2xl shadow-lg border border-slate-200">
            <div className="flex gap-2">
              <Button
                onClick={() => setActiveTab("video")}
                variant={activeTab === "video" ? "default" : "ghost"}
                className={`rounded-xl px-8 py-3 font-semibold transition-all duration-300 ${
                  activeTab === "video"
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Video className="w-5 h-5 mr-2" />
                Video Resume
              </Button>
              <Button
                onClick={() => setActiveTab("ats")}
                variant={activeTab === "ats" ? "default" : "ghost"}
                className={`rounded-xl px-8 py-3 font-semibold transition-all duration-300 relative ${
                  activeTab === "ats"
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                } ${!isProStudent ? "pr-12" : ""}`}
              >
                <FileText className="w-5 h-5 mr-2" />
                ATS Resume
                {!isProStudent && (
                  <div className="absolute -top-1 -right-1">
                    <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                      <Lock className="w-3 h-3 text-white" />
                    </div>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Video Resume Content */}
        {activeTab === "video" && (
          <>
            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Upload/Record Section */}
              <Card className="p-8 bg-white shadow-lg border-0 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Camera className="w-5 h-5 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Record or Upload
                  </h2>
                </div>

                {/* Upload Area */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                    isDragging
                      ? "border-purple-500 bg-purple-50 scale-105"
                      : "border-slate-200 bg-slate-50 hover:border-purple-300 hover:bg-purple-50/50"
                  }`}
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-slate-900 mb-2">
                        Drag and drop your video here
                      </p>
                      <p className="text-sm text-slate-500 mb-4">
                        or click to browse files
                      </p>
                      <p className="text-xs text-slate-400">
                        Supports MP4, MOV, AVI (Max 100MB)
                      </p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) => {
                        // Handle file upload
                      }}
                    />
                    <Button
                      onClick={handleFileSelect}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Choose File
                    </Button>
                  </div>
                </div>

                {/* Record Button */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <Button
                    onClick={() => setIsRecording(!isRecording)}
                    variant={isRecording ? "destructive" : "outline"}
                    className={`w-full py-6 rounded-xl font-semibold transition-all duration-300 ${
                      isRecording
                        ? "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                        : "border-2 border-slate-200 hover:border-purple-300 hover:bg-purple-50"
                    }`}
                  >
                    {isRecording ? (
                      <>
                        <div className="w-3 h-3 bg-white rounded-full mr-2 animate-pulse" />
                        Stop Recording
                      </>
                    ) : (
                      <>
                        <Video className="w-5 h-5 mr-2" />
                        Start Recording
                      </>
                    )}
                  </Button>
                </div>
              </Card>

              {/* Tips Section */}
              <Card className="p-8 bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg border-0 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Pro Tips</h2>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      icon: Clock,
                      title: "Keep it concise",
                      description:
                        "Aim for 60-90 seconds. Employers appreciate brevity.",
                    },
                    {
                      icon: Camera,
                      title: "Good lighting matters",
                      description:
                        "Face a window or use soft lighting for a professional look.",
                    },
                    {
                      icon: FileVideo,
                      title: "Practice makes perfect",
                      description:
                        "Rehearse your script before recording to sound natural.",
                    },
                    {
                      icon: Check,
                      title: "Dress professionally",
                      description: "Wear what you'd wear to an interview.",
                    },
                  ].map((tip, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                          <tip.icon className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{tip.title}</h3>
                        <p className="text-sm text-white/80">
                          {tip.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-white/90">
                      <strong>Remember:</strong> Your video resume complements
                      your traditional resume. Highlight your unique personality
                      and passion for your field.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* My Video Resumes Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-1">
                    My Video Resumes
                  </h2>
                  <p className="text-sm text-slate-500">
                    Manage and share your professional video presentations
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl">
                  <Video className="w-4 h-4 text-slate-600" />
                  <span className="text-sm font-semibold text-slate-700">
                    {recordedVideos.length}{" "}
                    {recordedVideos.length === 1 ? "video" : "videos"}
                  </span>
                </div>
              </div>

              {recordedVideos.length === 0 ? (
                <Card className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-purple-50 border-2 border-dashed border-slate-200 rounded-2xl">
                  <div className="p-16 text-center">
                    <div className="relative inline-block mb-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-xl">
                        <Video className="w-12 h-12 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                        <Sparkles className="w-4 h-4 text-yellow-900" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      No video resumes yet
                    </h3>
                    <p className="text-slate-600 mb-6 max-w-md mx-auto leading-relaxed">
                      Start creating your professional video resume to stand out
                      from the crowd and make a memorable impression on
                      employers.
                    </p>
                    <Button
                      onClick={handleFileSelect}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Upload Your First Video
                    </Button>
                  </div>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recordedVideos.map((video) => (
                    <Card
                      key={video.id}
                      className="group relative overflow-hidden bg-white border border-slate-200 rounded-2xl hover:shadow-2xl hover:border-purple-200 transition-all duration-300 hover:-translate-y-2"
                    >
                      {/* Thumbnail Section */}
                      <div className="relative aspect-video bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                        {/* Play Button */}
                        <button
                          onClick={() => setSelectedVideo(video)}
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 group-hover:bg-purple-600">
                            <Play className="w-10 h-10 text-purple-600 group-hover:text-white ml-1 transition-colors duration-300" />
                          </div>
                        </button>

                        {/* Status Badge */}
                        {video.status === "active" && (
                          <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg backdrop-blur-sm">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                            Active
                          </div>
                        )}

                        {/* Duration Badge */}
                        <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {video.duration}
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6">
                        <h3 className="font-bold text-slate-900 mb-3 text-xl leading-tight group-hover:text-purple-600 transition-colors duration-300">
                          {video.title}
                        </h3>

                        {/* Metadata Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-5 pb-5 border-b border-slate-100">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Eye className="w-4 h-4 text-slate-400" />
                            <span className="font-medium">
                              {video.views} views
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <FileVideo className="w-4 h-4 text-slate-400" />
                            <span className="font-medium">{video.size}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-slate-500 mb-5">
                          <span className="font-medium">
                            Uploaded{" "}
                            {new Date(video.uploadDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                            onClick={() => setSelectedVideo(video)}
                          >
                            <Play className="w-4 h-4 mr-1.5" />
                            Watch
                          </Button>
                          <Button
                            size="sm"
                            className="px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 border-2 border-blue-200 hover:border-blue-300 font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            className="px-4 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 border-2 border-red-200 hover:border-red-300 font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
                            onClick={() => handleDelete(video.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Hover Border Effect */}
                      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-300 transition-colors duration-300 pointer-events-none" />
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* What to Include Section */}
            <Card className="p-8 bg-white shadow-lg border-0 rounded-2xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                What to Include in Your Video Resume
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Introduction",
                    description:
                      "Start with your name, current role or status, and what you're looking for.",
                    color: "purple",
                  },
                  {
                    title: "Key Skills",
                    description:
                      "Highlight 3-4 relevant skills with brief examples of how you've used them.",
                    color: "blue",
                  },
                  {
                    title: "Call to Action",
                    description:
                      "End with enthusiasm and invite employers to connect with you.",
                    color: "cyan",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-300"
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                    >
                      <span className="text-white font-bold text-xl">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2 text-lg">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {/* ATS Resume Content */}
        {activeTab === "ats" && (
          <div className="space-y-8">
            {!isProStudent ? (
              /* Pro Student Upgrade Required */
              <Card className="p-12 bg-white shadow-2xl border-0 rounded-2xl">
                <div className="max-w-4xl mx-auto text-center">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-6 py-3 rounded-full text-lg font-semibold mb-8">
                    <Crown className="w-6 h-6" />
                    Pro Student Feature
                  </div>

                  <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl">
                    <Lock className="w-16 h-16 text-white" />
                  </div>

                  <h2 className="text-4xl font-bold text-slate-900 mb-4">
                    Unlock ATS Resume Conversion
                  </h2>

                  <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                    Convert your resume to an ATS-optimized format that gets
                    past automated screening systems and lands more interviews.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {[
                      {
                        icon: Zap,
                        title: "ATS Optimization",
                        description: "Optimize for Applicant Tracking Systems",
                      },
                      {
                        icon: Award,
                        title: "Higher Score",
                        description: "Increase your resume match rate by 70%",
                      },
                      {
                        icon: Briefcase,
                        title: "More Interviews",
                        description: "Get 3x more interview calls",
                      },
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-purple-300 transition-colors duration-300"
                      >
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <feature.icon className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-slate-600 text-sm">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={handleUpgradeToPro}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-6 rounded-xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                      <Crown className="w-6 h-6 mr-3" />
                      Upgrade to Pro Student
                    </Button>
                    <Button
                      onClick={() => setActiveTab("video")}
                      variant="outline"
                      className="px-12 py-6 rounded-xl text-lg font-semibold border-2 border-purple-200 bg-white text-purple-700 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-800 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      Continue with Video Resume
                    </Button>
                  </div>

                  <p className="text-sm text-slate-500 mt-6">
                    Already a Pro Student?{" "}
                    <button className="text-purple-600 font-semibold hover:text-purple-700">
                      Contact support
                    </button>
                  </p>
                </div>
              </Card>
            ) : (
              /* ATS Resume Content for Pro Students */
              <>
                {/* ATS Score Card */}
                <Card className="p-8 bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-2xl border-0 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <Award className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">
                            ATS Resume Score
                          </h2>
                          <p className="text-white/90">
                            How well your resume performs with Applicant
                            Tracking Systems
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Overall Score</span>
                          <span className="text-2xl font-bold">
                            {atsResume.atsScore}%
                          </span>
                        </div>
                        <Progress
                          value={atsResume.atsScore}
                          className="h-3 bg-white/30"
                        />
                        <p className="text-sm text-white/90">
                          {atsResume.atsScore >= 80
                            ? "Excellent! Your resume is well-optimized for ATS systems."
                            : "Good start! Consider optimizing keywords and format for better results."}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Button
                        onClick={handleConvertToATS}
                        className="bg-white text-purple-600 hover:bg-white/90 font-semibold px-6 py-3 rounded-xl shadow-lg"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Convert & Download PDF
                      </Button>
                      <div className="mt-4 flex gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                        >
                          <Edit3 className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Left Column - Personal Info & Skills */}
                  <div className="lg:col-span-1 space-y-6">
                    {/* Personal Info Card */}
                    <Card className="p-6 bg-white shadow-lg border-0 rounded-2xl">
                      <div className="text-center mb-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                          JD
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">
                          {atsResume.personalInfo.name}
                        </h2>
                        <p className="text-purple-600 font-semibold">
                          {atsResume.personalInfo.title}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          <Mail className="w-4 h-4 text-purple-500" />
                          <span>{atsResume.personalInfo.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          <Phone className="w-4 h-4 text-purple-500" />
                          <span>{atsResume.personalInfo.phone}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          <MapPin className="w-4 h-4 text-purple-500" />
                          <span>{atsResume.personalInfo.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          <Globe className="w-4 h-4 text-purple-500" />
                          <span>{atsResume.personalInfo.portfolio}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          <Linkedin className="w-4 h-4 text-purple-500" />
                          <span>{atsResume.personalInfo.linkedin}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          <Github className="w-4 h-4 text-purple-500" />
                          <span>{atsResume.personalInfo.github}</span>
                        </div>
                      </div>
                    </Card>

                    {/* Skills Card */}
                    <Card className="p-6 bg-white shadow-lg border-0 rounded-2xl">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                          <Award className="w-5 h-5 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">
                          Skills
                        </h3>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-slate-700 mb-2">
                            Technical
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {atsResume.skills.technical.map((skill, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-purple-50 text-purple-700 border-purple-200"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-700 mb-2">
                            Soft Skills
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {atsResume.skills.soft.map((skill, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-slate-50 text-slate-700"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Right Column - Experience & Education */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Summary Card */}
                    <Card className="p-6 bg-white shadow-lg border-0 rounded-2xl">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                          <User className="w-5 h-5 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">
                          Professional Summary
                        </h3>
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        {atsResume.summary}
                      </p>
                    </Card>

                    {/* Experience Card */}
                    <Card className="p-6 bg-white shadow-lg border-0 rounded-2xl">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">
                          Work Experience
                        </h3>
                      </div>

                      <div className="space-y-6">
                        {atsResume.experience.map((exp) => (
                          <div
                            key={exp.id}
                            className="pb-6 border-b border-slate-100 last:border-0 last:pb-0"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-bold text-slate-900 text-lg">
                                  {exp.title}
                                </h4>
                                <p className="text-purple-600 font-semibold">
                                  {exp.company}
                                </p>
                              </div>
                              <Badge
                                variant="outline"
                                className="bg-slate-50 text-slate-600"
                              >
                                {exp.period}
                              </Badge>
                            </div>
                            <p className="text-slate-600 mb-3 leading-relaxed">
                              {exp.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {exp.skills.map((skill, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="bg-blue-50 text-blue-700 border-blue-200"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Education Card */}
                    <Card className="p-6 bg-white shadow-lg border-0 rounded-2xl">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                          <GraduationCap className="w-5 h-5 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">
                          Education
                        </h3>
                      </div>

                      <div className="space-y-4">
                        {atsResume.education.map((edu) => (
                          <div key={edu.id}>
                            <h4 className="font-bold text-slate-900">
                              {edu.degree}
                            </h4>
                            <p className="text-slate-600">{edu.institution}</p>
                            <div className="flex justify-between items-center mt-1">
                              <Badge
                                variant="outline"
                                className="bg-slate-50 text-slate-600"
                              >
                                {edu.period}
                              </Badge>
                              {edu.gpa && (
                                <span className="text-sm text-slate-500">
                                  GPA: {edu.gpa}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Optimization Tips */}
                <Card className="p-8 bg-gradient-to-br from-slate-50 to-purple-50 border-0 rounded-2xl">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
                    ATS Optimization Tips
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      {
                        title: "Use Keywords",
                        description:
                          "Include job-specific keywords from the job description",
                      },
                      {
                        title: "Clear Formatting",
                        description:
                          "Use standard fonts and avoid tables/graphics",
                      },
                      {
                        title: "Proper Headings",
                        description:
                          "Use standard section headings like 'Experience', 'Education'",
                      },
                      {
                        title: "File Format",
                        description:
                          "Save as .docx or PDF with selectable text",
                      },
                    ].map((tip, index) => (
                      <div
                        key={index}
                        className="text-center p-4 bg-white rounded-xl shadow-sm border border-slate-200"
                      >
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <Check className="w-6 h-6 text-purple-600" />
                        </div>
                        <h4 className="font-semibold text-slate-900 mb-2">
                          {tip.title}
                        </h4>
                        <p className="text-sm text-slate-600">
                          {tip.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
