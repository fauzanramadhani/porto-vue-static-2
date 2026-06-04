<script setup>
import { ref, computed, watch } from 'vue'
import { usePortfolioStore } from '../../stores/portfolio'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { resolveAsset } from '../../utils/assets'
import Card from '../ui/Card.vue'
import Badge from '../ui/Badge.vue'
import { Calendar, Briefcase } from 'lucide-vue-next'

const portfolioStore = usePortfolioStore()
const { experiences: rawExperiences } = storeToRefs(portfolioStore)
const { locale } = useI18n()

// Helper function to translate localized properties in JavaScript safely
// Evaluates locale.value in JavaScript (which guarantees correct reactive updates on refresh)
const translate = (val) => {
  if (!val) return ''
  if (typeof val === 'object' && val !== null) {
    return val[locale.value] || val.en || ''
  }
  return val
}

const experiences = computed(() => {
  if (!rawExperiences.value) return []
  // Sort experiences in reverse chronological order (latest first)
  return rawExperiences.value.slice().reverse()
})

const formatPeriod = (exp) => {
  const startMonthStr = translate(exp.startMonth)
  const endMonthStr = translate(exp.endMonth)
  const start = `${startMonthStr} ${exp.startYear}`
  const end = exp.isCurrent ? 'Present' : `${endMonthStr} ${exp.endYear}`
  return { start, end }
}

const activeLightboxImage = ref(null)
const activeLightboxTitle = ref('')

const openLightbox = (imgUrl, title) => {
  activeLightboxImage.value = imgUrl
  activeLightboxTitle.value = title
}

const closeLightbox = () => {
  activeLightboxImage.value = null
  activeLightboxTitle.value = null
}

watch(activeLightboxImage, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <section
    id="experience"
    class="py-24 bg-bg-primary border-t border-border-primary relative overflow-hidden"
  >
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header (uses standard CSS or motion if working) -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } }"
        class="text-center max-w-3xl mx-auto mb-20"
      >
        <h2 class="text-sm font-semibold tracking-wider text-accent-primary uppercase font-display mb-2">
          {{ $t('experience.title') }}
        </h2>
        <p class="text-3xl sm:text-4xl font-display font-extrabold text-text-primary tracking-tight">
          {{ $t('experience.subtitle') }}
        </p>
        <div class="w-12 h-1 bg-accent-primary mx-auto mt-4 rounded-full" />
      </div>

      <!-- Timeline Rail Grid -->
      <div class="relative border-l-2 border-border-primary ml-4 md:ml-32 space-y-12">
        <!-- 
          Note: v-motion inside v-for loops has a known initialization bug on initial page mount 
          where elements are left at opacity: 0. We resolved this by using a lightweight 
          CSS fadeInUp animation class with custom transition delays.
        -->
        <div
          v-for="(exp, index) in experiences"
          :key="exp.id"
          class="relative pl-8 md:pl-12 opacity-0 animate-fade-in-up"
          :style="{ animationDelay: `${index * 150}ms` }"
        >
          <!-- Timeline Marker Circle (Logo or Icon) -->
          <div
            class="absolute -left-6.5 top-1.5 w-12 h-12 rounded-full border flex items-center justify-center overflow-hidden bg-bg-secondary transition-all duration-300 z-10"
            :class="[
              exp.isCurrent
                ? 'border-emerald-500 ring-4 ring-emerald-500/10 shadow-lg shadow-emerald-500/20'
                : 'border-border-primary group-hover:border-accent-primary',
              exp.logoUrl ? 'cursor-zoom-in' : ''
            ]"
            @click="exp.logoUrl ? openLightbox(resolveAsset(exp.logoUrl), exp.company) : null"
            :title="exp.logoUrl ? 'Click to enlarge logo' : ''"
          >
            <img
              v-if="exp.logoUrl"
              :src="resolveAsset(exp.logoUrl)"
              :alt="exp.company"
              class="w-full h-full object-contain p-1.5"
              loading="lazy"
            />
            <Briefcase v-else class="w-5 h-5 text-text-secondary" />
          </div>

          <!-- Date label shown on the left of rail for desktop, or inside the card for mobile -->
          <div class="hidden md:block absolute -left-36 top-4 w-28 text-right pr-6">
            <span class="block text-xs font-display font-bold text-text-primary">
              {{ formatPeriod(exp).end === 'Present' ? $t('experience.present') : formatPeriod(exp).end }}
            </span>
            <span class="block text-[10px] text-text-secondary font-medium tracking-wide mt-1">
              {{ formatPeriod(exp).start }}
            </span>
          </div>

          <!-- Experience description Card -->
          <Card
            :glow="true"
            :glass="exp.isCurrent"
            class="p-6 md:p-8"
            :class="[
              exp.isCurrent
                ? 'border-emerald-500/30 dark:border-emerald-500/20 bg-bg-secondary'
                : 'border-border-primary'
            ]"
          >
            <!-- Header section of experience -->
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
              <div>
                <!-- Current status badge overlay -->
                <div class="flex items-center gap-2 flex-wrap">
                  <h3 class="font-display font-extrabold text-lg text-text-primary">
                    {{ translate(exp.position) }}
                  </h3>
                  <Badge v-if="exp.isCurrent" variant="success" class="text-[9px] uppercase tracking-widest font-semibold px-2 py-0.5">
                    {{ $t('experience.present') }}
                  </Badge>
                </div>
                <p class="text-sm font-semibold text-accent-primary font-display mt-0.5">
                  {{ exp.company }}
                </p>
              </div>

              <!-- Mobile Date view (hidden on desktop) -->
              <div class="flex items-center gap-1.5 md:hidden text-text-secondary text-xs font-display font-medium mt-1">
                <Calendar class="w-3.5 h-3.5" />
                <span>{{ formatPeriod(exp).start }} &mdash; {{ formatPeriod(exp).end === 'Present' ? $t('experience.present') : formatPeriod(exp).end }}</span>
              </div>
            </div>

            <!-- Bullet point lists of experience achievements -->
            <ul class="space-y-2.5 text-sm text-text-secondary font-sans list-disc pl-5">
              <li
                v-for="(bullet, bIdx) in translate(exp.description)"
                :key="bIdx"
                class="leading-relaxed"
              >
                {{ bullet }}
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal for Company Logo -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="activeLightboxImage"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 cursor-zoom-out"
        @click="closeLightbox"
      >
        <div class="relative max-w-md w-full flex flex-col items-center" @click.stop>
          <!-- Close button -->
          <button 
            @click="closeLightbox" 
            class="absolute -top-12 right-0 text-white hover:text-accent-primary transition-colors text-sm font-semibold select-none flex items-center gap-1 cursor-pointer"
          >
            <span>Close</span>
            <span class="text-lg">&times;</span>
          </button>
          
          <!-- Image frame -->
          <div class="bg-bg-secondary p-8 rounded-2xl border border-border-primary shadow-2xl flex items-center justify-center max-h-[70vh] max-w-full">
            <img 
              :src="activeLightboxImage" 
              :alt="activeLightboxTitle" 
              class="max-w-full max-h-[50vh] object-contain rounded-lg"
            />
          </div>
          
          <!-- Caption -->
          <p class="mt-4 text-white font-display font-bold text-lg text-center tracking-wide">
            {{ activeLightboxTitle }}
          </p>
        </div>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
