"use client";

import { useEffect } from "react";

/**
 * PWAProvider registers the service worker on app load
 * This component should be placed at the root level of your app
 */
export default function PWAProvider({ children }) {
  useEffect(() => {
    // Register service worker in production
    if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV === "production"
    ) {
      const registerServiceWorker = async () => {
        try {
          // First, try using Workbox (injected by next-pwa)
          if (window.workbox) {
            window.workbox.register();
            console.log("✓ Service Worker registered via Workbox");
          } else if ("serviceWorker" in navigator) {
            // Fallback: Manual registration
            const registration = await navigator.serviceWorker.register(
              "/sw.js",
              {
                scope: "/",
              }
            );
            console.log("✓ Service Worker registered manually:", registration);
          }
        } catch (error) {
          console.error("✗ Service Worker registration failed:", error);
        }
      };

      // Register after a slight delay to ensure page is fully loaded
      const timer = setTimeout(registerServiceWorker, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  return <>{children}</>;
}
