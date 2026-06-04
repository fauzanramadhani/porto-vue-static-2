<script setup>
import { computed } from 'vue'
import { useLangStore } from '../../stores/lang'
import { Languages } from 'lucide-vue-next'

const langStore = useLangStore()

const toggleLang = () => {
  const nextLang = langStore.currentLang === 'en' ? 'id' : 'en'
  langStore.setLang(nextLang)
}

const displayLang = computed(() => {
  return langStore.currentLang.toUpperCase()
})
</script>

<template>
  <button
    @click="toggleLang"
    class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-all duration-300 border border-transparent hover:border-border-primary cursor-pointer active:scale-95 text-xs font-semibold font-display"
    aria-label="Toggle language"
  >
    <Languages class="w-4 h-4" />
    <span>{{ displayLang }}</span>
  </button>
</template>
