import { useEffect, useRef } from 'react'

const useTilt = (options = {}) => {
  const elementRef = useRef(null)

  useEffect(() => {
    // Check if mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )

    // Default configuration
    const defaultOptions = {
      max: 15,
      scale: 1.02,
      speed: 300,
      gyroscope: isMobile, // Enable gyroscope on mobile
      ...options
    }

    const initializeTilt = async () => {
      try {
        // Dynamic import to handle potential loading issues
        const vanillaTiltModule = await import('vanilla-tilt')
        const VanillaTilt = vanillaTiltModule.default || vanillaTiltModule
        
        if (elementRef.current && VanillaTilt && typeof VanillaTilt.init === 'function') {
          VanillaTilt.init(elementRef.current, defaultOptions)
        }
      } catch (error) {
        console.warn('vanilla-tilt failed to load:', error)
        // Fallback: function continues without tilt effect
      }
    }

    // Only initialize if element exists
    if (elementRef.current) {
      initializeTilt()
    }

    // Cleanup function
    return () => {
      if (elementRef.current && elementRef.current.vanillaTilt) {
        try {
          elementRef.current.vanillaTilt.destroy()
        } catch (error) {
          console.warn('Error destroying tilt:', error)
        }
      }
    }
  }, [])

  return elementRef
}

export default useTilt 