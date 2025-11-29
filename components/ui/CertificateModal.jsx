"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Share2, Award } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function CertificateModal({
  isOpen,
  onClose,
  courseTitle,
  userName,
  completionDate,
  courseId,
}) {
  const certificateRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadCertificate = async (format = "pdf") => {
    if (!certificateRef.current) return;

    try {
      setIsDownloading(true);

      // Capture the certificate as image
      const canvas = await html2canvas(certificateRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
      });

      if (format === "pdf") {
        // Convert to PDF
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "mm",
          format: "a4",
        });

        const imgData = canvas.toDataURL("image/png");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${userName}_Certificate_${courseTitle}.pdf`);
      } else {
        // Download as image
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `${userName}_Certificate_${courseTitle}.png`;
        link.click();
      }
    } catch (error) {
      console.error("Error downloading certificate:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="w-full max-w-5xl max-h-[90vh] overflow-auto rounded-2xl shadow-2xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#692c7a] to-[#9463a8] px-6 py-6 flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-yellow-300" />
                <h2 className="text-2xl font-bold text-white">
                  Congratulations! 🎉
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-all"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Certificate Container */}
            <div className="bg-white p-8">
              <div
                ref={certificateRef}
                className="bg-gradient-to-b from-amber-50 to-amber-100 p-12 rounded-lg border-8 border-amber-800 relative overflow-hidden"
              >
                {/* Decorative corners */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-800" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-800" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-amber-800" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-800" />

                {/* Logo area */}
                <div className="text-center mb-6">
                  <div className="inline-block mb-4">
                    <Award className="w-16 h-16 text-amber-700" />
                  </div>
                </div>

                {/* Main content */}
                <div className="text-center space-y-6">
                  <h1 className="text-4xl font-bold text-amber-900">
                    Certificate of Completion
                  </h1>

                  <p className="text-lg text-amber-800">
                    This is to certify that
                  </p>

                  <p className="text-4xl font-bold text-amber-900 border-b-2 border-amber-800 pb-3">
                    {userName}
                  </p>

                  <p className="text-lg text-amber-800">
                    has successfully completed the course
                  </p>

                  <p className="text-3xl font-bold text-amber-900 italic">
                    {courseTitle}
                  </p>

                  <div className="pt-6 space-y-2">
                    <p className="text-sm text-amber-800">
                      Date: {new Date(completionDate).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-amber-700">
                      Certificate ID: {courseId}-{Date.now()}
                    </p>
                  </div>

                  <p className="text-sm text-amber-800 italic pt-4">
                    Issued by Sabka Academy
                  </p>
                </div>
              </div>

              {/* Message */}
              <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-l-4 border-green-500">
                <p className="text-green-900 font-semibold mb-2">
                  You've earned your certificate!
                </p>
                <p className="text-green-800 text-sm">
                  Download your certificate and share your achievement with
                  others.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-gray-900 px-6 py-4 flex flex-col sm:flex-row gap-3 justify-end sticky bottom-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => downloadCertificate("png")}
                disabled={isDownloading}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg font-semibold transition-all"
              >
                <Download className="w-5 h-5" />
                {isDownloading ? "Downloading..." : "Download as Image"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => downloadCertificate("pdf")}
                disabled={isDownloading}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#692c7a] to-[#9463a8] hover:from-[#5a1f68] hover:to-[#8a5299] disabled:opacity-50 text-white rounded-lg font-semibold transition-all"
              >
                <Download className="w-5 h-5" />
                {isDownloading ? "Downloading..." : "Download as PDF"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-all"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
