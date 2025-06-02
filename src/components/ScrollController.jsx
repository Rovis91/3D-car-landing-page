import React, { useEffect, useRef, useCallback } from 'react'
import { useStore } from '../store/cameraStore'

function ScrollController() {
  const scrollRef = useRef(null)
  const isScrolling = useRef(false)
  const wheelTimeout = useRef(null)
  
  const { 
    sections, 
    setCurrentSection, 
    goToNextSection, 
    goToPrevSection,
    currentSection,
    isTransitioning 
  } = useStore()

  // Gestion du scroll par molette
  const handleWheel = useCallback((e) => {
    e.preventDefault()
    
    // Éviter les scrolls trop rapides
    if (isTransitioning || isScrolling.current) return
    
    isScrolling.current = true
    
    // Déterminer la direction
    const deltaY = e.deltaY
    
    if (deltaY > 0) {
      // Scroll vers le bas - section suivante
      goToNextSection()
    } else {
      // Scroll vers le haut - section précédente
      goToPrevSection()
    }
    
    // Débouncer les événements de scroll
    clearTimeout(wheelTimeout.current)
    wheelTimeout.current = setTimeout(() => {
      isScrolling.current = false
    }, 100)
    
  }, [goToNextSection, goToPrevSection, isTransitioning])

  // Gestion des touches clavier
  const handleKeyDown = useCallback((e) => {
    if (isTransitioning) return
    
    switch (e.key) {
      case 'ArrowDown':
      case 'PageDown':
      case ' ': // Espace
        e.preventDefault()
        goToNextSection()
        break
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault()
        goToPrevSection()
        break
      case 'Home':
        e.preventDefault()
        setCurrentSection('hero')
        break
      case 'End':
        e.preventDefault()
        setCurrentSection('contact')
        break
      // Navigation numérique
      case '1':
        setCurrentSection('hero')
        break
      case '2':
        setCurrentSection('tracking')
        break
      case '3':
        setCurrentSection('cta')
        break
      case '4':
        setCurrentSection('faq')
        break
      case '5':
        setCurrentSection('contact')
        break
    }
  }, [goToNextSection, goToPrevSection, setCurrentSection, isTransitioning])

  // Gestion du touch pour mobile
  const touchStart = useRef({ x: 0, y: 0 })
  const touchEnd = useRef({ x: 0, y: 0 })

  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0]
    touchStart.current = { x: touch.clientX, y: touch.clientY }
  }, [])

  const handleTouchEnd = useCallback((e) => {
    if (isTransitioning) return
    
    const touch = e.changedTouches[0]
    touchEnd.current = { x: touch.clientX, y: touch.clientY }
    
    const deltaY = touchStart.current.y - touchEnd.current.y
    const deltaX = touchStart.current.x - touchEnd.current.x
    
    // Seuil minimum pour déclencher la navigation
    const threshold = 50
    
    // Si le mouvement vertical est plus important que l'horizontal
    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > threshold) {
      if (deltaY > 0) {
        // Swipe vers le haut - section suivante
        goToNextSection()
      } else {
        // Swipe vers le bas - section précédente
        goToPrevSection()
      }
    }
  }, [goToNextSection, goToPrevSection, isTransitioning])

  // Effet pour attacher les événements
  useEffect(() => {
    const controller = scrollRef.current
    if (!controller) return

    // Événements de scroll et clavier
    controller.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    
    // Événements tactiles
    controller.addEventListener('touchstart', handleTouchStart, { passive: true })
    controller.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      controller.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      controller.removeEventListener('touchstart', handleTouchStart)
      controller.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleWheel, handleKeyDown, handleTouchStart, handleTouchEnd])

  // Gestion des clics sur les indicateurs de section
  const handleSectionClick = useCallback((sectionId) => {
    if (!isTransitioning) {
      setCurrentSection(sectionId)
    }
  }, [setCurrentSection, isTransitioning])

  return (
    <>
      {/* Zone de capture invisible pour les événements */}
      <div
        ref={scrollRef}
        className="absolute inset-0 z-5 pointer-events-auto"
        style={{ cursor: isTransitioning ? 'wait' : 'grab' }}
      />
      
      {/* Indicateurs de navigation latéraux */}
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 space-y-3">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => handleSectionClick(section.id)}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 pointer-events-auto
              ${currentSection === section.id 
                ? 'bg-blue-400 border-blue-400 scale-125' 
                : 'bg-transparent border-white/50 hover:border-blue-400 hover:scale-110'
              }`}
            aria-label={`Aller à la section ${section.title}`}
          />
        ))}
      </div>
      
      {/* Indicateur de section courante */}
      <div className="absolute bottom-6 left-6 z-20 text-white/70 text-sm pointer-events-none">
        <div className="flex items-center space-x-2">
          <span>
            {sections.findIndex(s => s.id === currentSection) + 1} / {sections.length}
          </span>
          <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-400 transition-all duration-1000 ease-out"
              style={{ 
                width: `${((sections.findIndex(s => s.id === currentSection) + 1) / sections.length) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Instructions de navigation */}
      <div className="absolute bottom-6 right-6 z-20 text-white/50 text-xs text-right pointer-events-none">
        <div className="space-y-1">
          <div>↑↓ Fléches ou molette pour naviguer</div>
          <div>1-5 Navigation directe</div>
          <div>Espace Page suivante</div>
        </div>
      </div>
    </>
  )
}

export default ScrollController 