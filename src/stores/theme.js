import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref(localStorage.getItem('theme') || 'system')

  const applyTheme = (newTheme) => {
    const root = document.documentElement
    
    // Check dark mode
    let isDark = false
    if (newTheme === 'system') {
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    } else {
      isDark = newTheme === 'dark'
    }

    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  const setTheme = (newTheme) => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  const initTheme = () => {
    applyTheme(theme.value)
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', () => {
      if (theme.value === 'system') {
        applyTheme('system')
      }
    })
  }

  return {
    theme,
    setTheme,
    initTheme
  }
})
