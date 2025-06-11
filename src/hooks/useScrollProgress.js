import { useState, useEffect, useCallback } from 'react'

const SECTIONS = ['hero', 'problem', 'solution', 'features', 'pricing', 'faq']

function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentSection, setCurrentSection] = useState('hero')
  
  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    
    if (scrollHeight <= 0) return
    
    const progress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1)
    setScrollProgress(progress)
    
    // Better section detection based on actual scroll position
    const sectionHeight = window.innerHeight // Each section is 100vh
    const currentSectionIndex = Math.floor(scrollTop / sectionHeight)
    const clampedIndex = Math.min(Math.max(currentSectionIndex, 0), SECTIONS.length - 1)
    const newSection = SECTIONS[clampedIndex]
    
    if (newSection !== currentSection) {
      setCurrentSection(newSection)
    }
  }, [currentSection])
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])
  
  return { scrollProgress, currentSection }
}

export default useScrollProgress