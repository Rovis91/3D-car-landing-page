import React from 'react'

function EnvironmentScene() {
  return (
    <group>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.4, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.9} metalness={0.1} />
      </mesh>
      
      {/* Road markings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.39, 0]}>
        <planeGeometry args={[0.3, 20]} />
        <meshStandardMaterial color="#ffffff" opacity={0.8} transparent />
      </mesh>
      
      {/* Fog effect */}
      <fog attach="fog" args={['#1a1a2e', 15, 50]} />
    </group>
  )
}

export default EnvironmentScene