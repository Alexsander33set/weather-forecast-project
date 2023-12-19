import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import {pt_br, en_us} from './locales/translations'
import router from './router'

const messages = {
  pt_br, en_us
}

const i18n = createI18n({
  locale: "pt_br",
  fallbackLocale: "en_us",
  messages
})


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#app')
