import React from 'react'
import Scene3D from './components/Scene3D'
import ScrollController from './components/ScrollController'
import ContentSections from './components/ContentSections'
import './index.css'

function App() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Scene 3D en arrière-plan */}
      <div className="absolute inset-0 z-0">
        <Scene3D />
      </div>
      
      {/* Contrôleur de scroll invisible */}
      <ScrollController />
      
      {/* Sections de contenu overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <ContentSections />
      </div>
      
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-20 p-6">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold text-xl">AutoFlow</div>
          <div className="flex space-x-6 text-white text-sm">
            <button className="hover:text-blue-400 transition-colors pointer-events-auto">
              Accueil
            </button>
            <button className="hover:text-blue-400 transition-colors pointer-events-auto">
              Fonctionnalités
            </button>
            <button className="hover:text-blue-400 transition-colors pointer-events-auto">
              À propos
            </button>
            <button className="hover:text-blue-400 transition-colors pointer-events-auto">
              Contact
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default App 