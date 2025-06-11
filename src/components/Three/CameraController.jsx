import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { CAMERA_POSITIONS } from '../../utils/constants'

function CameraController({ scrollProgress, currentSection }) {
  const { camera } = useThree()
  const targetPosition = useRef(new THREE.Vector3())
  const targetLookAt = useRef(new THREE.Vector3())
  
  useEffect(() => {
    // Use currentSection as the primary method for camera positioning
    if (currentSection && CAMERA_POSITIONS[currentSection]) {
      const currentPos = CAMERA_POSITIONS[currentSection]
      
      // Set target position directly from current section
      targetPosition.current.set(...currentPos.position)
      targetLookAt.current.set(...currentPos.lookAt)
      
      // Handle special camera orientations
      if (currentSection === 'pricing') {
        camera.up.set(0, 0, -1)
      } else {
        camera.up.set(0, 1, 0)
      }
    }
    
    // Optional: Use scroll progress for smooth interpolation between sections
    if (scrollProgress !== undefined && scrollProgress >= 0) {
      const progress = Math.min(Math.max(scrollProgress, 0), 1)
      const totalSections = Object.keys(CAMERA_POSITIONS).length
      
      // Calculate which sections we're between
      const sectionIndex = Math.floor(progress * (totalSections - 1))
      const sectionProgress = (progress * (totalSections - 1)) % 1
      
      const sections = Object.keys(CAMERA_POSITIONS)
      const currentKey = sections[Math.min(sectionIndex, sections.length - 1)]
      const nextKey = sections[Math.min(sectionIndex + 1, sections.length - 1)]
      
      if (CAMERA_POSITIONS[currentKey] && CAMERA_POSITIONS[nextKey]) {
        const currentPos = CAMERA_POSITIONS[currentKey]
        const nextPos = CAMERA_POSITIONS[nextKey]
        
        // Smooth interpolation between sections
        const interpolatedPos = new THREE.Vector3().lerpVectors(
          new THREE.Vector3(...currentPos.position),
          new THREE.Vector3(...nextPos.position),
          sectionProgress
        )
        
        const interpolatedLookAt = new THREE.Vector3().lerpVectors(
          new THREE.Vector3(...currentPos.lookAt),
          new THREE.Vector3(...nextPos.lookAt),
          sectionProgress
        )
        
        targetPosition.current.copy(interpolatedPos)
        targetLookAt.current.copy(interpolatedLookAt)
      }
    }
  }, [scrollProgress, currentSection, camera])
  
  useFrame((state, delta) => {
    // Smooth camera movement with faster interpolation
    camera.position.lerp(targetPosition.current, delta * 2)
    
    // Smooth look at
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