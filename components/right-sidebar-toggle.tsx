"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface RightSidebarToggleProps {
  isOpen: boolean
  onChange: (isOpen: boolean) => void
  className?: string
}

export function RightSidebarToggle({ 
  isOpen, 
  onChange,
  className
}: RightSidebarToggleProps) {
  const [mounted, setMounted] = useState(false)
  
  // Fix hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return null
  
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => onChange(!isOpen)}
      className={cn(
        "h-8 w-8 flex items-center justify-center rounded-l-md border border-r-0 border-gray-200",
        "hover:bg-gray-100 bg-white text-gray-500",
        className
      )}
      aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
    >
      {isOpen ? (
        <ChevronRight className="h-4 w-4" />
      ) : (
        <ChevronLeft className="h-4 w-4" />
      )}
    </Button>
  )
}
