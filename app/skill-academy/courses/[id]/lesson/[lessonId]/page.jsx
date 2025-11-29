"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import LessonView from "@/components/ui/LessonView";
import CertificateModal from "@/components/ui/CertificateModal";
import axios from "@/lib/axios";

export default function LessonPage() {
  const router = useRouter();
  const params = useParams();

  const courseId = params.id;
  const lessonId = params.lessonId;

  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState("user@sabka.com");
  const [userName, setUserName] = useState("Student");
  const [showCertificate, setShowCertificate] = useState(false);
  const [isCourseCompleted, setIsCourseCompleted] = useState(false);

  // Get user email from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("skillAcademyUser");
      if (userData) {
        try {
          const user = JSON.parse(userData);
          setUserEmail(user.email || "user@sabka.com");
          setUserName(user.name || user.email?.split("@")[0] || "Student");
        } catch (e) {
          setUserEmail("user@sabka.com");
          setUserName("Student");
        }
      }
    }
  }, []);

  // Fetch course details with all modules and lessons
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch course with all modules and lessons
        const courseResponse = await axios.get(`/api/courses/${courseId}`);

        const courseData = courseResponse.data.data || courseResponse.data;
        setCourse(courseData);

        // Find the lesson and its module
        let foundModule = null;
        let foundLesson = null;

        if (courseData.modules && Array.isArray(courseData.modules)) {
          for (const mod of courseData.modules) {
            if (mod.lessons && Array.isArray(mod.lessons)) {
              const les = mod.lessons.find((l) => l._id === lessonId);
              if (les) {
                foundLesson = les;
                foundModule = mod;
                break;
              }
            }
          }
        }

        if (!foundLesson) {
          setError("Lesson not found");
          return;
        }

        setLesson(foundLesson);
        setModule(foundModule);
      } catch (err) {
        console.error("Error fetching course:", err);
        setError(err.response?.data?.message || "Failed to load lesson");
      } finally {
        setLoading(false);
      }
    };

    if (courseId && lessonId) {
      fetchCourseData();
    }
  }, [courseId, lessonId]);

  // Handle lesson completion
  const handleLessonComplete = async (completeItemId) => {
    try {
      // Mark lesson as complete on backend
      const response = await axios.post(`/api/progress/mark-complete`, {
        courseId,
        lessonId: completeItemId,
      });

      console.log("Lesson marked as complete");

      // Check if course is fully completed
      if (
        response.data?.courseCompleted ||
        response.data?.data?.courseCompleted
      ) {
        setIsCourseCompleted(true);
        setShowCertificate(true);
      }

      // Alternative: Check total lessons completed vs total lessons
      if (response.data?.data?.progress) {
        const progress = response.data.data.progress;
        if (
          progress.completedLessons &&
          progress.totalLessons &&
          progress.completedLessons === progress.totalLessons
        ) {
          setIsCourseCompleted(true);
          setShowCertificate(true);
        }
      }
    } catch (err) {
      console.error("Error marking lesson complete:", err);
    }
  };

  // Check course completion status
  const checkCourseCompletion = async () => {
    try {
      const response = await axios.get(`/api/progress/course/${courseId}`);
      if (response.data?.data?.courseCompleted) {
        setIsCourseCompleted(true);
      }
    } catch (err) {
      console.error("Error checking course completion:", err);
    }
  };

  // Handle navigation between lessons
  const handleNavigateLesson = (newLessonId, newModuleId) => {
    router.push(`/skill-academy/courses/${courseId}/lesson/${newLessonId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a0f2e] via-[#0f0820] to-[#1a0f2e] flex items-center justify-center">
        {/* Background Elements */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#692c7a]/40 to-[#9463a8]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-[#9463a8]/30 to-[#692c7a]/15 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-3 border-[#692c7a]/30 border-t-[#9463a8] rounded-full"
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a0f2e] via-[#0f0820] to-[#1a0f2e] flex items-center justify-center px-4">
        {/* Background Elements */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#692c7a]/40 to-[#9463a8]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-[#9463a8]/30 to-[#692c7a]/15 rounded-full blur-3xl animate-pulse" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center"
        >
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-white mb-2">{error}</h1>
          <p className="text-gray-400 mb-6">
            The lesson you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => router.push(`/skill-academy/courses/${courseId}`)}
            className="px-6 py-3 bg-gradient-to-r from-[#692c7a] to-[#9463a8] rounded-lg font-semibold text-white hover:from-[#5a1f68] hover:to-[#8a5299] transition-all"
          >
            Back to Course
          </button>
        </motion.div>
      </div>
    );
  }

  if (!lesson || !module || !course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a0f2e] via-[#0f0820] to-[#1a0f2e] flex items-center justify-center">
        {/* Background Elements */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#692c7a]/40 to-[#9463a8]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-[#9463a8]/30 to-[#692c7a]/15 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative z-10 text-white text-center">
          <p>Loading lesson content...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <LessonView
        lesson={lesson}
        module={module}
        courseId={courseId}
        allModules={course.modules || []}
        onLessonComplete={handleLessonComplete}
        onNavigateLesson={handleNavigateLesson}
        userEmail={userEmail}
      />

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
        courseTitle={course?.title || "Course"}
        userName={userName}
        completionDate={new Date().toISOString()}
        courseId={courseId}
      />
    </>
  );
}
