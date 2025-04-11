"use client"

import { BookOpen } from "lucide-react"
import { useEffect, useState } from "react"

interface AILogoProps {
  size?: "sm" | "md" | "lg"
}

export function AILogo({ size = "md" }: AILogoProps) {
  const [glowing, setGlowing] = useState(false)
  
  useEffect(() => {
    // Create a subtle glow effect animation
    const interval = setInterval(() => {
      setGlowing(prev => !prev);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const sizeMap = {
    sm: {
      container: "w-8 h-8",
      icon: "h-4 w-4"
    },
    md: {
      container: "w-10 h-10",
      icon: "h-5 w-5"
    },
    lg: {
      container: "w-12 h-12",
      icon: "h-6 w-6"
    }
  }
  
  const { container, icon } = sizeMap[size]
  
  return (
    <div 
      className={`${container} rounded-md gradient-bg flex items-center justify-center relative overflow-hidden`}
    >
      <div 
        className={`absolute inset-0 bg-white/10 transition-opacity duration-1500 ${glowing ? 'opacity-40' : 'opacity-0'}`} 
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)'
        }}
      />
      <BookOpen className={`${icon} text-white relative z-10`} />
    </div>
  )
}