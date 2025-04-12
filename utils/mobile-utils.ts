/**
 * Mobile utility functions for responsive design
 */

/**
 * Checks if the current device is a mobile device
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false
  
  return window.innerWidth < 768 || 
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      typeof navigator !== 'undefined' ? navigator.userAgent : ''
    )
}

/**
 * Adds viewport meta tags to prevent zooming on input focus
 * Call this function in a useEffect hook in your root layout
 */
export const setupMobileViewport = (): void => {
  if (typeof document === 'undefined') return
  
  // Check if meta viewport tag exists
  let viewportMeta = document.querySelector('meta[name="viewport"]')
  
  // If not, create a new one
  if (!viewportMeta) {
    viewportMeta = document.createElement('meta')
    viewportMeta.setAttribute('name', 'viewport')
    document.head.appendChild(viewportMeta)
  }
  
  // Set viewport properties
  viewportMeta.setAttribute(
    'content', 
    'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover'
  )
  
  // Add safe-area support for notched devices
  const style = document.createElement('style')
  style.textContent = `
    :root {
      --safe-area-inset-top: env(safe-area-inset-top);
      --safe-area-inset-right: env(safe-area-inset-right);
      --safe-area-inset-bottom: env(safe-area-inset-bottom);
      --safe-area-inset-left: env(safe-area-inset-left);
    }
    
    /* Apply safe area padding to fixed elements */
    .safe-area-bottom {
      padding-bottom: env(safe-area-inset-bottom, 0);
    }
    
    .safe-area-top {
      padding-top: env(safe-area-inset-top, 0);
    }
  `
  document.head.appendChild(style)
}

/**
 * Prevents pull-to-refresh on mobile
 * Call this function in a useEffect hook
 */
export const preventPullToRefresh = (): (() => void) => {
  if (typeof document === 'undefined') return () => {}
  
  // Prevent overscroll/bounce
  const handleTouchMove = (e: TouchEvent) => {
    // Allow scrolling of elements that should scroll
    const element = e.target as HTMLElement
    const scrollableElement = findScrollableParent(element)
    
    if (scrollableElement) {
      const isAtTop = scrollableElement.scrollTop <= 0
      const isAtBottom = 
        scrollableElement.scrollHeight - scrollableElement.scrollTop <= scrollableElement.clientHeight
      
      // Only prevent default if attempting to scroll beyond bounds
      if ((isAtTop && e.touches[0].clientY > 0) || 
          (isAtBottom && e.touches[0].clientY < 0)) {
        e.preventDefault()
      }
    } else {
      // No scrollable parent, prevent default
      e.preventDefault()
    }
  }
  
  // Add passive: false to ensure preventDefault works
  document.addEventListener('touchmove', handleTouchMove, { passive: false })
  
  // Return cleanup function
  return () => {
    document.removeEventListener('touchmove', handleTouchMove)
  }
}

/**
 * Helper function to find the nearest scrollable parent element
 */
function findScrollableParent(element: HTMLElement | null): HTMLElement | null {
  if (!element || element === document.body) return document.body
  
  const { overflowY } = window.getComputedStyle(element)
  const isScrollable = overflowY !== 'visible' && overflowY !== 'hidden'
  
  if (isScrollable && element.scrollHeight > element.clientHeight) {
    return element
  }
  
  return findScrollableParent(element.parentElement)
}
