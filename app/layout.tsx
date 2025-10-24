import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from '@/components/auth-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dr. Cristiano De Angelis - Academic Researcher',
  description: 'Freelance researcher at Skema Business School, France. Expert in Knowledge Management, Organizational Intelligence, and Public Administration.',
  keywords: ['Cristiano De Angelis', 'Knowledge Management', 'Organizational Intelligence', 'Public Administration', 'Research', 'Academic'],
  authors: [{ name: 'Cristiano De Angelis' }],
  openGraph: {
    type: 'website',
    url: 'https://cristianodeangelis.com',
    title: 'Cristiano De Angelis - Academic Researcher',
    description: 'Freelance researcher at Skema Business School, France. Expert in Knowledge Management and Organizational Intelligence.',
    images: [
      {
        url: '/images/20190708_dr_cristiano.jpg',
        width: 1200,
        height: 630,
        alt: 'Dr. Cristiano De Angelis'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cristiano De Angelis - Academic Researcher',
    description: 'Freelance researcher at Skema Business School, France. Expert in Knowledge Management and Organizational Intelligence.',
    images: ['/images/20190708_dr_cristiano.jpg']
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}