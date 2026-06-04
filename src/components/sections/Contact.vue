<script setup>
import { computed, ref } from 'vue'
import { usePortfolioStore } from '../../stores/portfolio'
import { useClipboard } from '@vueuse/core'
import Card from '../ui/Card.vue'
import Button from '../ui/Button.vue'
import { Mail, MessageSquare, Copy, Check, ExternalLink, Github, Linkedin, Instagram, Share2 } from 'lucide-vue-next'

const portfolioStore = usePortfolioStore()
const profile = computed(() => portfolioStore.profile)
const socials = computed(() => portfolioStore.socials)

// Find specific platforms for CTA integration
const emailLink = computed(() => socials.value.find(s => s.platform.toLowerCase() === 'email')?.url || 'mailto:fauzanramadhani06@gmail.com')
const whatsappLink = computed(() => socials.value.find(s => s.platform.toLowerCase() === 'whatsapp')?.url || 'https://wa.me/6282260012008')

// Filter out Email and WhatsApp from socials list for the social card
const filteredSocials = computed(() => {
  return socials.value.filter(s => {
    const platform = s.platform.toLowerCase()
    return platform !== 'email' && platform !== 'whatsapp'
  })
})

// Clipboard support
const emailAddress = 'fauzanramadhani06@gmail.com'
const { copy, copied } = useClipboard({ source: emailAddress })

const iconMap = {
  Github,
  Linkedin,
  Instagram,
  Mail,
  MessageSquare
}
</script>

<template>
  <section id="contact" class="py-24 bg-bg-primary border-t border-border-primary relative overflow-hidden">
    <!-- Background Ambient Gradients -->
    <div class="absolute bottom-0 left-[20%] w-96 h-96 rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-3xl" />

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div v-motion :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } }"
        class="text-center max-w-3xl mx-auto mb-12">
        <h2 class="text-sm font-semibold tracking-wider text-accent-primary uppercase font-display mb-2">
          {{ $t('contact.title') }}
        </h2>
        <p class="text-3xl sm:text-4xl font-display font-extrabold text-text-primary tracking-tight">
          {{ $t('contact.subtitle') }}
        </p>
        <div class="w-12 h-1 bg-accent-primary mx-auto mt-4 rounded-full" />
      </div>

      <!-- Section Description & Online Status Badge (Centered) -->
      <div v-motion :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut', delay: 100 } }"
        class="flex flex-col items-center text-center max-w-2xl mx-auto mb-16 space-y-6">
        <p class="text-base sm:text-lg text-text-secondary leading-relaxed">
          {{ $t('contact.description') }}
        </p>
        
        <!-- Availability Light Indicator -->
        <div
          class="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-sm shadow-emerald-500/5">
          <span class="relative flex h-2 w-2">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span class="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-display leading-none">
            {{ $t('contact.status_online') }}
          </span>
        </div>
      </div>

      <!-- Three-Card Contact Grid -->
      <div v-motion :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut', delay: 200 } }"
        class="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        
        <!-- Card 1: Email Card -->
        <Card :glow="true" class="border border-border-primary">
          <div class="p-6 md:p-8 flex flex-col gap-6 w-full h-full justify-between">
            <div class="flex items-center gap-4 text-left">
              <div
                class="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary flex-shrink-0">
                <Mail class="w-6 h-6" />
              </div>
              <div class="min-w-0 flex-1">
                <span
                  class="block text-[10px] text-text-secondary uppercase tracking-widest font-semibold font-display">Email Address</span>
                <span class="font-mono font-medium text-sm sm:text-base text-text-primary block mt-0.5 break-all sm:break-normal truncate" :title="emailAddress">{{ emailAddress }}</span>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row items-center gap-2 w-full mt-auto">
              <!-- Copy button -->
              <Button variant="outline" @click="copy()"
                class="flex-1 w-full text-xs px-3.5 py-2 cursor-pointer select-none">
                <Transition mode="out-in">
                  <span v-if="copied" class="flex items-center justify-center gap-1.5 text-emerald-500">
                    <Check class="w-4 h-4" />
                    <span>{{ $t('contact.email_copied') }}</span>
                  </span>
                  <span v-else class="flex items-center justify-center gap-1.5">
                    <Copy class="w-4 h-4" />
                    <span>{{ $t('contact.copy_email') }}</span>
                  </span>
                </Transition>
              </Button>

              <!-- Direct Email button -->
              <Button variant="primary" :href="emailLink" target="_blank"
                class="w-full sm:w-auto text-xs px-3.5 py-2 cursor-pointer select-none">
                <ExternalLink class="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        <!-- Card 2: WhatsApp Card -->
        <Card :glow="true" class="border border-border-primary">
          <div class="p-6 md:p-8 flex flex-col gap-6 w-full h-full justify-between">
            <div class="flex items-center gap-4 text-left">
              <div class="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 flex-shrink-0">
                <MessageSquare class="w-6 h-6" />
              </div>
              <div>
                <span
                  class="block text-[10px] text-text-secondary uppercase tracking-widest font-semibold font-display">WhatsApp Chat</span>
                <span class="font-display font-semibold text-text-primary text-sm sm:text-base block mt-0.5">Quick Messaging</span>
              </div>
            </div>

            <Button variant="primary" :href="whatsappLink" target="_blank"
              class="w-full text-xs px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 hover:shadow-emerald-500/20 cursor-pointer shadow-sm select-none mt-auto">
              <span>{{ $t('contact.whatsapp_quick') }}</span>
              <ExternalLink class="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
        </Card>

        <!-- Card 3: Social Media Card -->
        <Card :glow="true" class="border border-border-primary">
          <div class="p-6 md:p-8 flex flex-col gap-6 w-full h-full justify-between">
            <div class="flex items-center gap-4 text-left">
              <div class="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 flex-shrink-0">
                <Share2 class="w-6 h-6" />
              </div>
              <div>
                <span
                  class="block text-[10px] text-text-secondary uppercase tracking-widest font-semibold font-display">Social Media</span>
                <span class="font-display font-semibold text-text-primary text-sm sm:text-base block mt-0.5">Professional Networks</span>
              </div>
            </div>

            <!-- Social links inside card -->
            <div class="grid grid-cols-3 gap-2 w-full mt-auto">
              <a v-for="social in filteredSocials" :key="social.platform" :href="social.url" target="_blank" rel="noopener"
                class="p-2.5 rounded-lg border border-border-primary bg-bg-secondary hover:bg-bg-tertiary flex flex-col items-center justify-center text-center gap-1 group transition-all duration-300 cursor-pointer active:scale-95 shadow-sm"
                :aria-label="`Visit my ${social.platform}`">
                <div
                  class="w-8 h-8 rounded-md bg-bg-primary group-hover:bg-bg-secondary flex items-center justify-center border border-border-primary text-text-secondary group-hover:text-accent-primary transition-all duration-300">
                  <component :is="iconMap[social.icon] || Mail" class="w-4 h-4" />
                </div>
                <span
                  class="text-[10px] font-semibold font-display text-text-primary group-hover:text-accent-primary transition-colors duration-300">
                  {{ social.platform }}
                </span>
              </a>
            </div>
          </div>
        </Card>
        
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Scoped adjustments */
</style>
