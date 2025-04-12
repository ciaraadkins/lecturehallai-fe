"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, BookOpen, MessageSquare, Library, User } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export function MobileNavBar() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const { userRole } = useAuth()
  
  // Fix hydration issues by mounting after initial render
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Only show on mobile screens
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Check initially
    checkIfMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])
  
  // Don't render anything during SSR or if not mobile
  if (!mounted || !isMobile) return null
  
  // Don't show on login, home, or about pages
  if (pathname === "/login" || pathname === "/" || pathname === "/about") return null
  
  // Determine links based on user role
  const basePath = userRole === "teacher" ? "/teacher" : "/student"
  
  const navItems = [
    {
      name: "Dashboard",
      href: `${basePath}/dashboard`,
      icon: Home,
      isActive: pathname === `${basePath}/dashboard`
    },
    {
      name: "Courses",
      href: `${basePath}/courses`,
      icon: BookOpen,
      isActive: pathname.startsWith(`${basePath}/courses`)
    },
    {
      name: "AI Assistant",
      href: `${basePath}/ai-assistant`,
      icon: MessageSquare,
      isActive: pathname.startsWith(`${basePath}/ai-assistant`)
    },
    {
      name: "Content",
      href: `${basePath}/content-hub`,
      icon: Library,
      isActive: pathname.startsWith(`${basePath}/content-hub`)
    },
    {
      name: "Profile",
      href: `${basePath}/profile`,
      icon: User,
      isActive: pathname.startsWith(`${basePath}/profile`)
    }
  ]

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border md:hidden safe-area-bottom animate-slideInUp"
    >
        <div className="flex justify-around items-center h-16 px-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full text-xs py-2 space-y-1 transition-colors rounded-lg",
                item.isActive 
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <item.icon size={24} className={cn(item.isActive ? "text-primary" : "text-muted-foreground")} />
              <span className="font-medium">{item.name}</span>
              {item.isActive && (
                <div 
                  className="absolute bottom-0 w-10 h-1 bg-primary rounded-t-lg" 
                />
              )}
            </Link>
          ))}
        </div>
      </div>
  )
}
