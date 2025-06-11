import React from 'react'
import Header from './components/Layout/Header'
import ScrollIndicator from './components/Layout/ScrollIndicator'
import ThreeScene from './components/Three/ThreeScene'
import StaticBackground from './components/Static/StaticBackground'
import UnifiedSections from './components/Sections/UnifiedSections'
import useThreeCompatibility from './hooks/useThreeCompatibility'
import useScrollProgress from './hooks/useScrollProgress'
import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import './App.css'

function App() {
  const { isCompatible } = useThreeCompatibility()
  const { scrollProgress, currentSection } = useScrollProgress()

  return (
    <div className="app-container">
      {/* 3D Background Layer */}
      <div className="background-layer">
        {isCompatible ? (
          <ThreeScene 
            scrollProgress={scrollProgress} 
            currentSection={currentSection}
          />
        ) : (
          <StaticBackground />
        )}
      </div>

      {/* Content Layer */}
      <div className="content-layer">
        <Header />
        <ScrollIndicator currentSection={currentSection} />
        <UnifiedSections />
      </div>
    </div>
  )
}

export default App