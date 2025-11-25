"use client";

import { useEffect, useState } from "react";
import { X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PWAInstallPrompt() {
  const [isVisible, setIsVisible] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if PWA is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);

      // Show prompt after 3 seconds if user hasn't dismissed it
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);

      return () => clearTimeout(timer);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsVisible(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        setIsInstalled(true);
      }

      setDeferredPrompt(null);
      setIsVisible(false);
    } catch (error) {
      console.error("Error during PWA installation:", error);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (isInstalled || !isInstallable || !isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 right-4 z-50 max-w-sm"
        >
          <div className="bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-transparent backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-4 md:p-6 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#7e4ba3]/10 to-[#a87bcc]/5 pointer-events-none" />

            {/* Content */}
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={handleDismiss}
                className="absolute top-0 right-0 p-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="mb-4 pr-8">
                <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                  Install Sabka Skill Academy
                </h3>
                <p className="text-sm text-gray-300">
                  Get instant access to courses, offline mode, and a native app
                  experience.
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-6 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c99ee6]" />
                  Access courses offline
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c99ee6]" />
                  One-tap app access
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c99ee6]" />
                  Full-screen experience
                </li>
              </ul>

              {/* Buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleInstall}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#7e4ba3] to-[#a87bcc] hover:from-[#692c7a] hover:to-[#9463a8] text-white rounded-lg font-semibold text-sm transition-all shadow-lg shadow-[#7e4ba3]/30 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Install App
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDismiss}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg font-semibold text-sm transition-all"
                >
                  Later
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
