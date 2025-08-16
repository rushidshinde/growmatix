import React from 'react'
import { Metadata } from 'next'
import './styles.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Montserrat, Space_Grotesk } from 'next/font/google'

export const metadata: Metadata = {
  title: 'Growmatix',
  description: 'A blank template using Payload in a Next.js app.',
}

const montserrat = Montserrat({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  preload: true,
  subsets: ['latin'],
  variable: '--font-montserrat'
})
const spaceGrotesk = Space_Grotesk({
  weight: ['300', '400', '500', '600', '700'],
  style: 'normal',
  display: 'swap',
  preload: true,
  subsets: ['latin'],
  variable: '--font-space-grotesk'
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en-US" suppressHydrationWarning className={`${montserrat.variable} ${spaceGrotesk.variable} antialiased`}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
