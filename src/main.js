import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import Tres from '@tresjs/core'
import App from './App.vue'
import router from './router'
import { i18n } from './locales/i18n'
import './styles/theme.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(MotionPlugin)
app.use(Tres)

app.mount('#app')
