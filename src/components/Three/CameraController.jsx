import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const CAMERA_POSITIONS = {
  hero: { 
    position: [0, 6, 2], 
    lookAt: [0, -10, 0] 
  },
  problem: { 
    position: [-2, 2, 5], 
    lookAt: [0, 0.5, 1] 
  },
  solution: { 
    position: [2, 2, 5], 
    lookAt: [0, 0.5, 1] 
  },
  features: { 
    position: [3, 1, -3], 
    lookAt: [0, 1, 0] 
  },
  pricing: { 
    position: [0, 8, 0], 
    lookAt: [0, 0, 0] 
  },
  faq: { 
    position: [2, 1, 4], 
    lookAt: [0, 0.5, 0] 
  }
}

function CameraController({ currentSection }) {
  const { camera } = useThree()
  const targetPosition = useRef(new THREE.Vector3())
  const targetLookAt = useRef(new THREE.Vector3())
  
  useEffect(() => {
    if (currentSection && CAMERA_POSITIONS[currentSection]) {
      const currentPos = CAMERA_POSITIONS[currentSection]
      
      // Set target position for smooth interpolation
      targetPosition.current.set(...currentPos.position)
      targetLookAt.current.set(...currentPos.lookAt)
      
      // Handle special camera orientations
      if (currentSection === 'pricing') {
        camera.up.set(0, 0, -1)
      } else {
        camera.up.set(0, 1, 0)
      }
    }
  }, [currentSection, camera])
  
  useFrame((state, delta) => {
    // Smooth camera movement with interpolation
    camera.position.lerp(targetPosition.current, delta )
    
    // Smooth look at transition
    const direction = targetLookAt.current.clone().sub(camera.position).normalize()
    const targetQuaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, -1),
      direction
    )
    camera.quaternion.slerp(targetQuaternion, delta * 2)
  })
  
  return null
}

export default CameraController