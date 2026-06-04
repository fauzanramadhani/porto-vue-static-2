<script setup>
import { ref, computed } from 'vue'
import { usePortfolioStore } from '../../stores/portfolio'
import Card from '../ui/Card.vue'
import Badge from '../ui/Badge.vue'
import Button from '../ui/Button.vue'
import { Award, ExternalLink, FileDown, ChevronDown, ChevronUp, CheckCircle } from 'lucide-vue-next'

const portfolioStore = usePortfolioStore()
const certifications = computed(() => portfolioStore.certifications)

const expandedCertId = ref(null)

const toggleExpand = (id) => {
  if (expandedCertId.value === id) {
    expandedCertId.value = null
  } else {
    expandedCertId.value = id
  }
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long' })
}
</script>

<template>
  <section
    id="certifications"
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
          {{ $t('certifications.title') }}
        </h2>
        <p class="text-3xl sm:text-4xl font-display font-extrabold text-text-primary tracking-tight">
          {{ $t('certifications.subtitle') }}
        </p>
        <div class="w-12 h-1 bg-accent-primary mx-auto mt-4 rounded-full" />
      </div>

      <!-- Certifications Grid Layout -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="(cert, index) in certifications"
          :key="cert.id"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut', delay: index * 50 } }"
        >
          <Card
            :glow="true"
            :glass="true"
            @click="toggleExpand(cert.id)"
            class="p-6 cursor-pointer border border-border-primary hover:border-border-secondary transition-all duration-300"
            :class="[
              expandedCertId === cert.id 
                ? 'ring-1 ring-accent-primary/30 shadow-md bg-bg-primary/40' 
                : 'bg-bg-secondary'
            ]"
          >
            <div class="flex items-start gap-4">
              <!-- Issuer icon or placeholder award icon -->
              <div class="w-12 h-12 flex-shrink-0 rounded-xl border border-border-primary overflow-hidden flex items-center justify-center bg-white p-1">
                <img
                  v-if="cert.logo"
                  :src="cert.logo"
                  :alt="cert.issuer"
                  class="w-full h-full object-contain"
                  loading="lazy"
                />
                <Award v-else class="w-6 h-6 text-accent-primary" />
              </div>

              <!-- Content panel -->
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-2">
                  <h3 class="font-display font-bold text-sm sm:text-base text-text-primary group-hover:text-accent-primary leading-snug pr-4">
                    {{ cert.title }}
                  </h3>
                  <div class="text-text-secondary">
                    <ChevronUp v-if="expandedCertId === cert.id" class="w-5 h-5 flex-shrink-0" />
                    <ChevronDown v-else class="w-5 h-5 flex-shrink-0" />
                  </div>
                </div>
                
                <p class="text-xs font-semibold text-accent-primary font-display mt-0.5">
                  {{ cert.issuer }}
                </p>
                
                <!-- Micro row for dates and status badge -->
                <div class="flex items-center gap-2 mt-2">
                  <span v-if="cert.issuedDate" class="text-[10px] text-text-secondary font-display font-medium">
                    {{ formatDate(cert.issuedDate) }}
                  </span>
                  <Badge variant="success" class="text-[8px] uppercase tracking-wider font-semibold px-2 py-0.5">
                    {{ cert.status }}
                  </Badge>
                </div>

                <Transition
                  enter-active-class="transition duration-300 ease-out"
                  enter-from-class="transform scale-y-95 opacity-0 max-h-0"
                  enter-to-class="transform scale-y-100 opacity-100 max-h-[300px]"
                  leave-active-class="transition duration-200 ease-in"
                  leave-from-class="transform scale-y-100 opacity-100 max-h-[300px]"
                  leave-to-class="transform scale-y-95 opacity-0 max-h-0"
                >
                  <div v-if="expandedCertId === cert.id" class="origin-top overflow-hidden">
                    <div class="mt-5 pt-4 border-t border-border-primary space-y-4">
                      <!-- Credential ID details -->
                      <div v-if="cert.credentialId" class="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 text-xs">
                        <div class="flex items-center gap-1.5 text-text-secondary font-medium font-display">
                          <CheckCircle class="w-4 h-4 text-emerald-500" />
                          <span>{{ $t('certifications.credential_id') }}:</span>
                        </div>
                        <code class="px-1.5 py-0.5 rounded bg-bg-tertiary border border-border-primary font-mono text-[10px] text-text-primary self-start sm:self-auto break-all">
                          {{ cert.credentialId }}
                        </code>
                      </div>

                      <!-- Description detail if exists -->
                      <p v-if="cert.description" class="text-xs text-text-secondary leading-relaxed">
                        {{ cert.description }}
                      </p>

                      <!-- Verification action links row -->
                      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full" @click.stop>
                        <Button
                          v-if="cert.verifyUrl"
                          variant="primary"
                          :href="cert.verifyUrl"
                          target="_blank"
                          class="text-xs px-3 py-2 rounded-lg shadow-sm cursor-pointer flex-1 justify-center text-center flex items-center"
                        >
                          <span class="text-xs">{{ $t('certifications.verify') }}</span>
                          <ExternalLink class="w-3.5 h-3.5 ml-1" />
                        </Button>
                        
                        <!-- Links to local PDF in public folder -->
                        <Button
                          v-if="cert.file"
                          variant="outline"
                          :href="`/assets/sertif/${cert.file}`"
                          target="_blank"
                          class="text-xs px-3 py-2 rounded-lg shadow-sm cursor-pointer flex-1 justify-center text-center flex items-center"
                        >
                          <FileDown class="w-3.5 h-3.5 mr-1" />
                          <span class="text-xs">{{ $t('certifications.download') }}</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Expand transition details helper */
</style>
