"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Download, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function CertificatesPage() {
  const router = useRouter();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Student");
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    // Get user name from localStorage
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("skillAcademyUser");
      if (userData) {
        try {
          const user = JSON.parse(userData);
          setUserName(user.name || user.email?.split("@")[0] || "Student");
        } catch (e) {
          setUserName("Student");
        }
      }
    }
    
    // Fetch completed courses
    const fetchCertificates = async () => {
      try {
        const response = await axios.get("/api/progress/completed-courses");
        const completedCourses = response.data?.data || [];
        setCertificates(completedCourses);
      } catch (err) {
        console.error("Error fetching certificates:", err);
        setCertificates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const downloadCertificate = async (course, format = "pdf") => {
    try {
      setIsDownloading(true);

      // Create certificate HTML
      const certificateHTML = `
        <div style="width: 1200px; height: 800px; background: linear-gradient(to bottom, #FEF3C7, #FCD34D); padding: 60px; font-family: 'Georgia', serif; position: relative; border: 8px solid #92400e;">
          <!-- Decorative corners -->
          <div style="position: absolute; top: 20px; left: 20px; width: 40px; height: 40px; border-top: 3px solid #92400e; border-left: 3px solid #92400e;"></div>
          <div style="position: absolute; top: 20px; right: 20px; width: 40px; height: 40px; border-top: 3px solid #92400e; border-right: 3px solid #92400e;"></div>
          <div style="position: absolute; bottom: 20px; left: 20px; width: 40px; height: 40px; border-bottom: 3px solid #92400e; border-left: 3px solid #92400e;"></div>
          <div style="position: absolute; bottom: 20px; right: 20px; width: 40px; height: 40px; border-bottom: 3px solid #92400e; border-right: 3px solid #92400e;"></div>

          <!-- Content -->
          <div style="text-align: center; height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
            <!-- Logo area -->
            <div style="font-size: 48px; margin-bottom: 20px;">🏆</div>

            <!-- Main content -->
            <div>
              <h1 style="font-size: 48px; margin: 20px 0; color: #78350f;">Certificate of Completion</h1>
              
              <p style="font-size: 20px; margin: 20px 0; color: #92400e;">This is to certify that</p>
              
              <h2 style="font-size: 44px; font-weight: bold; margin: 30px 0; color: #78350f; border-bottom: 3px solid #92400e; padding-bottom: 20px;">${userName}</h2>
              
              <p style="font-size: 20px; margin: 20px 0; color: #92400e;">has successfully completed the course</p>
              
              <h3 style="font-size: 32px; font-style: italic; margin: 20px 0; color: #78350f;">${course.title}</h3>
              
              <div style="margin-top: 40px; color: #92400e; font-size: 14px;">
                <p>Date: ${new Date().toLocaleDateString()}</p>
                <p style="margin-top: 10px; font-size: 12px;">Certificate ID: ${course._id}-${Date.now()}</p>
              </div>
              
              <p style="font-size: 16px; font-style: italic; margin-top: 30px; color: #92400e;">Issued by Sabka Academy</p>
            </div>

            <!-- Footer -->
            <div style="color: #92400e; font-size: 12px;">
              <p>This certificate verifies the achievement and completion of the course requirements.</p>
            </div>
          </div>
        </div>
      `;

      // Create temporary container
      const container = document.createElement("div");
      container.innerHTML = certificateHTML;
      container.style.position = "fixed";
      container.style.left = "-9999px";
      document.body.appendChild(container);

      // Capture as image
      const canvas = await html2canvas(container, {
        backgroundColor: "#FFFACD",
        scale: 2,
      });

      if (format === "pdf") {
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "mm",
          format: "a4",
        });

        const imgData = canvas.toDataURL("image/png");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${userName}_Certificate_${course.title}.pdf`);
      } else {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `${userName}_Certificate_${course.title}.png`;
        link.click();
      }

      // Cleanup
      document.body.removeChild(container);
    } catch (error) {
      console.error("Error downloading certificate:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#3d1642] via-[#2a1138] to-[#4a1f52] relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#692c7a]/40 to-[#9463a8]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-[#9463a8]/30 to-[#692c7a]/15 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
            <Award className="w-16 h-16 text-[#9463a8]" />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#3d1642] via-[#2a1138] to-[#4a1f52] relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#692c7a]/40 to-[#9463a8]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-[#9463a8]/30 to-[#692c7a]/15 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <h1 className="text-4xl font-bold text-white mb-2">Your Certificates</h1>
          <p className="text-gray-300">Download and share your achievements</p>
        </motion.div>

        {/* Certificates Grid */}
        <AnimatePresence>
          {certificates.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {certificates.map((course, idx) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent backdrop-blur-xl rounded-2xl border border-white/8 p-6 shadow-2xl overflow-hidden group hover:border-[#9463a8]/40 transition-all"
                >
                  {/* Certificate Preview */}
                  <div className="mb-4 p-4 bg-gradient-to-b from-amber-50 to-amber-100 rounded-lg border-2 border-amber-800">
                    <div className="text-center">
                      <Award className="w-12 h-12 text-amber-700 mx-auto mb-2" />
                      <p className="text-sm font-bold text-amber-900">{course.title}</p>
                    </div>
                  </div>

                  {/* Course Info */}
                  <h3 className="text-lg font-bold text-white mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Completed on {new Date(course.completedAt || Date.now()).toLocaleDateString()}
                  </p>

                  {/* Download Buttons */}
                  <div className="space-y-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => downloadCertificate(course, "pdf")}
                      disabled={isDownloading}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#692c7a] to-[#9463a8] hover:from-[#5a1f68] hover:to-[#8a5299] disabled:opacity-50 text-white rounded-lg font-semibold transition-all"
                    >
                      <Download className="w-4 h-4" />
                      PDF
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => downloadCertificate(course, "png")}
                      disabled={isDownloading}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 text-white rounded-lg font-semibold transition-all"
                    >
                      <Download className="w-4 h-4" />
                      Image
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">No Certificates Yet</h2>
              <p className="text-gray-300 mb-6">
                Complete courses to earn and download your certificates
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/skill-academy/courses")}
                className="px-6 py-3 bg-gradient-to-r from-[#692c7a] to-[#9463a8] text-white rounded-lg font-semibold transition-all"
              >
                Browse Courses
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
