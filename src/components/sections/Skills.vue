<script setup>
import { ref, computed } from 'vue'
import { usePortfolioStore } from '../../stores/portfolio'
import Card from '../ui/Card.vue'

const portfolioStore = usePortfolioStore()
const skillsCategories = computed(() => portfolioStore.skills)

const selectedCategory = ref('all')

const categories = computed(() => {
  const list = ['all']
  skillsCategories.value.forEach(cat => {
    list.push(cat.category)
  })
  return list
})

const getCategoryLabelKey = (cat) => {
  if (cat === 'all') return 'projects.filter_all'
  if (cat === 'Frontend') return 'projects.filter_web'
  if (cat === 'Mobile Development') return 'projects.filter_mobile'
  if (cat === 'Backend') return 'projects.filter_backend'
  return cat // Fallback
}

// Flat list of all skills for the 'all' view or filtering
const filteredSkills = computed(() => {
  if (selectedCategory.value === 'all') {
    // Return all skills with their parent category attached
    const all = []
    skillsCategories.value.forEach(cat => {
      cat.skills.forEach(skill => {
        all.push({ ...skill, category: cat.category })
      })
    })
    return all
  } else {
    // Return skills for specific category
    const cat = skillsCategories.value.find(c => c.category === selectedCategory.value)
    if (!cat) return []
    return cat.skills.map(s => ({ ...s, category: cat.category }))
  }
})

const getProficiencyPercentage = (level) => {
  if (level === 'Expert') return 90
  if (level === 'Intermediate') return 70
  return 50
}

const getCategoryColorClass = (category) => {
  const colors = {
    'Frontend': 'bg-blue-500',
    'Mobile Development': 'bg-purple-500',
    'Backend': 'bg-emerald-500',
    'Databases & DevOps': 'bg-indigo-500'
  }
  return colors[category] || 'bg-accent-primary'
}

const getCategoryGlow = (category) => {
  const glows = {
    'Frontend': 'shadow-blue-500/5 border-blue-500/20 dark:border-blue-500/15',
    'Mobile Development': 'shadow-purple-500/5 border-purple-500/20 dark:border-purple-500/15',
    'Backend': 'shadow-emerald-500/5 border-emerald-500/20 dark:border-emerald-500/15',
    'Databases & DevOps': 'shadow-indigo-500/5 border-indigo-500/20 dark:border-indigo-500/15'
  }
  return glows[category] || 'shadow-accent-primary/5 border-accent-primary/15'
}
</script>

<template>
  <section
    id="skills"
    class="py-24 bg-bg-primary border-t border-border-primary relative overflow-hidden"
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
          {{ $t('skills.title') }}
        </h2>
        <p class="text-3xl sm:text-4xl font-display font-extrabold text-text-primary tracking-tight">
          {{ $t('skills.subtitle') }}
        </p>
        <p class="mt-4 text-sm text-text-secondary">
          {{ $t('skills.hover_instruction') }}
        </p>
        <div class="w-12 h-1 bg-accent-primary mx-auto mt-4 rounded-full" />
      </div>

      <!-- Category Filter Tabs -->
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
          {{ cat === 'all' || cat === 'Frontend' || cat === 'Mobile Development' || cat === 'Backend' ? $t(getCategoryLabelKey(cat)) : cat }}
        </button>
      </div>

      <!-- Skills Grid Container -->
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
      >
        <TransitionGroup
          name="list-complete"
          enter-active-class="transition duration-500 ease-out"
          enter-from-class="opacity-0 translate-y-8"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-300 ease-in absolute"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-8"
        >
          <div
            v-for="skill in filteredSkills"
            :key="skill.name"
            class="list-complete-item"
          >
            <Card
              :glow="true"
              :glass="true"
              :hoverEffect="false"
              class="h-44 relative"
              :class="getCategoryGlow(skill.category)"
            >
              <div class="p-5 flex flex-col items-center justify-between text-center h-full w-full">
                <!-- Icon/Logo -->
                <div class="w-10 h-10 flex items-center justify-center mb-2 relative">
                  <img
                    :src="skill.icon"
                    :alt="skill.name"
                    class="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>

                <!-- Name & Category/Info -->
                <div class="flex flex-col items-center mb-2">
                  <span class="font-display font-semibold text-text-primary text-sm tracking-wide">
                    {{ skill.name }}
                  </span>
                  <span class="text-[9px] text-text-secondary uppercase tracking-widest leading-none mt-1">
                    {{ skill.category.split(' ')[0] }}
                  </span>
                </div>

                <!-- Progress Bar measuring expertise -->
                <div class="w-full px-1 mt-auto">
                  <div class="flex justify-between items-center mb-1 text-[10px] text-text-secondary">
                    <span class="font-medium">
                      {{ skill.level === 'Expert' ? $t('skills.expert') : (skill.level === 'Intermediate' ? $t('skills.intermediate') : $t('skills.beginner')) }}
                    </span>
                    <span class="font-mono opacity-80">{{ getProficiencyPercentage(skill.level) }}%</span>
                  </div>
                  <div class="w-full bg-border-primary/50 dark:bg-border-primary/30 h-1.5 rounded-full overflow-hidden">
                    <div
                      class="h-full rounded-full transition-all duration-500"
                      :class="getCategoryColorClass(skill.category)"
                      :style="{ width: `${getProficiencyPercentage(skill.level)}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </section>
</template>

<style scoped>
.list-complete-item {
  transition: all 0.5s ease;
}

.list-complete-leave-active {
  position: absolute;
}
</style>
