<script setup>
import { ref, computed } from 'vue'
import { usePortfolioStore } from '../../stores/portfolio'
import { useI18n } from 'vue-i18n'
import { resolveAsset } from '../../utils/assets'
import Card from '../ui/Card.vue'
import Badge from '../ui/Badge.vue'
import Button from '../ui/Button.vue'
import Modal from '../ui/Modal.vue'
import { ExternalLink, Github as GithubIcon, Lock, Calendar, Clock, Activity, Monitor } from 'lucide-vue-next'

const portfolioStore = usePortfolioStore()
const { locale } = useI18n()
const projects = computed(() => portfolioStore.projects)

// Helper function to translate localized properties in JavaScript safely
const translate = (val) => {
  if (!val) return ''
  if (typeof val === 'object' && val !== null) {
    return val[locale.value] || val.en || ''
  }
  return val
}

const selectedCategory = ref('all')
const activeProject = ref(null)
const isModalOpen = ref(false)

const categories = ['all', 'Web Apps', 'Mobile Apps', 'Backend Services']

const getCategoryLabelKey = (cat) => {
  if (cat === 'all') return 'projects.filter_all'
  if (cat === 'Web Apps') return 'projects.filter_web'
  if (cat === 'Mobile Apps') return 'projects.filter_mobile'
  if (cat === 'Backend Services') return 'projects.filter_backend'
  return cat
}

// Maps Bento grid layout styling classes based on project IDs to form a striking grid
const getBentoClasses = (id) => {
  const layouts = {
    1: 'col-span-1 md:col-span-2 row-span-1', // Gelora Printing (Large)
    2: 'col-span-1 row-span-1',              // Gelora Payment (Normal)
    3: 'col-span-1 row-span-1',              // Tokosuma Web (Normal)
    4: 'col-span-1 md:col-span-2 row-span-1', // Tokosuma Mobile (Large)
    5: 'col-span-1 row-span-1',              // Production Monitoring (Normal)
    6: 'col-span-1 row-span-1',              // Internal Operational Web (Normal)
    7: 'col-span-1 row-span-1',              // Employee Management HRIS (Normal)
    8: 'col-span-1 row-span-1',              // Digital Proposal System (Normal)
    9: 'col-span-1 md:col-span-2 row-span-1'  // Asset Management (Large)
  }
  return layouts[id] || 'col-span-1 row-span-1'
}

// Get custom decorative gradient coding backgrounds for project cards when no thumbnail exists
const getCardBgGradient = (id) => {
  const gradients = {
    1: 'from-blue-600/10 via-purple-600/5 to-transparent',
    2: 'from-emerald-600/10 via-teal-600/5 to-transparent',
    3: 'from-indigo-600/10 via-blue-600/5 to-transparent',
    4: 'from-purple-600/10 via-pink-600/5 to-transparent',
    5: 'from-amber-600/10 via-orange-600/5 to-transparent',
    6: 'from-slate-600/10 via-zinc-600/5 to-transparent',
    7: 'from-sky-600/10 via-cyan-600/5 to-transparent',
    8: 'from-rose-600/10 via-red-600/5 to-transparent',
    9: 'from-fuchsia-600/10 via-violet-600/5 to-transparent'
  }
  return gradients[id] || 'from-blue-600/10 to-transparent'
}

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'all') {
    return projects.value
  }
  return projects.value.filter(p => p.category === selectedCategory.value)
})

const openDetails = (project) => {
  activeProject.value = project
  isModalOpen.value = true
}

const closeDetails = () => {
  isModalOpen.value = false
}
</script>

