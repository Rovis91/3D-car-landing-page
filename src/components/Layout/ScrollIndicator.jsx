import React from 'react'
import { Button } from 'primereact/button'

const SECTIONS = ['hero', 'problem', 'solution', 'features', 'pricing', 'faq']

function ScrollIndicator({ currentSection }) {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  return (
    <div className="fixed right-3 top-50 transform -translate-y-50 z-5 flex flex-column gap-2">
      {SECTIONS.map((section, index) => (
        <Button
          key={section}
          onClick={() => scrollToSection(section)}
          className={`p-button-rounded w-3 h-3 min-w-min ${
            currentSection === section ? 'p-button-primary' : 'p-button-outlined'
          }`}
          aria-label={`Go to section ${index + 1}`}
        />
      ))}
    </div>
  )
}

export default ScrollIndicator