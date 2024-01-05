import { createPinia } from 'pinia'
import { watch } from 'vue'

const pinia = createPinia()
export default pinia

if (localStorage.getItem("userPreferences")) {
  pinia.state.value.userPreferences = JSON.parse(localStorage.getItem("state"))
}
watch(
  () => pinia.state.value.userPreferences,
  (state) => {
    localStorage.setItem("userPreferences", JSON.stringify(state))
  },
  { deep: true }
  )