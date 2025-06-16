import './globals.css'
import { Inter } from 'next/font/google'
import LayoutWrapper from '../components/LayoutWrapper'
import StructuredData from '../components/StructuredData'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'Abstract Algorithms',
    template: '%s | Abstract Algorithms',
  },
  description: 'A comprehensive blog about algorithms, data structures, system design, and software engineering best practices',
  metadataBase: new URL(process.env.NODE_ENV === 'production' 
    ? 'https://abstractalgorithms.github.io' 
    : 'http://localhost:3000'),
  keywords: [
    'algorithms',
    'data structures', 
    'system design',
    'software engineering',
    'programming',
    'computer science',
    'performance optimization',
    'big o notation',
    'hash tables',
    'database indexing'
  ],
  authors: [{ name: 'Abstract Algorithms' }],
  creator: 'Abstract Algorithms',
  publisher: 'Abstract Algorithms',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Abstract Algorithms',
    description: 'A comprehensive blog about algorithms, data structures, system design, and software engineering best practices',
    siteName: 'Abstract Algorithms',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abstract Algorithms',
    description: 'A comprehensive blog about algorithms, data structures, system design, and software engineering best practices',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
        {/* Google Site Verification */}
        <meta name="google-site-verification" content="D5v1M3nD8oO9DNaZKujCwBLNNqf35CTJo114uv8yMNU" />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-VZR168MHE2"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VZR168MHE2');
          `,
        }} />
      </head>
      <body className={inter.className}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  )
}