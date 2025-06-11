import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

function CarModel({ position = [0, 0, 0] }) {
  const carRef = useRef()
  const { scene } = useGLTF('/car.glb')
  
  // Gentle floating animation
  useFrame((state) => {
    if (carRef.current) {
      carRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.02
    }
  })
  
  return (
    <group ref={carRef} position={position}>
      <primitive 
        object={scene} 
        scale={[1, 1, 1]} 
        castShadow 
        receiveShadow
      />
    </group>
  )
}

// Preload the model
useGLTF.preload('/car.glb')

export default CarModel