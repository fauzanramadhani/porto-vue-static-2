<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost'
    validator: (val) => ['primary', 'secondary', 'outline', 'ghost'].includes(val)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'button'
  },
  href: {
    type: String,
    default: ''
  },
  target: {
    type: String,
    default: '_self'
  }
})

const isLink = computed(() => !!props.href)

const classes = computed(() => {
  const base = 'inline-flex items-center justify-center font-display font-medium text-sm rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 select-none px-5 py-2.5 cursor-pointer shadow-sm'
  
  const variants = {
    primary: 'bg-accent-primary text-white hover:bg-opacity-90 hover:shadow-lg hover:shadow-accent-primary/20 border border-transparent',
    secondary: 'bg-bg-tertiary text-text-primary hover:bg-opacity-80 border border-border-primary',
    outline: 'bg-transparent text-text-primary border border-border-secondary hover:bg-bg-tertiary hover:border-text-secondary',
    ghost: 'bg-transparent text-text-secondary hover:bg-bg-tertiary hover:text-text-primary border border-transparent shadow-none'
  }

  return `${base} ${variants[props.variant]}`
})
</script>

<template>
  <a
    v-if="isLink"
    v-bind="$attrs"
    :href="href"
    :target="target"
    :class="classes"
    :aria-disabled="disabled ? 'true' : undefined"
  >
    <slot />
  </a>
  <button
    v-else
    v-bind="$attrs"
    :type="type"
    :disabled="disabled"
    :class="classes"
  >
    <slot />
  </button>
</template>
