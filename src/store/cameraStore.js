import { create } from 'zustand'

// Définition des positions de caméra pour chaque section
const cameraPositions = {
  hero: {
    position: [6, 4, 8],
    lookAt: [0, 0, 0],
    fov: 50
  },
  tracking: {
    position: [3, 2, 2],
    lookAt: [1.5, 0.5, 0], // Zone technologie
    fov: 45
  },
  cta: {
    position: [-4, 1, 3],
    lookAt: [-2, 0, 1], // Portière
    fov: 60
  },
  faq: {
    position: [0, 3, -6],
    lookAt: [0, 0, -3], // Arrière de la voiture
    fov: 55
  },
  contact: {
    position: [2, 1, -4],
    lookAt: [0, -0.5, -2.5], // Plaque d'immatriculation
    fov: 70
  }
}

// Définition des sections avec leurs métadonnées
const sections = [
  {
    id: 'hero',
    title: 'AutoFlow',
    subtitle: 'Solution complète de gestion de concession',
    description: 'Transformez votre concession avec notre plateforme tout-en-un',
    position: 0
  },
  {
    id: 'tracking',
    title: 'Technologie avancée',
    subtitle: 'Suivi intelligent des véhicules',
    description: 'IA et analytics pour optimiser vos ventes',
    position: 1
  },
  {
    id: 'cta',
    title: 'Ouvrez les portes',
    subtitle: 'Du succès pour votre concession',
    description: 'Commencez votre transformation dès aujourd\'hui',
    position: 2
  },
  {
    id: 'faq',
    title: 'Questions fréquentes',
    subtitle: 'Tout ce que vous devez savoir',
    description: 'Réponses aux questions les plus courantes',
    position: 3
  },
  {
    id: 'contact',
    title: 'Contactez-nous',
    subtitle: 'Démarrons ensemble',
    description: 'Notre équipe vous accompagne dans votre projet',
    position: 4
  }
]

export const useStore = create((set, get) => ({
  // État actuel
  currentSection: 'hero',
  scrollProgress: 0,
  isTransitioning: false,
  
  // Données statiques
  cameraPositions,
  sections,
  
  // Actions
  setCurrentSection: (sectionId) => {
    const section = sections.find(s => s.id === sectionId)
    if (section) {
      set({ 
        currentSection: sectionId,
        scrollProgress: section.position / (sections.length - 1),
        isTransitioning: true
      })
      
      // Réinitialiser le flag de transition après l'animation
      setTimeout(() => {
        set({ isTransitioning: false })
      }, 1000)
    }
  },
  
  setScrollProgress: (progress) => {
    const clampedProgress = Math.max(0, Math.min(1, progress))
    const sectionIndex = Math.round(clampedProgress * (sections.length - 1))
    const newSection = sections[sectionIndex]
    
    if (newSection && newSection.id !== get().currentSection) {
      set({ 
        currentSection: newSection.id,
        scrollProgress: clampedProgress,
        isTransitioning: true
      })
      
      setTimeout(() => {
        set({ isTransitioning: false })
      }, 1000)
    } else {
      set({ scrollProgress: clampedProgress })
    }
  },
  
  // Navigation
  goToNextSection: () => {
    const { currentSection } = get()
    const currentIndex = sections.findIndex(s => s.id === currentSection)
    const nextIndex = Math.min(currentIndex + 1, sections.length - 1)
    const nextSection = sections[nextIndex]
    
    if (nextSection) {
      get().setCurrentSection(nextSection.id)
    }
  },
  
  goToPrevSection: () => {
    const { currentSection } = get()
    const currentIndex = sections.findIndex(s => s.id === currentSection)
    const prevIndex = Math.max(currentIndex - 1, 0)
    const prevSection = sections[prevIndex]
    
    if (prevSection) {
      get().setCurrentSection(prevSection.id)
    }
  },
  
  // Utilitaires
  getCurrentSectionData: () => {
    const { currentSection } = get()
    return sections.find(s => s.id === currentSection)
  },
  
  getSectionProgress: () => {
    const { currentSection } = get()
    const sectionIndex = sections.findIndex(s => s.id === currentSection)
    return sectionIndex / (sections.length - 1)
  }
}))

export default useStore 