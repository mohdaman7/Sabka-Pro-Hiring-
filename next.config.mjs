import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

const withPWAConfig = withPWA({
  dest: "public",
  register: false,
  skipWaiting: false,
  disable: process.env.NODE_ENV === "development",
  publicExcludes: ["!noprecache/**/*"],
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts",
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
        },
      },
    },
    {
      urlPattern: /^https:\/\/images\.unsplash\.com\/.*$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "course-images",
        expiration: {
          maxEntries: 60,
          maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
        },
      },
    },
    {
      urlPattern: /^\/api\/.*$/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "api-cache",
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 60 * 5, // 5 minutes
        },
      },
    },
  ],
});

export default withPWAConfig(nextConfig);
