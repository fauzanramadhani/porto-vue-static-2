import { defineStore } from 'pinia'
import { ref } from 'vue'

// Import all local static JSON data files
import profileData from '../data/profile.json'
import aboutData from '../data/about.json'
import skillsData from '../data/skills.json'
import projectsData from '../data/projects.json'
import experiencesData from '../data/experiences.json'
import certificationsData from '../data/certifications.json'
import socialsData from '../data/socials.json'
import settingsData from '../data/settings.json'
import preferencesData from '../data/preferences.json'

export const usePortfolioStore = defineStore('portfolio', () => {
  const profile = ref(profileData)
  const about = ref(aboutData)
  const skills = ref(skillsData)
  const projects = ref(projectsData)
  const experiences = ref(experiencesData)
  const certifications = ref(certificationsData)
  const socials = ref(socialsData)
  const settings = ref(settingsData)
  const preferences = ref(preferencesData)

  return {
    profile,
    about,
    skills,
    projects,
    experiences,
    certifications,
    socials,
    settings,
    preferences
  }
})
