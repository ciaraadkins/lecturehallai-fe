import type React from "react"
import ClientLayout from "./clientLayout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "LectureHall.ai",
  description: "AI-enhanced learning platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ClientLayout>{children}</ClientLayout>
}


import './globals.css'