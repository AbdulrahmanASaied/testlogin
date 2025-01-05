import './globals.css'
// Import el global CSS styles 3shan y-kon fe consistency fi el design el 3am lel application.

import { Inter } from 'next/font/google'
// Import el Inter font mn Google Fonts, da font modern w clear yedem readability kwayesa.

const inter = Inter({ subsets: ['latin'] })
// Initialize el Inter font, subset Latin 3shan n-support alphanumeric text style.

export const metadata = {
  title: 'Login Dashboard',
  // El title elly hyban fi el browser tab.
  description: 'A simple login and dashboard application',
  // Description metadata 3shan el SEO w ta7sen el appearance fi search engines.
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
// Define el root layout component, da el base structure lel pages kolaha fi el app.

  return (
    <html lang="en">
    {/* El language attribute b-y3rf el browser en el content b-English. */}
      <body className={`${inter.className} bg-spotify-black min-h-screen`}>
      {/* Body tag fiha: 
          - El Inter font b-style el Inter className.
          - Background color black (Spotify black theme).
          - `min-h-screen` b-t5ali el height at least the screen size. */}
        {children}
        {/* children: da el content elly hyban fi el specific page */}
      </body>
    </html>
  )
}
