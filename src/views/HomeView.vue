<script setup>
import { computed } from 'vue'
import { useTitle } from '@vueuse/core'
import { usePortfolioStore } from '../stores/portfolio'

// Import all sections of the homepage
import Hero from '../components/sections/Hero.vue'
import About from '../components/sections/About.vue'
import Skills from '../components/sections/Skills.vue'
import Projects from '../components/sections/Projects.vue'
import Experience from '../components/sections/Experience.vue'
import Certifications from '../components/sections/Certifications.vue'
import Contact from '../components/sections/Contact.vue'

const portfolioStore = usePortfolioStore()

// Bind document title to settings.json dynamically (fully localized SEO support)
const pageTitle = computed(() => portfolioStore.settings.title)
useTitle(pageTitle)
</script>

<template>
  <main class="w-full">
    <Hero />
    <About />
    <Skills />
    <Projects />
    <Experience />
    <Certifications />
    <Contact />
  </main>
</template>
