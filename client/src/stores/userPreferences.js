import { defineStore } from 'pinia'
import { ref } from 'vue'


export const userPreferences = defineStore('userPreferences', () => {
  const language = ref('en_us')
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

  function setLanguage(newValue){
    console.log(newValue)
    if (acceptedLanguages.map(i => i.value).includes(newValue)){
      this.language = newValue
    }else{console.error("ERROR: Language invalid")}  
  }
  
  
  
  const metricUnit = ref('')
  const acceptedMetricUnits = ['C','F']

  function setMetricUnit(newValue){
    if (acceptedMetricUnits.value.includes(newValue)){
      this.metricUnit = newValue;}
    else{console.error("ERROR: Metric Unit invalid")}
  }



  const theme = ref('light') 
  const acceptedThemes = ['light','dark']

  function setTheme(newValue){
    if (acceptedThemes.includes(newValue)){
      this.theme = newValue}
    else{console.error("ERROR: Theme invalid");}  
  }


  return {
    language, acceptedLanguages, setLanguage,
    metricUnit, setMetricUnit,
    theme, setTheme
  }
})