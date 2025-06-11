import React, { useState } from 'react'
import Header from './components/Layout/Header'
import ScrollIndicator from './components/Layout/ScrollIndicator'
import ThreeScene from './components/Three/ThreeScene'
import HeroSection from './components/Sections/HeroSection'
import ProblemSection from './components/Sections/ProblemSection'
import SolutionSection from './components/Sections/SolutionSection'
import FeaturesSection from './components/Sections/FeaturesSection'
import PricingSection from './components/Sections/PricingSection'
import FAQSection from './components/Sections/FAQSection'
import useScrollProgress from './hooks/useScrollProgress'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import './styles/layout.css'

function App() {
  const { currentSection } = useScrollProgress()
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Create theme context
  const themeContext = {
    isDarkMode,
    toggleTheme: () => setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'surface-ground' : 'surface-ground'}`}>
      {/* Dynamic theme import */}
      <link 
        rel="stylesheet" 
        href={isDarkMode 
          ? 'https://unpkg.com/primereact@10/resources/themes/lara-dark-indigo/theme.css'
          : 'https://unpkg.com/primereact@10/resources/themes/lara-light-indigo/theme.css'
        }
      />
      
      <div className="fixed top-0 left-0 w-full h-full">
        <ThreeScene currentSection={currentSection} />
      </div>
      <div className="relative" style={{ zIndex: 1 }}>
        <Header themeContext={themeContext} />
        <ScrollIndicator currentSection={currentSection} />
        <main>
          <HeroSection />
          <ProblemSection />
          <SolutionSection />
          <FeaturesSection />
          <PricingSection />
          <FAQSection />
        </main>
      </div>
    </div>
  )
}

export default App