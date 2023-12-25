// Plugins
import vuetify from './vuetify'
import i18n from './i18n'
import pinia from './pinia'
import router from '@/router'

export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(pinia)
    .use(router)
    .use(i18n)
}
