import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useTheme } from 'vuetify'
import { useI18n } from 'vue-i18n'


export const userPreferences = defineStore('userPreferences', () => {
  const { locale } = useI18n()
  
  const language = ref(locale.value)
  const acceptedLanguages = [
    {
      label:"Português Brasil",
      value:"pt_br"
    },
    {
      label:"English",
      value:"en_us"
    }
  ]

  if (localStorage.getItem("language")){
    language.value = JSON.parse(localStorage.getItem("language"))
    locale.value = JSON.parse(localStorage.getItem("language"))
    console.log("OPA, tem coisa de language: " + language.value);
  }
  watch(
    language,
    (languageValue) => {
      localStorage.setItem("language", JSON.stringify(languageValue))
    },
    { deep: true}
  )

  function toggleLanguage(i18n, newValue) {
    if (i18n.availableLocales.includes(newValue)) {
      try {
        i18n.locale = newValue
        language.value = newValue
        console.log('language changed to: '+i18n.locale)
      } catch (error) {
        console.error(error);
      } 
    }
  }



  const metricUnit = ref('C')
  const acceptedMetricUnits = ['C','F']

  function setMetricUnit(newValue){
    if (acceptedMetricUnits.value.includes(newValue)){
      this.metricUnit = newValue;}
    else{console.error("ERROR: Metric Unit invalid")}
  }



  const theme = ref(useTheme().global.name.value)

  if (localStorage.getItem("theme")){
    theme.value = JSON.parse(localStorage.getItem("theme"))
    console.info(useTheme().global)
    console.log("OPA, tem coisa de tema: " + theme.value);
  }
  watch(
    theme,
    (themeValue) => {
      localStorage.setItem("theme", JSON.stringify(themeValue))
    },
    { deep: true}
  )

  function toggleTheme() {
    useTheme().global.value.name.value = useTheme().global.value.current.value.dark ? 'light' : 'dark'
    this.theme = useTheme().global.value.name.value
  }



  return {
    language, acceptedLanguages, toggleLanguage,
    metricUnit, setMetricUnit,
    theme, toggleTheme
  }
})