<template>
  <section
    id="projects"
    class="py-24 bg-bg-secondary border-t border-border-primary relative overflow-hidden"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } }"
        class="text-center max-w-3xl mx-auto mb-16"
      >
        <h2 class="text-sm font-semibold tracking-wider text-accent-primary uppercase font-display mb-2">
          {{ $t('projects.title') }}
        </h2>
        <p class="text-3xl sm:text-4xl font-display font-extrabold text-text-primary tracking-tight">
          {{ $t('projects.subtitle') }}
        </p>
        <div class="w-12 h-1 bg-accent-primary mx-auto mt-4 rounded-full" />
      </div>

      <!-- Categories Filter Tabs -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 15 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut', delay: 100 } }"
        class="flex flex-wrap items-center justify-center gap-2 mb-12"
      >
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
          class="px-4 py-2 rounded-lg text-sm font-medium font-display transition-all duration-300 border cursor-pointer select-none focus:outline-none"
          :class="[
            selectedCategory === cat
              ? 'bg-accent-primary text-white border-transparent shadow-md'
              : 'bg-bg-secondary text-text-secondary border-border-primary hover:border-border-secondary hover:text-text-primary'
          ]"
        >
          {{ $t(getCategoryLabelKey(cat)) }}
        </button>
      </div>

      <!-- Bento Grid layout container -->
      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <TransitionGroup
          name="project-list"
          enter-active-class="transition duration-500 ease-out"
          enter-from-class="opacity-0 translate-y-12"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-300 ease-in absolute"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-12"
        >
          <div
            v-for="project in filteredProjects"
            :key="project.id"
            :class="[getBentoClasses(project.id), 'project-list-item']"
          >
            <Card
              :glow="true"
              :glass="true"
              @click="openDetails(project)"
              class="h-full flex flex-col group cursor-pointer border border-border-primary hover:border-border-secondary overflow-hidden relative"
            >
              <!-- Card visual banner -->
              <div class="relative h-48 w-full overflow-hidden border-b border-border-primary flex items-center justify-center bg-bg-primary">
                <!-- Custom Gradient Fallback pattern when there's no project icon/thumbnail -->
                <div 
                  class="absolute inset-0 bg-gradient-to-tr transition-transform duration-700 group-hover:scale-105"
                  :class="getCardBgGradient(project.id)"
                />
                
                <!-- Display image if thumbnail exists, else initials -->
                <img
                  v-if="project.thumbnail || project.image"
                  :src="resolveAsset(project.thumbnail || project.image)"
                  :alt="project.title"
                  class="relative z-10 w-20 h-20 object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div v-else class="relative z-10 flex flex-col items-center justify-center space-y-1">
                  <Monitor class="w-8 h-8 text-text-secondary opacity-60" />
                  <span class="font-display text-[10px] tracking-widest text-text-secondary uppercase">Codebase</span>
                </div>

                <!-- Category tag overlay -->
                <Badge variant="secondary" class="absolute top-4 left-4 z-20">
                  {{ project.category }}
                </Badge>
              </div>

              <!-- Card textual details -->
              <div class="p-6 flex-1 flex flex-col justify-between">
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <h3 class="font-display font-bold text-lg text-text-primary group-hover:text-accent-primary transition-colors">
                      {{ project.title }}
                    </h3>
                    <span class="text-xs text-text-secondary font-display font-medium">{{ project.year }}</span>
                  </div>
                  <p class="text-sm text-text-secondary line-clamp-2">
                    {{ translate(project.description) }}
                  </p>
                </div>

                <!-- Tech items footer tag list -->
                <div class="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-border-primary">
                  <span
                    v-for="tech in project.technologies?.slice(0, 3)"
                    :key="tech.name"
                    class="text-[10px] font-semibold font-display px-2 py-0.5 rounded bg-bg-tertiary text-text-secondary border border-border-primary"
                  >
                    {{ tech.name }}
                  </span>
                  <span 
                    v-if="project.technologies?.length > 3"
                    class="text-[10px] font-semibold font-display px-2 py-0.5 rounded bg-bg-tertiary text-text-secondary opacity-60"
                  >
                    +{{ project.technologies.length - 3 }}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </TransitionGroup>
      </div>
    </div>

    <!-- Reusable project details Modal -->
    <Modal
      :show="isModalOpen"
      :title="activeProject?.title || ''"
      @close="closeDetails"
    >
      <div v-if="activeProject" class="space-y-6">
        <!-- Banner container -->
        <div class="relative h-44 w-full rounded-xl overflow-hidden bg-bg-primary flex items-center justify-center border border-border-primary">
          <div class="absolute inset-0 bg-gradient-to-tr" :class="getCardBgGradient(activeProject.id)" />
          <img
            v-if="activeProject.image || activeProject.thumbnail"
            :src="resolveAsset(activeProject.image || activeProject.thumbnail)"
            :alt="activeProject.title"
            class="relative z-10 w-24 h-24 object-contain drop-shadow-lg"
          />
          <Monitor v-else class="relative z-10 w-12 h-12 text-text-secondary opacity-50" />
        </div>

        <!-- Layout info columns -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Main Details -->
          <div class="md:col-span-2 space-y-4">
            <h4 class="font-display font-bold text-text-primary border-b border-border-primary pb-2">
              {{ $t('projects.details_title') }}
            </h4>
            <!-- Scrollable detailed overview -->
            <div 
              class="text-sm text-text-secondary leading-relaxed space-y-3"
              v-html="translate(activeProject.overview)"
            />
          </div>

          <!-- Metadata Sidebar -->
          <div class="space-y-5 p-4 rounded-xl border border-border-primary bg-bg-primary/30">
            <!-- Timeline year -->
            <div class="flex items-center gap-3">
              <Calendar class="w-4.5 h-4.5 text-accent-primary" />
              <div>
                <span class="block text-[10px] text-text-secondary uppercase tracking-wider font-semibold">
                  {{ $t('projects.year') }}
                </span>
                <span class="text-xs font-semibold text-text-primary">{{ activeProject.year }}</span>
              </div>
            </div>

            <!-- Project status -->
            <div class="flex items-center gap-3">
              <Activity class="w-4.5 h-4.5 text-emerald-500" />
              <div>
                <span class="block text-[10px] text-text-secondary uppercase tracking-wider font-semibold">
                  {{ $t('projects.status') }}
                </span>
                <span class="text-xs font-semibold text-text-primary">{{ activeProject.status }}</span>
              </div>
            </div>

            <!-- Duration -->
            <div class="flex items-center gap-3">
              <Clock class="w-4.5 h-4.5 text-accent-secondary" />
              <div>
                <span class="block text-[10px] text-text-secondary uppercase tracking-wider font-semibold">
                  {{ $t('projects.duration') }}
                </span>
                <span class="text-xs font-semibold text-text-primary">{{ activeProject.duration }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Tech tags lists -->
        <div class="space-y-3">
          <h4 class="font-display font-bold text-text-primary text-sm">{{ $t('projects.technologies') }}</h4>
          <div class="flex flex-wrap gap-2">
            <div
              v-for="tech in activeProject.technologies"
              :key="tech.name"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-primary border border-border-primary"
            >
              <img
                v-if="tech.icon"
                :src="tech.icon"
                :alt="tech.name"
                class="w-4 h-4 object-contain"
                loading="lazy"
              />
              <span class="text-xs font-display font-medium text-text-primary">{{ tech.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Action URLs Buttons footer slot -->
      <template #footer>
        <div class="flex flex-wrap items-center justify-end gap-3 w-full">
          <Button
            v-if="activeProject?.links?.demo"
            variant="primary"
            :href="activeProject.links.demo"
            target="_blank"
          >
            <span>{{ $t('projects.view_demo') }}</span>
            <ExternalLink class="w-4 h-4 ml-1.5" />
          </Button>
          
          <Button
            v-if="activeProject?.links?.github"
            variant="outline"
            :href="activeProject.links.github"
            target="_blank"
          >
            <GithubIcon class="w-4 h-4 mr-1.5" />
            <span>{{ $t('projects.view_code') }}</span>
          </Button>
          <div
            v-else
            class="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-bg-tertiary text-text-secondary text-xs font-semibold font-display border border-border-primary"
          >
            <Lock class="w-3.5 h-3.5" />
            <span>{{ $t('projects.private_repo') }}</span>
          </div>
        </div>
      </template>
    </Modal>
  </section>
</template>

<style scoped>
.project-list-item {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.project-list-leave-active {
  position: absolute;
}
</style>
