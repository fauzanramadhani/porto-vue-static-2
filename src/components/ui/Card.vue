<script setup>
import { ref } from 'vue'

const props = defineProps({
  glow: {
    type: Boolean,
    default: true
  },
  glass: {
    type: Boolean,
    default: false
  },
  hoverEffect: {
    type: Boolean,
    default: true
  }
})

const cardRef = ref(null)

const handleMouseMove = (e) => {
  if (!props.glow || !cardRef.value) return
  const rect = cardRef.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  cardRef.value.style.setProperty('--mouse-x', `${x}px`)
  cardRef.value.style.setProperty('--mouse-y', `${y}px`)
}
</script>

<template>
  <div
    ref="cardRef"
    @mousemove="handleMouseMove"
    class="relative rounded-xl border transition-all duration-300 overflow-hidden"
    :class="[
      glass ? 'glass-panel' : 'bg-bg-secondary border-border-primary',
      glow ? 'glow-card' : '',
      hoverEffect ? 'hover:-translate-y-1 hover:shadow-lg hover:border-border-secondary' : ''
    ]"
  >
    <div class="relative z-10 h-full w-full">
      <slot />
    </div>
  </div>
</template>

<style scoped>
/* Scoped styles are not strictly needed since styles are defined in theme.css, 
   but this ensures encapsulation for card-specific needs if any. */
</style>
