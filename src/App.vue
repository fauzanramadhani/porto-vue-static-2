<script setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeStore } from './stores/theme'
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'

const themeStore = useThemeStore()
const route = useRoute()
const isNotFound = computed(() => route.name === 'not-found')

onMounted(() => {
  themeStore.initTheme()
})
</script>

<template>
  <div class="min-h-screen bg-bg-primary text-text-primary selection:bg-accent-primary/20 selection:text-accent-primary flex flex-col justify-between overflow-x-hidden">
    <!-- Main Floating Header -->
    <Navbar v-if="!isNotFound" />
    
    <!-- Main content view grid -->
    <div class="flex-1 w-full">
      <RouterView v-slot="{ Component }">
        <Transition name="layout-transition" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>
    
    <!-- Footer -->
    <Footer />
  </div>
</template>

<style>
/* Global resets or base utility styling can go here if needed */
</style>
