"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CollapsibleSidebar } from "@/components/collapsible-sidebar"
import { AuthProvider } from "@/contexts/auth-context"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { setupMobileViewport, preventPullToRefresh } from "@/utils/mobile-utils"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/login"
  const isHomePage = pathname === "/"
  const isAboutPage = pathname === "/about"
  const [mounted, setMounted] = useState(false)

  // Handle hydration mismatch by mounting after initial render
  useEffect(() => {
    setMounted(true)

    // Setup mobile optimizations
    setupMobileViewport()
    const cleanup = preventPullToRefresh()

    return () => {
      cleanup()
    }
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            {isLoginPage || isHomePage || isAboutPage ? (
              <div className="flex-1">{children}</div>
            ) : (
              <div className="flex min-h-screen h-full overflow-hidden">
                {/* CollapsibleSidebar now provides its own spacing */}
                <CollapsibleSidebar />
                
                {/* Content area now automatically adjusts based on sidebar width */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden -webkit-overflow-scrolling-touch">{children}</div>
              </div>
            )}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}