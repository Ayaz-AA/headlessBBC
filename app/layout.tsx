import type { Metadata } from 'next'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/main.css'

import BootstrapClient from '@/components/global/BootstrapClient'

export const metadata: Metadata = {
  title: 'Headless BBC | Home',
  description: 'Start Your Career and Maximize Your Earnings Potential With Bootcamps & Certifications',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Arimo:wght@400;700&family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>
        <BootstrapClient />
        {children}
      </body>
    </html>
  )
}

