import React from 'react'
import { useGLTF } from '@react-three/drei'

function CarModel({ position = [0, 0, 0] }) {
  const { scene } = useGLTF('/car.glb')
  
  return (
    <group position={position}>
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