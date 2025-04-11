// Add a client directive to ensure auth provider works properly
"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { AuthProvider } from "@/contexts/auth-context"
import { usePathname } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/login"

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            {isLoginPage ? (
              <div className="flex-1">{children}</div>
            ) : (
              <div className="flex h-screen">
                <div className="w-64 border-r shrink-0">
                  <AppSidebar />
                </div>
                <div className="flex-1 overflow-auto">{children}</div>
              </div>
            )}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
