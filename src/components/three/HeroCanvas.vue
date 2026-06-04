<script setup>
import { ref, onMounted } from 'vue'
import InteractiveOrb from './InteractiveOrb.vue'

const isWebGLSupported = ref(true)
const isLoading = ref(true)

const checkWebGLSupport = () => {
  try {
    const canvas = document.createElement('canvas')
    const supported = !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
    isWebGLSupported.value = supported
  } catch (e) {
    isWebGLSupported.value = false
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  checkWebGLSupport()
})
</script>

<template>
  <div class="relative w-full h-[320px] md:h-[450px] flex items-center justify-center select-none overflow-hidden">
    <!-- WebGL Canvas Loading state -->
    <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center">
      <div class="w-8 h-8 rounded-full border-2 border-border-secondary border-t-accent-primary animate-spin" />
    </div>

    <!-- WebGL Rendering Canvas -->
    <div v-else-if="isWebGLSupported" class="w-full h-full opacity-0 animate-fade-in">
      <TresCanvas
        alpha
        :clear-color="0x000000"
        :clear-alpha="0"
        power-preference="high-performance"
      >
        <TresPerspectiveCamera :position="[0, 0, 5.2]" :fov="45" />
        <TresAmbientLight :intensity="1.5" />
        <TresDirectionalLight :position="[2, 3, 2]" :intensity="1" />
        
        <InteractiveOrb />
      </TresCanvas>
    </div>

    <!-- Graceful Fallback: 2D Animated Glowing Gradient Orb -->
    <div
      v-else
      class="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center opacity-0 animate-fade-in"
    >
      <!-- Background glow blur -->
      <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/30 to-purple-500/30 blur-3xl animate-pulse-slow" />
      
      <!-- Central gradient glass sphere -->
      <div class="w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-tr from-blue-600/10 via-purple-600/20 to-pink-600/10 border border-white/20 dark:border-white/5 backdrop-blur-xl shadow-xl flex items-center justify-center animate-float">
        <!-- Inner core glow -->
        <div class="w-24 h-24 md:w-36 md:h-36 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-xl opacity-80" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>
