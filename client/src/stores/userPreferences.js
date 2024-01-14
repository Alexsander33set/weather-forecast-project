import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useTheme } from 'vuetify'


export const userPreferences = defineStore('userPreferences', () => {
  const language = ref('pt_br')
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

  function toggleLanguage(i18n, newValue) {
    if (i18n.availableLocales.includes(newValue)) {
      try {
        i18n.locale = newValue
        this.language = newValue
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


  const theme = useTheme().global
  // const appTheme = ref('light') 

  function toggleTheme() {
    theme.name.value = theme.current.value.dark ? 'light' : 'dark'
    this.preferences.theme = theme.name.value
  }


  return {
    language, acceptedLanguages, toggleLanguage,
    metricUnit, setMetricUnit,
    theme, toggleTheme
  }
})