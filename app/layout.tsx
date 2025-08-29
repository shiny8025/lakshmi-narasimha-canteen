
import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { Open_Sans } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { ClerkProvider } from "@clerk/nextjs"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"], // Including Black weight for headings
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Lakshmi Narasimha Canteen",
  description: "Traditional canteen ordering system for customers, staff, and administrators",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${montserrat.variable} ${openSans.variable} antialiased`}>
        <body className="font-sans bg-background text-foreground min-h-screen">
          <Navigation />
          <div className="pt-2 px-2 sm:px-4">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  )
}
