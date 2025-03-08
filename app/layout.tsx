import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider' // Import the ThemeProvider
import CustomCursor from '@/components/CustomCursor' // Import the CustomCursor
import './globals.css'

export const metadata: Metadata = {
  title: '512 D',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Add the CustomCursor component */}
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}