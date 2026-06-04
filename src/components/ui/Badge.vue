<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default', // 'default' | 'secondary' | 'accent' | 'success'
    validator: (val) => ['default', 'secondary', 'accent', 'success'].includes(val)
  }
})

const classes = computed(() => {
  const base = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border select-none transition-colors duration-300'
  
  const variants = {
    default: 'bg-bg-tertiary text-text-secondary border-border-primary',
    secondary: 'bg-accent-primary/10 text-accent-primary border-accent-primary/20',
    accent: 'bg-accent-secondary/10 text-accent-secondary border-accent-secondary/20',
    success: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
  }
  
  return `${base} ${variants[props.variant]}`
})
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>
