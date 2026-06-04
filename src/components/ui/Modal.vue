<script setup>
import { onMounted, onUnmounted, watch } from 'vue'
import { useScrollLock } from '@vueuse/core'
import { X } from 'lucide-vue-next'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close'])

const isLocked = useScrollLock(document.body)

watch(() => props.show, (val) => {
  isLocked.value = val
})

const handleEscape = (e) => {
  if (e.key === 'Escape' && props.show) {
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape)
  isLocked.value = false // Ensure unlocked on destroy
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        @click.self="emit('close')"
        role="dialog"
        aria-modal="true"
      >
        <Transition
          enter-active-class="transition duration-300 ease-out delay-75"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div
            v-if="show"
            class="relative w-full max-w-2xl max-h-[85vh] flex flex-col bg-bg-secondary border border-border-primary rounded-2xl shadow-2xl overflow-hidden focus:outline-none"
            tabindex="-1"
          >
            <!-- Header -->
            <div class="flex items-center justify-between px-6 py-4 border-b border-border-primary">
              <h3 class="font-display font-semibold text-lg text-text-primary">
                {{ title }}
              </h3>
              <button
                @click="emit('close')"
                class="p-1 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X class="w-5 h-5" />
              </button>
            </div>
            
            <!-- Body (Scrollable) -->
            <div class="flex-1 overflow-y-auto p-6 scrollbar-thin">
              <slot />
            </div>
            
            <!-- Footer -->
            <div v-if="$slots.footer" class="px-6 py-4 border-t border-border-primary bg-bg-tertiary/30">
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Scrollbar support in body */
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: var(--border-secondary);
  border-radius: 3px;
}
</style>
