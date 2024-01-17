import { createI18n } from 'vue-i18n'
import {pt_br, en_us} from '../locales/translations'


const messages = {
  pt_br, en_us
}

export default createI18n({
  legacy: false,
  locale: 'en_us',
  fallbackLocale: "en_us",
  messages
})
