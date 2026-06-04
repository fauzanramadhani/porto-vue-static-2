import { createI18n } from 'vue-i18n'
import en from './en.json'
import id from './id.json'

const messages = { en, id }

const savedLocale = localStorage.getItem('lang')
const systemLocale = navigator.language?.split('-')[0]
const defaultLocale = savedLocale || (['en', 'id'].includes(systemLocale) ? systemLocale : 'en')

export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'en',
  messages
})
