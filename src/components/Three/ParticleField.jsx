
import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function ParticleField() {
  const meshRef = useRef()
  const particleCount = 100

  // Generate random positions for particles in a larger sphere
  const { positions, originalPositions } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const originalPositions = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
              // Random positions in a sphere around the car (radius 3-4)
        const i3 = i * 3
        const phi = Math.random() * Math.PI * 2
        const costheta = Math.random() * 2 - 1
        const u = Math.random()
        
        const theta = Math.acos(costheta)
        const r = 3 + Math.random() * 1 // Radius between 3 and 4
      
      const x = r * Math.sin(theta) * Math.cos(phi)
      const y = r * Math.sin(theta) * Math.sin(phi)
      const z = r * Math.cos(theta)
      
      positions[i3] = x
      positions[i3 + 1] = y
      positions[i3 + 2] = z
      
      // Store original positions for orbit calculations
      originalPositions[i3] = x
      originalPositions[i3 + 1] = y
      originalPositions[i3 + 2] = z
    }
    
    return { positions, originalPositions }
  }, [])

  // Complex 360° orbital animation
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      const positionAttribute = meshRef.current.geometry.attributes.position
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        
        // Get original position
        const originalX = originalPositions[i3]
        const originalY = originalPositions[i3 + 1]
        const originalZ = originalPositions[i3 + 2]
        
        // Create different orbital speeds and axes for each particle
        const speedY = 0.001 + (i % 5) * 0.0002 // Different Y rotation speeds
        const speedX = 0.0005 + (i % 3) * 0.0001 // Different X rotation speeds  
        const speedZ = 0.0008 + (i % 4) * 0.0001 // Different Z rotation speeds
        
        // Apply rotations on multiple axes
        const rotY = time * speedY
        const rotX = time * speedX
        const rotZ = time * speedZ
        
        // Rotation matrices for each axis
        // Y-axis rotation
        let x = originalX * Math.cos(rotY) - originalZ * Math.sin(rotY)
        let z = originalX * Math.sin(rotY) + originalZ * Math.cos(rotY)
        let y = originalY
        
        // X-axis rotation
        const tempY = y * Math.cos(rotX) - z * Math.sin(rotX)
        z = y * Math.sin(rotX) + z * Math.cos(rotX)
        y = tempY
        
        // Z-axis rotation (subtle)
        const tempX = x * Math.cos(rotZ) - y * Math.sin(rotZ)
        y = x * Math.sin(rotZ) + y * Math.cos(rotZ)
        x = tempX
        
        // Update positions
        positionAttribute.array[i3] = x
        positionAttribute.array[i3 + 1] = y
        positionAttribute.array[i3 + 2] = z
      }
      
      positionAttribute.needsUpdate = true
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#4f46e5"
        transparent
        opacity={0.7}
        sizeAttenuation={true}
      />
    </points>
  )
}

export default ParticleField 