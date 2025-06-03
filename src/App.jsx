import React, { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, useHelper, PerspectiveCamera, useGLTF } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { create } from 'zustand'
import * as THREE from 'three'

// Store for camera state and theme
const useCameraStore = create((set, get) => ({
  currentSection: 'hero',
  sectionIndex: 0,
  isTransitioning: false,
  sections: ['hero', 'problem', 'solution', 'features', 'pricing', 'cta'],
  
  cameraPositions: {
    hero: { position: [0, 1, 5], lookAt: [0, 0.5, 0] }, // Front view
    problem: { position: [-5, 1, 0], lookAt: [0, 0.5, 0] }, // Left view
    solution: { position: [0, 1, -5], lookAt: [0, 0.5, 0] }, // Back view
    features: { position: [5, 1, 0], lookAt: [0, 0.5, 0] }, // Right view
    pricing: { position: [0, 6, 0], lookAt: [0, 0, 0] }, // Top view (aligned with car)
    cta: { position: [0, 1, 5], lookAt: [0, 5, 0] } // Look at sky
  },
  
  goToSection: (section) => {
    const { sections } = get()
    const sectionIndex = sections.indexOf(section)
    set({ currentSection: section, sectionIndex, isTransitioning: true })
    setTimeout(() => set({ isTransitioning: false }), 1500)
  },
  
  nextSection: () => {
    const { sections, sectionIndex } = get()
    const nextIndex = Math.min(sectionIndex + 1, sections.length - 1)
    set({ sectionIndex: nextIndex, currentSection: sections[nextIndex], isTransitioning: true })
    setTimeout(() => set({ isTransitioning: false }), 1500)
  },
  
  prevSection: () => {
    const { sections, sectionIndex } = get()
    const prevIndex = Math.max(sectionIndex - 1, 0)
    set({ sectionIndex: prevIndex, currentSection: sections[prevIndex], isTransitioning: true })
    setTimeout(() => set({ isTransitioning: false }), 1500)
  }
}))

// GLB Car component
function GLBCar({ carPosition = [0, 0, 0] }) {
  const carRef = useRef()
  const { scene } = useGLTF('/car.glb')
  
  // Clone the scene to avoid reusing the same object
  const carModel = useMemo(() => scene.clone(), [scene])
  
  // Simple floating animation
  useFrame((state) => {
    if (carRef.current) {
      // Gentle floating for all sections
      const baseFloating = Math.sin(state.clock.elapsedTime * 0.5) * 0.02
      carRef.current.position.y = carPosition[1] + baseFloating
      
      // Car stays in place, no movement or rotation
      carRef.current.position.z = 0
      carRef.current.rotation.y = 0
    }
  })
  
  return (
    <group ref={carRef} position={carPosition}>
      <primitive 
        object={carModel} 
        scale={[1, 1, 1]} 
        castShadow 
        receiveShadow
      />
    </group>
  )
}

// Fallback Lamborghini-style car if GLB fails
function LamborghiniStyleCar({ carPosition = [0, 0, 0] }) {
  const carRef = useRef()
  
  useFrame((state) => {
    if (carRef.current) {
      // Gentle floating for all sections
      const baseFloating = Math.sin(state.clock.elapsedTime * 0.5) * 0.02
      carRef.current.position.y = carPosition[1] + baseFloating
      
      // Car stays in place, no movement or rotation
      carRef.current.position.z = 0
      carRef.current.rotation.y = 0
      
      // Rotate wheels only
      carRef.current.children.forEach((child) => {
        if (child.name === 'wheel') {
          child.rotation.x = state.clock.elapsedTime * 2
        }
      })
    }
  })
  
  return (
    <group ref={carRef} position={carPosition}>
      {/* Main body - low and wide like Countach */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[2.2, 0.4, 4.8]} />
        <meshStandardMaterial color="#FF6B35" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Hood - elongated and angled */}
      <mesh position={[0, 0.35, 1.8]} rotation={[0.1, 0, 0]} castShadow>
        <boxGeometry args={[2, 0.3, 1.6]} />
        <meshStandardMaterial color="#E85D04" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Windshield - angled like Countach */}
      <mesh position={[0, 0.5, 0.8]} rotation={[0.3, 0, 0]} castShadow>
        <boxGeometry args={[1.8, 0.8, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} opacity={0.7} transparent />
      </mesh>
      
      {/* Roof - very low profile */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[1.6, 0.2, 2]} />
        <meshStandardMaterial color="#DC2F02" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Rear spoiler */}
      <mesh position={[0, 0.8, -2.2]} castShadow>
        <boxGeometry args={[1.5, 0.1, 0.3]} />
        <meshStandardMaterial color="#9D0208" metalness={0.8} roughness={0.3} />
      </mesh>
      
      {/* Side air intakes */}
      <mesh position={[-1.1, 0.3, -0.5]} castShadow>
        <boxGeometry args={[0.2, 0.4, 1]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.8} />
      </mesh>
      <mesh position={[1.1, 0.3, -0.5]} castShadow>
        <boxGeometry args={[0.2, 0.4, 1]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.8} />
      </mesh>
      
      {/* Headlights - sleek and angular */}
      <mesh position={[-0.7, 0.25, 2.4]} rotation={[0, 0, 0.1]} castShadow>
        <boxGeometry args={[0.4, 0.15, 0.1]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0.7, 0.25, 2.4]} rotation={[0, 0, -0.1]} castShadow>
        <boxGeometry args={[0.4, 0.15, 0.1]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
      </mesh>
      
      {/* Wheels - wider and lower profile */}
      {[[-1.1, -0.05, 1.6], [1.1, -0.05, 1.6], [-1.1, -0.05, -1.6], [1.1, -0.05, -1.6]].map((pos, i) => (
        <mesh key={i} position={pos} rotation={[0, 0, Math.PI / 2]} name="wheel" castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.25, 12]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
        </mesh>
      ))}
      
      {/* Light beams */}
      <pointLight position={[-0.7, 0.25, 2.6]} intensity={1} color="#ffffff" distance={4} />
      <pointLight position={[0.7, 0.25, 2.6]} intensity={1} color="#ffffff" distance={4} />
    </group>
  )
}

