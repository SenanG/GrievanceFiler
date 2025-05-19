import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import MobileCheck from "@/components/mobile-check"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Relationship Feedback",
  description: "Share your thoughts and feelings with me",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <MobileCheck />
        </ThemeProvider>
      </body>
    </html>
  )
}
