<script setup>
import { computed } from 'vue'
import { usePortfolioStore } from '../../stores/portfolio'
import { Github, Linkedin, Mail, MessageSquare, Instagram, Heart } from 'lucide-vue-next'

const portfolioStore = usePortfolioStore()
const currentYear = new Date().getFullYear()

// Map the Lucide icon names to their respective imported components
const iconMap = {
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  Instagram
}

const socials = computed(() => portfolioStore.socials)
const profile = computed(() => portfolioStore.profile)
</script>

<template>
  <footer class="w-full py-12 bg-bg-primary border-t border-border-primary">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <!-- Brand & Availability -->
        <div class="flex flex-col items-center md:items-start text-center md:text-left space-y-1">
          <p class="font-display font-bold text-lg text-text-primary">
            FR<span class="text-accent-primary">.</span>
          </p>
          <p class="text-xs text-text-secondary">
            &copy; {{ currentYear }} {{ profile.name }}. All rights reserved.
          </p>
        </div>

        <!-- Social Icons Links -->
        <div class="flex flex-col items-center md:items-end gap-3">
          <div class="flex items-center space-x-3">
            <a
              v-for="social in socials"
              :key="social.platform"
              :href="social.url"
              target="_blank"
              rel="noopener"
              class="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary border border-transparent hover:border-border-primary transition-all duration-300 cursor-pointer active:scale-95"
              :aria-label="`Visit my ${social.platform}`"
              :title="social.platform"
            >
              <component :is="iconMap[social.icon] || Mail" class="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
