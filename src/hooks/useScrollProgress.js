import { useState, useEffect, useCallback } from 'react'
import { SECTIONS } from '../utils/constants'

function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentSection, setCurrentSection] = useState('hero')
  
  const handleScroll = useCallback(() => {
    const container = document.querySelector('.content-layer')
    if (!container) return
    
    const scrollTop = container.scrollTop
    const scrollHeight = container.scrollHeight - container.clientHeight
    
    if (scrollHeight <= 0) return
    
    const progress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1)
    setScrollProgress(progress)
    
    // Better section detection based on actual scroll position
    const sectionHeight = container.clientHeight // Each section is 100vh
    const currentSectionIndex = Math.floor(scrollTop / sectionHeight)
    const clampedIndex = Math.min(Math.max(currentSectionIndex, 0), SECTIONS.length - 1)
    const newSection = SECTIONS[clampedIndex]
    
    if (newSection !== currentSection) {
      setCurrentSection(newSection)
    }
  }, [currentSection])
  
  useEffect(() => {
    const container = document.querySelector('.content-layer')
    if (!container) return
    
    container.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation
    
    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])
  
  return { scrollProgress, currentSection }
}

export default useScrollProgress