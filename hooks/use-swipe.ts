"use client"

import { useState, useEffect, TouchEvent } from 'react'

interface SwipeHandlers {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
}

interface SwipeOptions {
  threshold?: number
  preventDefault?: boolean
}

export function useSwipe(handlers: SwipeHandlers, options: SwipeOptions = {}) {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null)
  
  // Set defaults
  const threshold = options.threshold || 50
  const preventDefault = options.preventDefault !== undefined ? options.preventDefault : true

  // Min distance in pixels to be considered a swipe
  const minSwipeDistance = threshold

  const onTouchStart = (e: TouchEvent) => {
    if (preventDefault) e.preventDefault()
    setTouchEnd(null) // Reset touchEnd
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    })
  }

  const onTouchMove = (e: TouchEvent) => {
    if (preventDefault) e.preventDefault()
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    })
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distanceX = touchStart.x - touchEnd.x
    const distanceY = touchStart.y - touchEnd.y
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY)
    
    if (isHorizontalSwipe) {
      // Horizontal swipe
      if (Math.abs(distanceX) >= minSwipeDistance) {
        if (distanceX > 0) {
          // Left swipe
          handlers.onSwipeLeft?.()
        } else {
          // Right swipe
          handlers.onSwipeRight?.()
        }
      }
    } else {
      // Vertical swipe
      if (Math.abs(distanceY) >= minSwipeDistance) {
        if (distanceY > 0) {
          // Up swipe
          handlers.onSwipeUp?.()
        } else {
          // Down swipe
          handlers.onSwipeDown?.()
        }
      }
    }
    
    // Reset
    setTouchStart(null)
    setTouchEnd(null)
  }

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  }
}
