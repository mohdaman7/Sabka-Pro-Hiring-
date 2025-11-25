"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, WifiOff } from "lucide-react";

/**
 * Displays offline status bar when user loses internet connection
 */
export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
        >
          <div className="flex items-center justify-center gap-3 px-4 py-3 md:py-4">
            <WifiOff className="w-5 h-5 animate-pulse" />
            <span className="font-semibold text-sm md:text-base">
              You are offline. Some features may be limited.
            </span>
            <Wifi className="w-5 h-5 hidden md:block" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
