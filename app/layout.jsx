import { Toaster } from "sonner";
import "./globals.css";
import ReduxProvider from "./providers/ReduxProvider";
import ConfettiProvider from "@/components/providers/ConfettiProvider";

export const metadata = {
  title: "Sabka Pro HIRIN - Job Consultancy & Training Platform",
  description:
    "Connect verified candidates with verified employers. Professional job consultancy and training platform.",
  generator: "v0.app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="antialiased overflow-x-hidden">
      <head>
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
      </head>
      <body className="font-sans overflow-x-hidden">
        <ConfettiProvider />
        <ReduxProvider>{children}</ReduxProvider>
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
