<script setup>
import { computed } from 'vue'
import { useThemeStore } from '../../stores/theme'
import { Sun, Moon } from 'lucide-vue-next'

const themeStore = useThemeStore()

const cycleTheme = () => {
  if (themeStore.theme === 'light') {
    themeStore.setTheme('dark')
  } else {
    themeStore.setTheme('light')
  }
}

const currentIcon = computed(() => {
  return themeStore.theme === 'light' ? Sun : Moon
})

const labelText = computed(() => {
  return `Switch theme (current: ${themeStore.theme})`
})
</script>

<template>
  <button
    @click="cycleTheme"
    class="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-all duration-300 border border-transparent hover:border-border-primary cursor-pointer active:scale-90"
    :aria-label="labelText"
    :title="labelText"
  >
    <Transition mode="out-in" enter-active-class="transition duration-200" enter-from-class="rotate-45 scale-75 opacity-0" enter-to-class="rotate-0 scale-100 opacity-100" leave-active-class="transition duration-200" leave-from-class="scale-100 opacity-100" leave-to-class="scale-75 opacity-0">
      <component :is="currentIcon" class="w-5 h-5" />
    </Transition>
  </button>
</template>