// Car component with fallback
function Car({ carPosition = [0, 0, 0] }) {
  const [useGLB, setUseGLB] = useState(true)
  
  const handleError = () => {
    setUseGLB(false)
  }
  
  if (useGLB) {
    return (
      <React.Suspense fallback={<LamborghiniStyleCar carPosition={carPosition} />}>
        <GLBCar carPosition={carPosition} onError={handleError} />
      </React.Suspense>
    )
  }
  
  return <LamborghiniStyleCar carPosition={carPosition} />
}

// Simplified street environment (only floor)
function StreetEnvironment({ isDayMode }) {
  return (
    <group>
      {/* Ground/Street */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.4, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial 
          color={isDayMode ? "#4a5568" : "#2a2a2a"} 
          roughness={0.9} 
          metalness={0.1}
        />
      </mesh>
      
      {/* Road markings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.39, 0]}>
        <planeGeometry args={[0.3, 20]} />
        <meshStandardMaterial color="#ffffff" opacity={0.8} transparent />
      </mesh>
      
      {/* Side lane markings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2, -0.39, 0]}>
        <planeGeometry args={[0.15, 20]} />
        <meshStandardMaterial color="#ffff00" opacity={0.6} transparent />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2, -0.39, 0]}>
        <planeGeometry args={[0.15, 20]} />
        <meshStandardMaterial color="#ffff00" opacity={0.6} transparent />
      </mesh>
    </group>
  )
}

// Simple camera controller with fixed transitions
function CameraController() {
  const { camera } = useThree()
  const { currentSection, cameraPositions } = useCameraStore()
  
  useFrame((state, delta) => {
    const targetPos = cameraPositions[currentSection]
    if (!targetPos) return
    
    const targetPosition = new THREE.Vector3(...targetPos.position)
    const targetLookAt = new THREE.Vector3(...targetPos.lookAt)
    
    // Simple smooth camera movement
    camera.position.lerp(targetPosition, delta * 2)
    
    // Simple lookAt for orientation
    camera.lookAt(targetLookAt)
    
    // Keep camera upright
    camera.up.set(0, 1, 0)
  })
  
  return null
}

// Enhanced floating particles
function Particles({ isDayMode }) {
  const particles = useMemo(() => {
    const positions = []
    for (let i = 0; i < 100; i++) {
      positions.push(
        (Math.random() - 0.5) * 30,
        Math.random() * 15,
        (Math.random() - 0.5) * 30
      )
    }
    return new Float32Array(positions)
  }, [])
  
  const particlesRef = useRef()
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
      particlesRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.5
    }
  })
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isDayMode ? 0.02 : 0.05}
        color={isDayMode ? "#60a5fa" : "#8B5CF6"}
        transparent
        opacity={isDayMode ? 0.3 : 0.6}
        sizeAttenuation
      />
    </points>
  )
}

// Content overlay component with copywriting from markdown
function ContentOverlay() {
  const { currentSection } = useCameraStore()
  
  const content = {
    hero: {
      title: "AutoMarket",
      subtitle: "Transformez votre prospection auto en machine à vendre",
      description: "Trouvez, gérez et vendez plus de véhicules en 3x moins de temps. Sans effort technique.",
      cta: "Essayer gratuitement 14 jours",
      supporting: "✓ Sans carte bancaire ✓ Prêt en 5 minutes ✓ Annulation à tout moment"
    },
    problem: {
      title: "Stop aux tâches répétitives",
      subtitle: "Vous perdez 15 heures par semaine",
      description: "Prospection manuelle épuisante, gestion chaotique des contacts, administration chronophage...",
      cta: "Et si tout cela appartenait au passé ?"
    },
    solution: {
      title: "Une plateforme qui travaille pour vous 24/7",
      subtitle: "Automatisation intelligente",
      description: "AutoMarket unifie prospection, CRM et gestion en un système intelligent qui automatise 80% de votre travail administratif.",
      cta: "Découvrir l'automatisation"
    },
    features: {
      title: "Fonctionnalités Pro",
      subtitle: "Pensées par des pros de l'auto",
      description: "Scanner multi-plateformes, pipeline visuel, calcul de rentabilité, publication 1-click, documents pré-remplis.",
      cta: "Explorer les fonctionnalités"
    },
    pricing: {
      title: "Un investissement rentable",
      subtitle: "Dès le premier mois",
      description: "De 49€ à 99€/mois. 🎯 Offre de lancement : -30% à vie pour les 100 premiers inscrits",
      cta: "Commencer l'essai gratuit"
    },
    cta: {
      title: "Prêt à décoller ?",
      subtitle: "Rejoignez 500+ concessionnaires",
      description: "14 jours gratuits sans carte bancaire. Annulation en 1 clic, sans justification.",
      cta: "Commencer maintenant"
    }
  }
  
  const currentContent = content[currentSection]
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentSection}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6 }}
        className="absolute bottom-20 left-4 right-4 md:left-8 md:right-auto md:max-w-md pointer-events-none"
      >
        <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/10 pointer-events-auto">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl font-bold text-white mb-2"
          >
            {currentContent.title}
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-purple-300 mb-3"
          >
            {currentContent.subtitle}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 mb-4"
          >
            {currentContent.description}
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold text-white hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
          >
            {currentContent.cta}
          </motion.button>
          {currentContent.supporting && (
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xs text-green-400 mt-2"
            >
              {currentContent.supporting}
            </motion.p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Navigation dots
function NavigationDots() {
  const { sections, currentSection, goToSection } = useCameraStore()
  
  const sectionLabels = {
    hero: 'Front',
    problem: 'Left', 
    solution: 'Back',
    features: 'Right',
    pricing: 'Top',
    cta: 'Sky View'
  }
  
  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 space-y-3">
      {sections.map((section, index) => (
        <button
          key={section}
          onClick={() => goToSection(section)}
          className={`w-3 h-3 rounded-full border-2 transition-all relative group ${
            currentSection === section
              ? 'bg-purple-500 border-purple-500 scale-125'
              : 'bg-transparent border-white/50 hover:border-purple-400'
          }`}
        >
          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {sectionLabels[section]}
          </span>
        </button>
      ))}
    </div>
  )
}

// Main scroll controller
function ScrollController() {
  const { nextSection, prevSection, isTransitioning } = useCameraStore()
  const touchStart = useRef({ x: 0, y: 0 })
  const lastWheelTime = useRef(0)
  
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault()
      
      // Throttle wheel events
      const now = Date.now()
      if (now - lastWheelTime.current < 800 || isTransitioning) return
      lastWheelTime.current = now
      
      if (e.deltaY > 0) {
        nextSection()
      } else {
        prevSection()
      }
    }
    
    const handleTouchStart = (e) => {
      const touch = e.touches[0]
      touchStart.current = { x: touch.clientX, y: touch.clientY }
    }
    
    const handleTouchEnd = (e) => {
      if (isTransitioning) return
      
      const touch = e.changedTouches[0]
      const deltaY = touchStart.current.y - touch.clientY
      
      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0) {
          nextSection()
        } else {
          prevSection()
        }
      }
    }
    
    const handleKeyDown = (e) => {
      if (isTransitioning) return
      
      switch (e.key) {
        case 'ArrowDown':
        case ' ':
          e.preventDefault()
          nextSection()
          break
        case 'ArrowUp':
          e.preventDefault()
          prevSection()
          break
      }
    }
    
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [nextSection, prevSection, isTransitioning])
  
  return null
}

// Main App component
export default function App() {
  const { currentSection } = useCameraStore()
  const [carPosition, setCarPosition] = useState([0, 0, 0])
  const [isDayMode, setIsDayMode] = useState(false)
  
  // Keep car position consistent
  useEffect(() => {
    setCarPosition([0, 0, 0])
  }, [])
  
  const handleThemeToggle = () => {
    setIsDayMode(!isDayMode)
    console.log('Theme toggled to:', !isDayMode ? 'day' : 'night')
  }
  
  return (
    <div className={`relative w-full h-screen overflow-hidden ${
      isDayMode 
        ? 'bg-gradient-to-b from-sky-200 to-blue-100' 
        : 'bg-gradient-to-b from-gray-900 to-black'
    }`}>
      {/* 3D Scene */}
      <Canvas shadows camera={{ position: [0, 1, 5], fov: 60 }}>
        <CameraController />
        
        {/* Lighting - Dynamic based on day/night mode */}
        <ambientLight intensity={isDayMode ? 0.6 : 0.2} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={isDayMode ? 1.2 : 0.8}
          color={isDayMode ? "#ffffff" : "#8B5CF6"}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        
        {!isDayMode && (
          <>
            {/* Night mode neon lights */}
            <pointLight position={[0, 5, 5]} intensity={2} color="#8B5CF6" />
            <pointLight position={[0, 5, -5]} intensity={2} color="#3B82F6" />
            
            <spotLight
              position={[-5, 6, 0]}
              angle={0.5}
              penumbra={1}
              intensity={1.5}
              color="#8B5CF6"
              castShadow
            />
            <spotLight
              position={[5, 6, 0]}
              angle={0.5}
              penumbra={1}
              intensity={1.5}
              color="#3B82F6"
              castShadow
            />
            
            <pointLight position={[-10, 3, -5]} intensity={0.8} color="#7C3AED" />
            <pointLight position={[10, 3, -5]} intensity={0.8} color="#1E40AF" />
          </>
        )}
        
        {isDayMode && (
          <>
            {/* Day mode lighting */}
            <directionalLight
              position={[-10, 10, 10]}
              intensity={0.8}
              color="#ffffff"
              castShadow
            />
            <hemisphereLight
              skyColor="#87CEEB"
              groundColor="#8B7355"
              intensity={0.4}
            />
          </>
        )}
        
        {/* Environment */}
        <fog attach="fog" args={[isDayMode ? '#87CEEB' : '#1a1a2e', 15, 50]} />
        <StreetEnvironment isDayMode={isDayMode} />
        <Car carPosition={carPosition} />
        <Particles isDayMode={isDayMode} />
        
        {/* Environment preset */}
        <Environment preset={isDayMode ? "city" : "night"} />
      </Canvas>
      
      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-6 pointer-events-auto">
          <div className="flex justify-between items-center">
            <h1 className={`font-bold text-xl ${isDayMode ? 'text-gray-800' : 'text-white'}`}>
              AutoMarket
            </h1>
            <nav className={`hidden md:flex space-x-6 text-sm ${isDayMode ? 'text-gray-600' : 'text-white/80'}`}>
              <a href="#" className="hover:text-purple-400 transition">Accueil</a>
              <a href="#" className="hover:text-purple-400 transition">Fonctionnalités</a>
              <a href="#" className="hover:text-purple-400 transition">Tarifs</a>
              <a href="#" className="hover:text-purple-400 transition">Contact</a>
            </nav>
          </div>
        </div>
        
        {/* Theme Toggle Button - COMPLETELY NEW */}
        <button
          onClick={handleThemeToggle}
          className={`fixed top-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center text-2xl font-bold pointer-events-auto ${
            isDayMode 
              ? 'bg-yellow-400 text-yellow-900 hover:bg-yellow-300 shadow-yellow-200' 
              : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-900'
          }`}
        >
          {isDayMode ? '🌙' : '☀️'}
        </button>
        
        {/* Content */}
        <ContentOverlay />
        
        {/* Navigation */}
        <NavigationDots />
        
        {/* Scroll indicator */}
        <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 text-xs ${isDayMode ? 'text-gray-600' : 'text-white/50'}`}>
          <div className="flex flex-col items-center space-y-2">
            <span>Scroll ou Swipe</span>
            <div className={`w-4 h-6 border rounded-full flex justify-center ${isDayMode ? 'border-gray-400' : 'border-white/30'}`}>
              <div className={`w-0.5 h-2 rounded-full mt-1 animate-bounce ${isDayMode ? 'bg-gray-600' : 'bg-white/50'}`} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Controllers */}
      <ScrollController />
    </div>
  )
}