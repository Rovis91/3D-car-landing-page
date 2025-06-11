import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import CarModel from './CarModel'
import CameraController from './CameraController'
import EnvironmentScene from './Environment'
import './ThreeScene.css'

function ThreeScene({ scrollProgress, currentSection }) {
  return (
    <div className="three-scene">
      <Canvas shadows camera={{ position: [0, 1, 5], fov: 60 }}>
        <CameraController scrollProgress={scrollProgress} currentSection={currentSection} />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        
        {/* Environment */}
        <EnvironmentScene />
        
        {/* Car Model */}
        <Suspense fallback={null}>
          <CarModel position={[0, 0, 0]} />
        </Suspense>
        
        {/* Environment preset */}
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}

export default ThreeScene