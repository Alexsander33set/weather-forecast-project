<script setup>
import axios from 'axios'
import { ref, computed, watch } from 'vue';
import { userPreferences } from '@/stores/userPreferences'

const preferences = userPreferences()

const model= ref(null) 
const expand= ref(null)
const isFirstLogin = ref(true)
const bruteWeatherData = ref({})
const geolocation = ref({
  'city': '',
  'region': '',
  'country': '',
  'fullAddress': '',
  'lat': '',
  'lon': '',
  'timestamp':''

})


if (localStorage.getItem("geolocation")){
    geolocation.value = JSON.parse(localStorage.getItem("geolocation"))
  }
  watch(
    geolocation,
    (newValue) => {
      localStorage.setItem("geolocation", JSON.stringify(newValue))
    },
    { deep: true}
  )



function getWeatherData(lat, lon){
  if (!lat || !lon) {return}
  axios.get('api/weather-data', { params: { lat: lat, lon: lon, lang: preferences.language, } })
    .then(res => {
      bruteWeatherData.value = res.data;
      bruteWeatherData.value.timestamp = new Date()
      localStorage.set('lastWeatherData', JSON.stringify(bruteWeatherData.value));
    })
    .catch(err =>{console.error(err)})
}

function IPGeolocation(){
  axios.get('api/ip-geolocation')
  .then((res)=>{
    geolocation.value = {
      'city': res.data.city,
      'region': res.data.region,
      'country': res.data.country,
      'fullAddress': `${res.data.city}, ${res.data.region}, ${res.data.country}, `,
      'lat': res.data.loc.split(',')[0],
      'lon': res.data.loc.split(',')[1],
      'timestamp':new Date()
    }
  })
  .catch((err) =>{console.error(err)})
}


const weatherData = computed(() => {
  return preferences.theme
})

// function getPredictions() {
//   axios.get('api/autocomplete', { params: { input: "camp", lang: "pt_br" } })
//     .then(res => { this.autocompleteResponse = res })
// }

/* 
* First Login
  * check local storage
  * if yes, check how much time
  * if no, request data with IP and pull a modal requesting geolocation
*/
function firstLogin() {
  let getWeatherForecast = localStorage.getItem(('lastWeatherData'))
  if(getWeatherForecast) { isFirstLogin.value = false}
  else {
    IPGeolocation()
    if (!geolocation.value.lat || !geolocation.value.lon){return console.log("Geolocation not valid");}
    getWeatherData(geolocation.value.lat, geolocation.value.lon)
  }
}


firstLogin()
</script>

<template>
  <v-container class="alerts">
    <v-alert density="compact" type="warning" title="Alert title"
      :text="weatherData"></v-alert>
  </v-container>
  <v-container class="current">
    <v-card class="mx-auto" density="comfortable">
      <v-card-item title="Cidade">
        <template v-slot:subtitle>
          <v-icon icon="mdi-alert" size="18" color="error" class="me-1 pb-1"></v-icon>

          Extreme Weather Alert
        </template>
      </v-card-item>

      <v-card-text class="py-0">
        <v-row align="center" no-gutters>
          <v-col class="text-h2" cols="6">
            64&deg;F
          </v-col>

          <v-col cols="6" class="text-right">
            <v-icon color="error" icon="mdi-weather-hurricane" size="88"></v-icon>
          </v-col>
        </v-row>
      </v-card-text>

      <div class="d-flex py-3 justify-space-between">
        <v-list-item density="compact" prepend-icon="mdi-weather-windy">
          <v-list-item-subtitle>123 km/h</v-list-item-subtitle>
        </v-list-item>

        <v-list-item density="compact" prepend-icon="mdi-weather-pouring">
          <v-list-item-subtitle>48%</v-list-item-subtitle>
        </v-list-item>
      </div>

      <div v-if="expand">GUEGUEGUE</div>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn @click="expand = !expand">
          {{ !expand ? 'Full Report' : 'Hide Report' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
  <v-container class="hourly">
    <h3>Hourly</h3>
    <v-sheet class="mx-auto">
      <v-slide-group v-model="model" class="pa-4" selected-class="bg-primary" show-arrows>
        <v-slide-group-item v-for="n in 15" :key="n" v-slot="{ isSelected, toggle, selectedClass }">
          <v-card color="grey-lighten-1" :class="['ma-4', selectedClass]" height="200" width="300" @click="toggle">
            <div class="d-flex fill-height align-center justify-center">
              <v-scale-transition>
                <v-icon v-if="isSelected" color="white" size="48" icon="mdi-close-circle-outline"></v-icon>
              </v-scale-transition>
            </div>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>

      <v-expand-transition>
        <v-sheet v-if="model != null" height="200">
          <div class="d-flex fill-height align-center justify-center">
            <h3 class="text-h6">
              Selected {{ model }}
            </h3>
          </div>
        </v-sheet>
      </v-expand-transition>
    </v-sheet>
  </v-container>
  <v-container class="daily">
    <h3>Daily</h3>
    <hr>
    <h4>Geolocation:</h4>
    <div>
      {{ geolocation }}
    </div>
    <hr>
    <h4>WeatherData</h4>
    <div>{{ bruteWeatherData }}</div>
  </v-container>
</template>
