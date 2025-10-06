import "./globals.css"
import ReduxProvider from './providers/ReduxProvider'

export const metadata = {
  title: "Sabka Pro HIRIN - Job Consultancy & Training Platform",
  description:
    "Connect verified candidates with verified employers. Professional job consultancy and training platform.",
    generator: 'v0.app'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">
         <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
