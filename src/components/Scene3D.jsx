import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls, Environment, Float } from '@react-three/drei'
import { useStore } from '../store/cameraStore'
import * as THREE from 'three'

// Composant voiture temporaire (en attendant le vrai modèle)
function TempCar() {
  const carRef = useRef()
  
  // Points d'intérêt sur la voiture
  const interestPoints = useMemo(() => ({
    overview: { position: [0, 0, 0], name: "Vue globale" },
    door: { position: [-2, 0, 1], name: "Portière" },
    license: { position: [0, -0.5, -2.5], name: "Plaque" },
    bumper: { position: [0, -0.8, 2.5], name: "Pare-chocs" },
    tech: { position: [1.5, 0.5, 0], name: "Technologie" },
    rear: { position: [0, 0.5, -3], name: "Arrière" }
  }), [])
  
  // Animation subtile de la voiture
  useFrame((state) => {
    if (carRef.current) {
      carRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.02
      carRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.02
    }
  })
  
  return (
    <group ref={carRef}>
      {/* Corps principal de la voiture */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4, 1.5, 2.5]} />
        <meshStandardMaterial color="#1a365d" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Toit */}
      <mesh position={[0, 1, -0.3]}>
        <boxGeometry args={[3.5, 1, 1.8]} />
        <meshStandardMaterial color="#2d3748" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Roues */}
      {[[-1.5, -0.8, 1.2], [1.5, -0.8, 1.2], [-1.5, -0.8, -1.2], [1.5, -0.8, -1.2]].map((pos, i) => (
        <mesh key={i} position={pos} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.3]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      ))}
      
      {/* Phares */}
      <mesh position={[-1.5, 0.2, 1.3]}>
        <sphereGeometry args={[0.2]} />
        <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[1.5, 0.2, 1.3]}>
        <sphereGeometry args={[0.2]} />
        <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.3} />
      </mesh>
      
      {/* Marqueurs des points d'intérêt (invisibles, pour debug) */}
      {Object.entries(interestPoints).map(([key, point]) => (
        <mesh key={key} position={point.position} visible={false}>
          <sphereGeometry args={[0.1]} />
          <meshBasicMaterial color="red" />
        </mesh>
      ))}
    </group>
  )
}

// Contrôleur de caméra animé
function CameraController() {
  const cameraRef = useRef()
  const { currentSection, cameraPositions } = useStore()
  
  useFrame((state, delta) => {
    if (!cameraRef.current) return
    
    const targetPos = cameraPositions[currentSection]
    if (!targetPos) return
    
    // Animation fluide de la caméra
    const camera = state.camera
    const targetPosition = new THREE.Vector3(...targetPos.position)
    const targetLookAt = new THREE.Vector3(...targetPos.lookAt)
    
    // Lerp position
    camera.position.lerp(targetPosition, delta * 2)
    
    // Lerp rotation
    const direction = targetLookAt.clone().sub(camera.position).normalize()
    const targetQuaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, -1),
      direction
    )
    camera.quaternion.slerp(targetQuaternion, delta * 2)
  })
  
  return <PerspectiveCamera ref={cameraRef} makeDefault position={[5, 3, 5]} />
}

function Scene3D() {
  return (
    <Canvas shadows className="w-full h-full">
      <CameraController />
      
      {/* Éclairage */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#4299e1" />
      
      {/* Environnement */}
      <Environment preset="sunset" />
      
      {/* Sol */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#2d3748" metalness={0.1} roughness={0.8} />
      </mesh>
      
      {/* Voiture temporaire */}
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.1}>
        <TempCar />
      </Float>
      
      {/* Particules d'ambiance */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
        <mesh position={[8, 4, -3]}>
          <sphereGeometry args={[0.1]} />
          <meshStandardMaterial color="#4299e1" emissive="#4299e1" emissiveIntensity={0.5} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.5}>
        <mesh position={[-6, 3, 4]}>
          <sphereGeometry args={[0.08]} />
          <meshStandardMaterial color="#38b2ac" emissive="#38b2ac" emissiveIntensity={0.4} />
        </mesh>
      </Float>
    </Canvas>
  )
}

export default Scene3D 