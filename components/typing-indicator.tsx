"use client"

import { useEffect, useState } from "react"

export function TypingIndicator() {
  const [dots, setDots] = useState(".")
  
  useEffect(() => {
    const timer = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length >= 3) {
          return "."
        }
        return prevDots + "."
      })
    }, 400)
    
    return () => clearInterval(timer)
  }, [])
  
  return (
    <div className="flex items-center space-x-2">
      <div className="flex space-x-1">
        <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
      </div>
      <span className="text-xs text-muted-foreground">Generating{dots}</span>
    </div>
  )
}
