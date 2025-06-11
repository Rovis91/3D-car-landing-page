import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import CarModel from './CarModel'
import CameraController from './CameraController'

function ThreeScene({ scrollProgress, currentSection }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full">
      <Canvas shadows camera={{ position: [0, 1, 5], fov: 60 }}>
        <CameraController scrollProgress={scrollProgress} currentSection={currentSection} />
        
        {/* Ambient Light */}
        <ambientLight intensity={0.6} />
        
        {/* Main Directional Light */}
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        {/* Fill Light (from opposite side) */}
        <directionalLight
          position={[-5, 8, 3]}
          intensity={0.8}
          color="#ffffff"
        />
        
        {/* Rim Light (backlighting) */}
        <directionalLight
          position={[0, 5, -8]}
          intensity={0.6}
          color="#4f46e5"
        />
        
        {/* Spot Light for highlights */}
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={0.1}
          intensity={1}
          castShadow
        />
        
        {/* Car Model */}
        <Suspense fallback={null}>
          <CarModel position={[0, 0, 0]} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default ThreeScene