"use client";

import { useEffect } from "react";

/**
 * ConfettiProvider - Loads canvas-confetti library globally
 * This component must be placed in a client component to load the library
 */
export default function ConfettiProvider() {
  useEffect(() => {
    // Dynamically import canvas-confetti
    import("canvas-confetti").then((confetti) => {
      // Make it available globally
      window.confetti = confetti.default;
    }).catch((error) => {
      console.warn("Failed to load canvas-confetti:", error);
    });
  }, []);

  return null; // This provider doesn't render anything
}
