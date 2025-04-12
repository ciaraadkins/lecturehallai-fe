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
  
  // Set viewport properties - allow user scaling for accessibility
  viewportMeta.setAttribute(
    'content', 
    'width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover'
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
    
    /* Explicit body overflow handling */
    body {
      overflow-x: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-y: none;
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
  
  let startY = 0;
  
  // Handle touch start to capture initial position
  const handleTouchStart = (e: TouchEvent) => {
    startY = e.touches[0].clientY;
  };
  
  // Prevent overscroll/bounce only when needed
  const handleTouchMove = (e: TouchEvent) => {
    // Get current touch position
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - startY;
    
    // Allow scrolling of elements that should scroll
    const element = e.target as HTMLElement;
    const scrollableElement = findScrollableParent(element);
    
    // Only prevent the browser's pull-to-refresh behavior
    // when at the top of the page and pulling down
    if (scrollableElement) {
      const isAtTop = scrollableElement.scrollTop <= 0;
      const isAtBottom = 
        scrollableElement.scrollHeight - scrollableElement.scrollTop <= scrollableElement.clientHeight + 5; // Add small buffer
      
      // Only prevent pull-to-refresh (pulling down at the top)
      if (isAtTop && deltaY > 0) {
        e.preventDefault();
      }
      // Only prevent overscroll at bottom (pulling up at the bottom)
      else if (isAtBottom && deltaY < 0 && scrollableElement !== document.body) {
        // For some cases, still allow body to scroll
        e.preventDefault();
      }
      // Otherwise, allow normal scrolling
    }
    // Even without a scrollable parent, don't always prevent default
    // Only prevent if it's a deliberate pull-to-refresh on the body
    else if (deltaY > 30 && element.tagName !== 'INPUT' && element.tagName !== 'TEXTAREA') {
      e.preventDefault();
    }
  };
  
  // Add event listeners
  document.addEventListener('touchstart', handleTouchStart, { passive: true });
  document.addEventListener('touchmove', handleTouchMove, { passive: false });
  
  // Return cleanup function
  return () => {
    document.removeEventListener('touchstart', handleTouchStart);
    document.removeEventListener('touchmove', handleTouchMove);
  };
}

/**
 * Helper function to find the nearest scrollable parent element
 * Improved to better detect scrollable containers
 */
function findScrollableParent(element: HTMLElement | null): HTMLElement | null {
  if (!element) return document.body;
  if (element === document.body) return document.body;
  
  // Get computed style
  const style = window.getComputedStyle(element);
  
  // Check both overflow and overflowY properties
  const { overflow, overflowY, overflowX } = style;
  
  // Element is scrollable if:
  // 1. It has overflow: auto/scroll OR overflowY: auto/scroll
  // 2. AND it has content that exceeds its height
  const hasVerticalScroll = 
    (overflow === 'auto' || overflow === 'scroll' || 
     overflowY === 'auto' || overflowY === 'scroll');
  
  const hasHorizontalScroll = 
    (overflow === 'auto' || overflow === 'scroll' || 
     overflowX === 'auto' || overflowX === 'scroll');
  
  // Check if the element actually has content that can scroll
  const canScrollVertically = element.scrollHeight > element.clientHeight;
  const canScrollHorizontally = element.scrollWidth > element.clientWidth;
  
  // Return the element if it can actually scroll in either direction
  if ((hasVerticalScroll && canScrollVertically) || 
      (hasHorizontalScroll && canScrollHorizontally)) {
    return element;
  }
  
  // If this element isn't scrollable, check its parent
  return findScrollableParent(element.parentElement);
}