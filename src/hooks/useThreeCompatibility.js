import { useState, useEffect } from 'react'

function useThreeCompatibility() {
  const [isCompatible, setIsCompatible] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  
  useEffect(() => {
    const checkCompatibility = () => {
      try {
        // Check WebGL support
        const canvas = document.createElement('canvas')
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
        
        if (!gl) {
          setIsCompatible(false)
          setIsChecking(false)
          return
        }
        
        // Check device memory (if available)
        const deviceMemory = navigator.deviceMemory
        if (deviceMemory && deviceMemory < 2) {
          setIsCompatible(false)
          setIsChecking(false)
          return
        }
        
        // Check if mobile with low performance
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        const isLowEndMobile = isMobile && window.innerWidth < 768 && (!deviceMemory || deviceMemory < 4)
        
        setIsCompatible(!isLowEndMobile)
      } catch (error) {
        setIsCompatible(false)
      } finally {
        setIsChecking(false)
      }
    }
    
    checkCompatibility()
  }, [])
  
  return { isCompatible, isChecking }
}

export default useThreeCompatibility