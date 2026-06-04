<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useLoop } from '@tresjs/core'
import * as THREE from 'three'

const meshRef = ref(null)
const particlesRef = ref(null)

// Mouse tracking with interpolation coordinates
const mouse = { x: 0, y: 0 }
const targetPosition = { x: 0, y: 0 }
const currentPosition = { x: 0, y: 0 }

const handleMouseMove = (e) => {
  // Normalize coordinates: [-1, 1]
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})

// Custom GLSL Shader for the morphing glass orb
const vertexShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vNormal = normal;
    vPosition = position;
    
    // Morphing deformation with slightly smaller displacement
    float displacement = sin(position.x * 3.0 + uTime * 1.2) * 0.08 +
                         cos(position.y * 2.5 + uTime * 1.5) * 0.08 +
                         sin(position.z * 3.2 + uTime * 1.0) * 0.08;
                         
    vec3 newPosition = position + normal * displacement;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(cameraPosition - vPosition);
    
    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
    
    vec3 colorA = vec3(0.15, 0.45, 0.95);
    vec3 colorB = vec3(0.55, 0.25, 0.95);
    
    vec3 baseColor = mix(colorA, colorB, sin(vPosition.y + uTime * 0.5) * 0.5 + 0.5);
    vec3 finalColor = baseColor + vec3(fresnel * 0.7);
    float alpha = mix(0.12, 0.75, fresnel);
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`

const uniforms = {
  uTime: { value: 0 }
}

// Tighten particle field dispersion boundaries to prevent edge-cropping
const particleCount = 180
const particlePositions = new Float32Array(particleCount * 3)
for (let i = 0; i < particleCount * 3; i += 3) {
  particlePositions[i] = (Math.random() - 0.5) * 4.5
  particlePositions[i + 1] = (Math.random() - 0.5) * 3.5
  particlePositions[i + 2] = (Math.random() - 0.5) * 2.5
}

// Frame loop using TresJS useLoop composable
const { onBeforeRender } = useLoop()

onBeforeRender(({ delta }) => {
  uniforms.uTime.value += delta * 0.8

  // Interactive mouse parallax damping (reduced amplitude to stay in-bounds)
  targetPosition.x = mouse.x * 0.35
  targetPosition.y = mouse.y * 0.25
  
  currentPosition.x += (targetPosition.x - currentPosition.x) * 0.05
  currentPosition.y += (targetPosition.y - currentPosition.y) * 0.05

  if (meshRef.value) {
    meshRef.value.rotation.y += delta * 0.15
    meshRef.value.rotation.x += delta * 0.08
    
    meshRef.value.position.x = currentPosition.x
    meshRef.value.position.y = currentPosition.y
  }
  
  if (particlesRef.value) {
    particlesRef.value.rotation.y += delta * 0.02
    particlesRef.value.rotation.x += delta * 0.01
    
    particlesRef.value.position.x = currentPosition.x * 0.3
    particlesRef.value.position.y = currentPosition.y * 0.3
  }
})
</script>

<template>
  <!-- Main Morphing Orb (Slightly smaller radius of 1.15 to prevent boundary clipping) -->
  <TresMesh ref="meshRef" :position="[0, 0, 0]">
    <TresSphereGeometry :args="[1.15, 64, 64]" />
    <TresShaderMaterial
      :vertex-shader="vertexShader"
      :fragment-shader="fragmentShader"
      :uniforms="uniforms"
      :transparent="true"
      :depth-write="false"
      :side="THREE.DoubleSide"
    />
  </TresMesh>

  <!-- Particle Field (Stars/Clouds) -->
  <TresPoints ref="particlesRef">
    <TresBufferGeometry>
      <TresBufferAttribute
        attach="attributes-position"
        :args="[particlePositions, 3]"
      />
    </TresBufferGeometry>
    <TresPointsMaterial
      :size="0.035"
      :size-attenuation="true"
      color="#3B82F6"
      :transparent="true"
      :opacity="0.5"
      :depth-write="false"
      :blending="THREE.AdditiveBlending"
    />
  </TresPoints>
</template>
