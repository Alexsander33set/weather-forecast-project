import { createI18n } from 'vue-i18n'
import {pt_br, en_us} from '../locales/translations'


const messages = {
  pt_br, en_us
}

export default createI18n({
  locale: "pt_br",
  fallbackLocale: "en_us",
  messages
})
