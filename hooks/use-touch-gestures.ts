"use client"

import { useState, useEffect, useRef } from 'react'

export interface TouchPosition {
  startX: number
  startY: number
  currentX: number
  currentY: number
  deltaX: number
  deltaY: number
}

interface UseSwipeOptions {
  threshold?: number
  onSwipeLeft?: (delta: number) => void
  onSwipeRight?: (delta: number) => void
  onSwipeUp?: (delta: number) => void
  onSwipeDown?: (delta: number) => void
}

export const useSwipe = (
  ref: React.RefObject<HTMLElement>,
  {
    threshold = 50,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
  }: UseSwipeOptions = {}
) => {
  const [touchPosition, setTouchPosition] = useState<TouchPosition | null>(null)
  const [isActive, setIsActive] = useState(false)
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      setTouchPosition({
        startX: touch.clientX,
        startY: touch.clientY,
        currentX: touch.clientX,
        currentY: touch.clientY,
        deltaX: 0,
        deltaY: 0,
      })
      setIsActive(true)
      startTimeRef.current = Date.now()
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchPosition) return

      const touch = e.touches[0]
      const deltaX = touch.clientX - touchPosition.startX
      const deltaY = touch.clientY - touchPosition.startY
      
      setTouchPosition({
        ...touchPosition,
        currentX: touch.clientX,
        currentY: touch.clientY,
        deltaX,
        deltaY,
      })
    }

    const handleTouchEnd = () => {
      if (!touchPosition) return
      
      const swipeDuration = Date.now() - startTimeRef.current
      const isSwipe = swipeDuration < 250 // Fast swipe under 250ms
      
      // Only trigger if threshold is met or it's a fast swipe with some movement
      if (Math.abs(touchPosition.deltaX) > threshold || 
          (isSwipe && Math.abs(touchPosition.deltaX) > 20)) {
        
        if (touchPosition.deltaX > 0) {
          onSwipeRight?.(touchPosition.deltaX)
        } else {
          onSwipeLeft?.(Math.abs(touchPosition.deltaX))
        }
      }
      
      if (Math.abs(touchPosition.deltaY) > threshold || 
          (isSwipe && Math.abs(touchPosition.deltaY) > 20)) {
        
        if (touchPosition.deltaY > 0) {
          onSwipeDown?.(touchPosition.deltaY)
        } else {
          onSwipeUp?.(Math.abs(touchPosition.deltaY))
        }
      }
      
      setTouchPosition(null)
      setIsActive(false)
    }

    element.addEventListener('touchstart', handleTouchStart)
    element.addEventListener('touchmove', handleTouchMove)
    element.addEventListener('touchend', handleTouchEnd)

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [ref, touchPosition, threshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown])

  return { 
    touchPosition, 
    isActive 
  }
}

export interface UsePinchOptions {
  onPinchStart?: () => void
  onPinch?: (scale: number) => void
  onPinchEnd?: (scale: number) => void
}

export const usePinch = (
  ref: React.RefObject<HTMLElement>,
  { 
    onPinchStart, 
    onPinch, 
    onPinchEnd 
  }: UsePinchOptions = {}
) => {
  const [scale, setScale] = useState(1)
  const startDistanceRef = useRef<number>(0)
  const currentScaleRef = useRef<number>(1)
  
  useEffect(() => {
    const element = ref.current
    if (!element) return
    
    const getDistance = (touches: TouchList): number => {
      const dx = touches[0].clientX - touches[1].clientX
      const dy = touches[0].clientY - touches[1].clientY
      return Math.sqrt(dx * dx + dy * dy)
    }
    
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 2) return
      
      startDistanceRef.current = getDistance(e.touches)
      currentScaleRef.current = scale
      onPinchStart?.()
    }
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 2 || startDistanceRef.current === 0) return
      
      const currentDistance = getDistance(e.touches)
      const newScale = (currentDistance / startDistanceRef.current) * currentScaleRef.current
      
      setScale(newScale)
      onPinch?.(newScale)
    }
    
    const handleTouchEnd = () => {
      if (startDistanceRef.current === 0) return
      
      onPinchEnd?.(scale)
      startDistanceRef.current = 0
    }
    
    element.addEventListener('touchstart', handleTouchStart)
    element.addEventListener('touchmove', handleTouchMove)
    element.addEventListener('touchend', handleTouchEnd)
    
    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [ref, scale, onPinchStart, onPinch, onPinchEnd])
  
  return { scale }
}
