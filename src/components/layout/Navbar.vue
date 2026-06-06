<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useWindowScroll } from '@vueuse/core'
import { Menu, X } from 'lucide-vue-next'
import ThemeToggle from '../ui/ThemeToggle.vue'
import LangSwitcher from '../ui/LangSwitcher.vue'

const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > 20)
const activeSection = ref('home')
const isMobileMenuOpen = ref(false)

const route = useRoute()
const isNotFound = computed(() => route.name === 'not-found')

const navLinks = [
  { id: 'home', key: 'nav.home' },
  { id: 'about', key: 'nav.about' },
  { id: 'skills', key: 'nav.skills' },
  { id: 'projects', key: 'nav.projects' },
  { id: 'experience', key: 'nav.experience' },
  { id: 'certifications', key: 'nav.certifications' },
  { id: 'contact', key: 'nav.contact' }
]

// Watch the scroll position to update the active nav tab automatically
watch(y, (newY) => {
  // If at bottom, force select Contact
  const isBottom = window.innerHeight + newY >= document.documentElement.scrollHeight - 80
  if (isBottom) {
    activeSection.value = 'contact'
    return
  }

  // Determine active section based on current viewport offsets
  const scrollPosition = newY + 200 // offset trigger point

  for (const link of navLinks) {
    const el = document.getElementById(link.id)
    if (el) {
      const top = el.offsetTop
      const height = el.offsetHeight
      if (scrollPosition >= top && scrollPosition < top + height) {
        activeSection.value = link.id
      }
    }
  }
})

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleLinkClick = (id) => {
  closeMobileMenu()
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    activeSection.value = id
  }
}
</script>

<template>
  <header class="fixed top-0 left-0 w-full z-40">
    <!-- Main Navbar Bar Container -->
    <div class="relative z-50 transition-all duration-300" :class="[
      isScrolled || isMobileMenuOpen
        ? 'py-3 glass-navbar shadow-sm'
        : 'py-5 bg-transparent border-b border-transparent'
    ]">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <!-- Logo -->
        <a v-if="!isNotFound" href="#home" @click.prevent="handleLinkClick('home')"
          class="font-display font-bold text-xl tracking-tight text-text-primary focus-visible:outline-none cursor-pointer">
          FR<span class="text-accent-primary">.</span>
        </a>

        <!-- Desktop Nav Navigation -->
        <nav v-if="!isNotFound" class="hidden md:flex items-center space-x-1 lg:space-x-2">
          <a v-for="link in navLinks" :key="link.id" :href="`#${link.id}`" @click.prevent="handleLinkClick(link.id)"
            class="relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer select-none font-display focus-visible:outline-none"
            :class="[
              activeSection === link.id
                ? 'text-accent-primary'
                : 'text-text-secondary hover:text-text-primary'
            ]">
            {{ $t(link.key) }}
            <!-- Active dot indicator -->
            <span v-if="activeSection === link.id"
              class="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-primary" />
          </a>
        </nav>

        <!-- Desktop Utilities -->
        <div v-if="!isNotFound" class="hidden md:flex items-center space-x-3">
          <LangSwitcher />
          <ThemeToggle />
        </div>

        <!-- Mobile Menu Button -->
        <div v-if="!isNotFound" class="flex items-center space-x-3 md:hidden">
          <LangSwitcher />
          <ThemeToggle />
          <button @click="toggleMobileMenu"
            class="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary focus:outline-none cursor-pointer"
            :aria-expanded="isMobileMenuOpen" aria-label="Toggle navigation menu">
            <X v-if="isMobileMenuOpen" class="w-6 h-6" />
            <Menu v-else class="w-6 h-6" />
          </button>
        </div>

        <!-- NotFound Utilities (Only visible on 404 page, aligned to the right) -->
        <div v-if="isNotFound" class="flex items-center space-x-3 ml-auto">
          <LangSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="-translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100" leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100" leave-to-class="-translate-y-full opacity-0">
      <div v-if="isMobileMenuOpen"
        class="absolute top-full left-0 w-full bg-bg-secondary border-b border-border-primary py-4 px-6 md:hidden shadow-lg flex flex-col space-y-2 z-30">
        <a v-for="link in navLinks" :key="link.id" :href="`#${link.id}`" @click.prevent="handleLinkClick(link.id)"
          class="px-4 py-3 rounded-lg text-base font-medium font-display transition-colors" :class="[
            activeSection === link.id
              ? 'text-accent-primary bg-accent-primary/5'
              : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
          ]">
          {{ $t(link.key) }}
        </a>
      </div>
    </Transition>
  </header>
</template>
