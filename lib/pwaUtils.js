"use client";

import { useEffect, useState } from "react";

/**
 * Register and manage the service worker for PWA functionality
 * This handles offline support, caching, and background sync
 */
export function usePWAServiceWorker() {
  useEffect(() => {
    // Only register in production and in browsers that support service workers
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    if (process.env.NODE_ENV !== "production") {
      return;
    }

    const registerServiceWorker = async () => {
      try {
        // Check if workbox is available (set by next-pwa)
        if (typeof window !== "undefined" && window.workbox) {
          window.workbox.register();
          console.log("Service Worker registered via Workbox");
        } else {
          // Fallback manual registration
          const registration = await navigator.serviceWorker.register(
            "/sw.js",
            {
              scope: "/",
            }
          );
          console.log("Service Worker registered successfully:", registration);
        }
      } catch (error) {
        console.error("Service Worker registration failed:", error);
      }
    };

    // Register after a short delay to ensure DOM is ready
    const timer = setTimeout(registerServiceWorker, 1000);
    return () => clearTimeout(timer);
  }, []);
}

/**
 * Hook to detect if the app is running in standalone mode (installed)
 */
export function useIsStandalone() {
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const standalone = window.matchMedia("(display-mode: standalone)").matches;
    setIsStandalone(standalone);
  }, []);

  return isStandalone;
}

/**
 * Hook to request notification permission for course reminders
 */
export async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }

  return false;
}

/**
 * Send a notification for course updates or achievements
 */
export async function sendNotification(title, options = {}) {
  if ("serviceWorker" in navigator && "Notification" in window) {
    if (Notification.permission === "granted") {
      try {
        const registration = await navigator.serviceWorker.ready;
        registration.showNotification(title, {
          badge: "/icon512_rounded.png",
          icon: "/icon512_rounded.png",
          ...options,
        });
      } catch (error) {
        console.error("Error sending notification:", error);
      }
    }
  }
}

/**
 * Check if the browser is online
 */
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

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

  return isOnline;
}
