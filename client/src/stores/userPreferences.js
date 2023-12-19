import { defineStore } from 'pinia'

export const userPreferences = defineStore('userPreferences', {
  //* DECLARATION
  state: () => {
    return { 
      language: '',
      metricUnit: '',
    }
  },
  
  //* METHODS
  actions: {
    setLanguage(newValue){
      this.language = newValue
    },
    setMetricUnit(newValue){
      this.MetricUnit = newValue
    },
  },
  
  //* COMPUTED
  getters: {

  }
})

