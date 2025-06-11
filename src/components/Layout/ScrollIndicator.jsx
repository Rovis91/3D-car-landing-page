import React from 'react'
import { Button } from 'primereact/button'
import { SECTIONS } from '../../utils/constants'

function ScrollIndicator({ currentSection }) {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  return (
    <div style={{
      position: 'fixed',
      right: '2rem',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }}>
      {SECTIONS.map((section, index) => (
        <Button
          key={section}
          onClick={() => scrollToSection(section)}
          className={`p-button-rounded ${currentSection === section ? 'p-button-filled' : 'p-button-outlined'}`}
          style={{ 
            width: '12px', 
            height: '12px', 
            minWidth: '12px',
            background: currentSection === section ? '#8b5cf6' : 'transparent',
            border: '2px solid #8b5cf6'
          }}
          aria-label={`Go to section ${index + 1}`}
        />
      ))}
    </div>
  )
}

export default ScrollIndicator