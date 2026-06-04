<script setup>
import { computed } from 'vue'
import { usePortfolioStore } from '../../stores/portfolio'
import { resolveAsset } from '../../utils/assets'
import { Terminal } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const portfolioStore = usePortfolioStore()
const { locale } = useI18n()

// Helper function to translate localized properties in JavaScript safely
const translate = (val) => {
  if (!val) return ''
  if (typeof val === 'object' && val !== null) {
    return val[locale.value] || val.en || ''
  }
  return val
}

const profile = computed(() => portfolioStore.profile)
const about = computed(() => portfolioStore.about)
</script>

<template>
  <section id="about" class="py-24 bg-bg-secondary border-t border-border-primary relative overflow-hidden">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div v-motion :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } }"
        class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-sm font-semibold tracking-wider text-accent-primary uppercase font-display mb-2">
          {{ $t('about.title') }}
        </h2>
        <p class="text-3xl sm:text-4xl font-display font-extrabold text-text-primary tracking-tight">
          {{ $t('about.subtitle') }}
        </p>
        <div class="w-12 h-1 bg-accent-primary mx-auto mt-4 rounded-full" />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <!-- Left Side: Profile -->
        <div v-motion :initial="{ opacity: 0, x: -30 }"
          :enter="{ opacity: 1, x: 0, transition: { duration: 800, ease: 'easeOut', delay: 100 } }"
          class="lg:col-span-5 flex flex-col items-center">
          <!-- Profile image container with glowing effects -->
          <div
            class="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden group shadow-xl border border-border-secondary">
            <!-- Glowing background border -->
            <div
              class="absolute inset-0 bg-gradient-to-tr from-accent-primary to-accent-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10" />
            <img :src="resolveAsset(profile.profilePhotoUrl)" :alt="profile.name"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy" />
          </div>
        </div>

        <!-- Right Side: Narrative and Philosophy -->
        <div v-motion :initial="{ opacity: 0, x: 30 }"
          :enter="{ opacity: 1, x: 0, transition: { duration: 800, ease: 'easeOut', delay: 200 } }"
          class="lg:col-span-7 flex flex-col space-y-6 text-text-secondary leading-relaxed">
          <!-- Bio Paragraphs (split by newline for readable format) -->
          <div class="space-y-4">
            <p v-for="(p, index) in translate(about.aboutText)?.split('\n\n')" :key="index"
              class="text-base sm:text-lg">
              {{ p }}
            </p>
          </div>

          <!-- Developer Philosophy Panel -->
          <div class="p-6 rounded-xl border border-border-primary bg-bg-primary/50 relative overflow-hidden">
            <div class="absolute -right-4 -bottom-4 opacity-5 text-text-primary">
              <Terminal class="w-32 h-32" />
            </div>

            <h4 class="font-display font-bold text-text-primary text-base mb-2 flex items-center gap-2">
              <Terminal class="w-4.5 h-4.5 text-accent-primary" />
              <span>{{ $t('about.philosophy_title') }}</span>
            </h4>
            <p class="text-sm font-sans italic">
              "{{ $t('about.philosophy_text') }}"
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
