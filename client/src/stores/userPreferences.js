import { defineStore } from 'pinia'

export const userPreferences = defineStore('userPreferences', {
  //* DECLARATION
  state: () => {
    return { 
      language: '',
      metricUnit: '',
      theme: localStorage.getItem('theme') || 'light',
      acceptedMetricUnits:['C','F'],
      acceptedThemes:['light','dark'],
      acceptedLanguages:[
        {
          label:"Português Brasil",
          value:"pt_br"
        },
        {
          label:"English",
          value:"en"
        }
      ]

    }
  },
  
  //* METHODS
  actions: {
    setLanguage(newValue){
      // Is newValue in acceptedLanguages?
      this.language = newValue
    },
    setMetricUnit(newValue){
      // Is newValue in acceptedMetricUnits?
      this.MetricUnit = newValue
    },
    setTheme(newValue){
      if (this.acceptedThemes.includes(newValue)){
        localStorage.setItem('theme', this.theme);
        this.theme = newValue
      }else{console.error("ERROR: Theme invalid");}  
    },
  },
  
  //* COMPUTED
  getters: {
    
  }
})

