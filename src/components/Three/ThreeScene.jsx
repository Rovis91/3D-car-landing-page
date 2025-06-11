import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import CarModel from './CarModel'
import CameraController from './CameraController'
import ParticleField from './ParticleField'

function ThreeScene({ scrollProgress, currentSection }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full">
      <Canvas shadows camera={{ position: [0, 1, 5], fov: 60 }}>
        <CameraController scrollProgress={scrollProgress} currentSection={currentSection} />
        
        {/* Ambient Light */}
        <ambientLight intensity={0.4} />
        
        {/* Main Directional Light */}
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        
        {/* Fill Light */}
        <directionalLight
          position={[-3, 3, 2]}
          intensity={0.5}
        />
        
        {/* Car Model */}
        <Suspense fallback={null}>
          <CarModel position={[0, 0, 0]} />
          <ParticleField />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default ThreeScene