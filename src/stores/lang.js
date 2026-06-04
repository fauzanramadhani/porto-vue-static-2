import { defineStore } from 'pinia'
import { ref } from 'vue'
import { i18n } from '../locales/i18n'

export const useLangStore = defineStore('lang', () => {
  const currentLang = ref(i18n.global.locale.value)

  const setLang = (lang) => {
    if (['en', 'id'].includes(lang)) {
      currentLang.value = lang
      i18n.global.locale.value = lang
      localStorage.setItem('lang', lang)
    }
  }

  return {
    currentLang,
    setLang
  }
})
