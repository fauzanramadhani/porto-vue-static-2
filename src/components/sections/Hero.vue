<script setup>
import { computed } from 'vue'
import { usePortfolioStore } from '../../stores/portfolio'
import HeroCanvas from '../three/HeroCanvas.vue'
import Button from '../ui/Button.vue'
import { ArrowRight, MessageSquare, ChevronDown } from 'lucide-vue-next'

const portfolioStore = usePortfolioStore()
const profile = computed(() => portfolioStore.profile)

const handleScrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <section
    id="home"
    class="relative min-h-screen w-full flex items-center justify-center pt-24 pb-24 md:pb-16 overflow-hidden bg-bg-primary"
  >
    <!-- Background Ambient Glows -->
    <div class="absolute top-[10%] left-[5%] w-72 h-72 rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-3xl" />
    <div class="absolute bottom-[10%] right-[5%] w-96 h-96 rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-3xl" />

    <div class="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center z-10 pb-12 md:pb-0">
      <!-- Text details -->
      <div
        v-motion
        :initial="{ opacity: 0, x: -30 }"
        :enter="{ opacity: 1, x: 0, transition: { duration: 800, ease: 'easeOut' } }"
        class="flex flex-col space-y-6 text-center md:text-left order-2 md:order-1"
      >
        <div class="space-y-3">
          <p class="text-sm font-semibold tracking-wider text-accent-primary uppercase font-display">
            {{ $t('hero.subtagline') }}
          </p>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-text-primary leading-tight">
            {{ profile.name }}
          </h1>
          <p class="text-xl sm:text-2xl font-display font-medium text-text-secondary">
            {{ $t('hero.tagline') }}
          </p>
        </div>

        <p class="text-base sm:text-lg text-text-secondary max-w-lg mx-auto md:mx-0">
          {{ $t('hero.intro') }}
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-wrap items-center justify-center md:justify-start gap-4">
          <Button
            variant="primary"
            @click="handleScrollTo('projects')"
          >
            <span>{{ $t('hero.cta_projects') }}</span>
            <ArrowRight class="w-4.5 h-4.5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
          <Button
            variant="outline"
            @click="handleScrollTo('contact')"
          >
            <span>{{ $t('hero.cta_contact') }}</span>
            <MessageSquare class="w-4.5 h-4.5 ml-2" />
          </Button>
        </div>
      </div>

      <!-- 3D Scene canvas container -->
      <div
        v-motion
        :initial="{ opacity: 0, scale: 0.9 }"
        :enter="{ opacity: 1, scale: 1, transition: { duration: 1000, ease: 'easeOut', delay: 200 } }"
        class="flex items-center justify-center order-1 md:order-2"
      >
        <HeroCanvas />
      </div>
    </div>

    <!-- Scroll Down Icon -->
    <div
      v-motion
      :initial="{ opacity: 0, y: -10 }"
      :enter="{ opacity: 1, y: 0, transition: { repeat: Infinity, duration: 2000, ease: 'easeInOut' } }"
      class="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-1 z-10"
      @click="handleScrollTo('about')"
    >
      <span class="text-[10px] uppercase tracking-widest text-text-secondary font-semibold font-display">Scroll</span>
      <ChevronDown class="w-4.5 h-4.5 text-text-secondary" />
    </div>
  </section>
</template>

<style scoped>
/* Minor animation tweak for buttons if needed */
.group-hover\:translate-x-1 {
  transition: transform 0.2s ease;
}
</style>
