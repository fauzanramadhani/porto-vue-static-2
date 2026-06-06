<script setup>
import { useTitle } from '@vueuse/core'
import { ArrowLeft } from 'lucide-vue-next'
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'

useTitle('404 — Page Not Found')
</script>

<template>
  <div class="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-bg-primary px-4 select-none">
    <!-- Ambient background glows -->
    <div class="absolute top-[20%] left-[10%] w-72 h-72 rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-3xl pointer-events-none" />
    <div class="absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-3xl pointer-events-none" />

    <div class="max-w-md w-full relative z-10">
      <Card :glow="true" :glass="true" :hoverEffect="false" class="p-8 sm:p-10 text-center border-border-primary">
        <div class="flex flex-col items-center space-y-6">
          <!-- Big 404 Text with Gradient and Subtle Glow -->
          <div class="relative">
            <h1 class="text-8xl sm:text-9xl font-display font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary select-none">
              404
            </h1>
            <div class="absolute inset-0 blur-2xl opacity-20 bg-gradient-to-r from-accent-primary to-accent-secondary select-none pointer-events-none">
              404
            </div>
          </div>

          <div class="w-12 h-1 bg-accent-primary rounded-full" />

          <!-- Error Details -->
          <div class="space-y-3">
            <h2 class="text-xl sm:text-2xl font-display font-extrabold text-text-primary">
              {{ $t('notFound.title') }}
            </h2>
            <p class="text-sm text-text-secondary leading-relaxed">
              {{ $t('notFound.description') }}
            </p>
          </div>

          <!-- Return button -->
          <div class="pt-4 w-full">
            <Button
              variant="primary"
              href="/"
              class="w-full justify-center gap-2 group py-3"
            >
              <ArrowLeft class="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              <span>{{ $t('notFound.back_home') }}</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>
