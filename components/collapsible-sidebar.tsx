"use client"

import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Menu } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"

export function CollapsibleSidebar({ className }: { className?: string }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [sidebarWidth, setSidebarWidth] = useState(256) // Default width: 256px (64 when collapsed)
  const [isResizing, setIsResizing] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const resizingRef = useRef(false)
  const startXRef = useRef(0)
  const startWidthRef = useRef(0)
  const pathname = usePathname()
  
  // Touch handling for mobile swipe gestures
  const touchStartX = useRef(0)
  const touchMoveX = useRef(0)
  
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  
  const handleTouchMove = (e: React.TouchEvent) => {
    touchMoveX.current = e.touches[0].clientX
  }
  
  const handleTouchEnd = () => {
    if (isMobile && isMobileOpen) {
      const swipeDistance = touchStartX.current - touchMoveX.current
      if (swipeDistance > 50) { // 50px threshold to detect swipe
        setIsMobileOpen(false)
      }
    }
  }

  // Min and max sidebar widths
  const MIN_SIDEBAR_WIDTH = 200
  const MAX_SIDEBAR_WIDTH = 400
  const COLLAPSED_WIDTH = 64

  // Check if mobile on mount and listen for resize
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

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  // Toggle sidebar
  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileOpen(!isMobileOpen)
    } else {
      setIsCollapsed(!isCollapsed)
    }
  }

  // Handle resize start
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault()
    resizingRef.current = true
    setIsResizing(true)
    startXRef.current = e.clientX
    startWidthRef.current = sidebarWidth
    document.body.style.cursor = 'ew-resize'
    
    // Add event listeners for resize
    document.addEventListener('mousemove', handleResize)
    document.addEventListener('mouseup', handleResizeEnd)
  }

  // Handle resize during drag
  const handleResize = (e: MouseEvent) => {
    if (!resizingRef.current) return
    
    const delta = e.clientX - startXRef.current
    let newWidth = startWidthRef.current + delta
    
    // Apply constraints
    newWidth = Math.max(MIN_SIDEBAR_WIDTH, Math.min(MAX_SIDEBAR_WIDTH, newWidth))
    
    setSidebarWidth(newWidth)
  }

  // Handle resize end
  const handleResizeEnd = () => {
    resizingRef.current = false
    setIsResizing(false)
    document.body.style.cursor = ''
    
    // Remove event listeners
    document.removeEventListener('mousemove', handleResize)
    document.removeEventListener('mouseup', handleResizeEnd)
  }

  // The actual width to use (collapsed or user-set)
  const actualWidth = isCollapsed && !isMobile ? COLLAPSED_WIDTH : sidebarWidth

  return (
    <>
      {/* Mobile toggle button - fixed position */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-3 left-3 z-50 md:hidden mobile-touch-target"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={cn(
          "fixed inset-y-0 left-0 z-40 transition-all duration-300 bg-background border-r",
          isMobile && (isMobileOpen ? "translate-x-0" : "-translate-x-full"),
          className
        )}
        style={{ width: `${actualWidth}px` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex flex-col h-full relative">
          {/* Sidebar content */}
          <div className={cn(
            "flex-1 overflow-hidden transition-all duration-300",
            isCollapsed && !isMobile ? "opacity-0 invisible" : "opacity-100 visible"
          )}>
            <AppSidebar />
          </div>

          {/* Collapse button (desktop only) */}
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 -right-4 rounded-full border bg-background shadow-md z-50 h-8 w-8"
              onClick={toggleSidebar}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          )}

          {/* Resize handle (only visible when not collapsed and not on mobile) */}
          {!isCollapsed && !isMobile && (
            <div
              className={cn(
                "sidebar-resize-handle",
                isResizing && "resizing"
              )}
              onMouseDown={handleResizeStart}
            />
          )}
        </div>
      </div>

      {/* Overlay for mobile with swipe gesture support */}
      {isMobile && isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-30 md:hidden animate-fadeIn"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Main content wrapper that adjusts based on sidebar width */}
      <div 
        className="transition-all duration-300" 
        style={{ 
          marginLeft: isMobile ? 0 : `${actualWidth}px` 
        }}
      />
    </>
  )
}