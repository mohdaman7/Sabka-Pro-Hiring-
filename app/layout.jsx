import { Toaster } from "sonner";
import "./globals.css";
import ReduxProvider from "./providers/ReduxProvider";
import ConfettiProvider from "@/components/providers/ConfettiProvider";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import OfflineIndicator from "@/components/OfflineIndicator";
import PWAProvider from "@/components/providers/PWAProvider";

export const metadata = {
  title: "Sabka Pro HIRIN - Job Consultancy & Training Platform",
  description:
    "Connect verified candidates with verified employers. Professional job consultancy and training platform.",
  generator: "v0.app",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Sabka Pro HIRIN",
  },
  formatDetection: {
    telephone: false,
  },
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
      sizes: "any",
    },
    {
      rel: "apple-touch-icon",
      url: "/icon512_rounded.png",
      sizes: "512x512",
      type: "image/png",
    },
  ],
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#ffffff",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#1a0f2e",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="antialiased overflow-x-hidden">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5, user-scalable=yes"
        />
        <meta name="theme-color" content="#1a0f2e" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Sabka" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans overflow-x-hidden">
        <OfflineIndicator />
        <PWAProvider>
          <ConfettiProvider />
          <ReduxProvider>
            {children}
            <PWAInstallPrompt />
          </ReduxProvider>
        </PWAProvider>
        <Toaster
          position="top-right"
          theme="dark"
          className="toaster group"
          toastOptions={{
            classNames: {
              toast:
                "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
              description: "group-[.toast]:text-muted-foreground",
              actionButton:
                "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
              cancelButton:
                "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
            },
          }}
        />
      </body>
    </html>
  );
}
