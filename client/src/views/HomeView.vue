<script setup>
import axios from 'axios'
import { ref, computed, watch } from 'vue';

import { userPreferences } from '@/stores/userPreferences'
const preferences = userPreferences()
const convTemp = preferences.unitConverter.kelvinToPreferredUnit

//* Import components
import HourlySection from '../components/layout/HourlySection.vue'
import DailySection from '../components/layout/DailySection.vue'

//* Declare variables
const isFirstLogin = ref(true)
const bruteWeatherData = ref({})
if (localStorage.getItem("lastWeatherData")) {
  bruteWeatherData.value = JSON.parse(localStorage.getItem("lastWeatherData"))
}
watch(
  bruteWeatherData,
  (newValue) => {
    localStorage.setItem("lastWeatherData", JSON.stringify(newValue))
  },
  { deep: true }
)

const UpdatedDescription = function () {
  let weatherRequestDate = new Date(bruteWeatherData.value.timestamp)
  
  return ( 
    weatherRequestDate.toLocaleDateString(preferences.language.replace('_','-'))
  )
}

const capitalizeFirstLetter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const geolocation = ref({
  'city': '',
  'region': '',
  'country': '',
  'fullAddress': '',
  'lat': '',
  'lon': '',
  'timestamp': ''

})

if (localStorage.getItem("geolocation")) {
  geolocation.value = JSON.parse(localStorage.getItem("geolocation"))
}
watch(
  geolocation,
  (newValue) => {
    localStorage.setItem("geolocation", JSON.stringify(newValue))
  },
  { deep: true }
)


const forecastAlerts = computed(() => {
  return bruteWeatherData.value.alerts
})
const currentForecast = computed(() => {
  return bruteWeatherData.value.current
})
const dailyForecast = computed(() => {
  return bruteWeatherData.value.daily
})
const hourlyForecast = computed(() => {
  return bruteWeatherData.value.hourly
})

const getWeatherData = function (lat, lon) {
  if (!lat || !lon) { return }
  axios.get('api/weather-data', { params: { lat: lat, lon: lon, lang: preferences.language, } })
    .then(res => {
      bruteWeatherData.value = res.data;
      bruteWeatherData.value.timestamp = new Date()
      localStorage.setItem('lastWeatherData', JSON.stringify(bruteWeatherData.value));
    })
    .catch(err => { console.error(err) })
}

const IPGeolocation = function () {
  axios.get('api/ip-geolocation')
    .then((res) => {
      geolocation.value = {
        'city': res.data.city,
        'region': res.data.region,
        'country': res.data.country,
        'fullAddress': `${res.data.city}, ${res.data.region}, ${res.data.country}, `,
        'lat': res.data.loc.split(',')[0],
        'lon': res.data.loc.split(',')[1],
        'timestamp': new Date()
      }
    })
    .catch((err) => { console.error(err) })
}

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
async function firstLogin() {
  let getWeatherForecast = localStorage.getItem(('lastWeatherData'))
  if (getWeatherForecast) { isFirstLogin.value = false }
  else {
    IPGeolocation()
    if (!geolocation.value.lat || !geolocation.value.lon) { return console.log(`Geolocation not valid | lat:${geolocation.value.lat} | lon:${geolocation.value.lon} |`); }
    getWeatherData(geolocation.value.lat, geolocation.value.lon)
  }
}


firstLogin()
</script>

<template>
  <v-container class="alerts">
    <v-alert density="compact" type="warning"
      v-for="(alert, index) in forecastAlerts" :key="index"
      :title="alert.event" :text="alert.description"></v-alert>
  </v-container>
  <v-container class="current">
    <v-card class="px-3" density="comfortable">
        <template v-slot:title>
        <div class="d-flex ga-3 align-center my-2">
          <p>{{ geolocation.fullAddress.substring(0, geolocation.fullAddress.length - 2) || 'City is not defined' }}</p>
        <v-text-field 
          clearable 
          :label="$t('input_change_city')" 
          class="bg-background text-primaryLight"
          density="compact"
          variant="outlined"
          style="max-width:344px;"
          append-inner-icon="mdi-magnify"
          hide-details
          single-line
          
          @click:append-inner="onClick"
        ></v-text-field>
        </div>
      </template>
      <template v-slot:subtitle>
        <p class="text-subtitle-2">{{ $t('updated_in') + ' ' + UpdatedDescription() }}</p>
      </template>
      <template v-slot:text>
        <v-row align="center" no-gutters>
          <v-col>
            <div class="d-inline-block">
              <h2 class="text-h2">
              {{ convTemp(currentForecast.temp)}}&deg;{{preferences.metricUnit}}
              </h2>
            <p class="text-body-2 text-medium-emphasis text-center">Min {{ convTemp(currentForecast.temp) + '&deg;' + preferences.metricUnit}} Max {{ convTemp(currentForecast.temp) + '&deg;' + preferences.metricUnit}}</p>
            </div>
            <h3 class="text-h3 font-weight-light mt-3">
              {{ capitalizeFirstLetter(currentForecast.weather[0].description)}}
            </h3>
          </v-col>

          <v-col cols="6" class="text-right">
            <v-card class="d-inline-block bg-blue-lighten-3 rounded-xl">
              <img :src="'https://openweathermap.org/img/wn/'+currentForecast.weather[0].icon+'@4x.png'" :alt="currentForecast.weather[0].description" />
            </v-card>
          </v-col>
        </v-row>

        <div class="d-flex pt-5 pb-3 ga-5 flex-wrap">
          <v-card v-if="currentForecast.wind_speed"
            class="bg-primary"
            :title="$t('weatherProps.wind')"
            :text="(currentForecast.wind_speed * 3.6).toFixed(0) + ' km/h'"
            append-icon="mdi-weather-windy"></v-card>
            
          <v-card v-if="currentForecast.humidity"
            class="bg-primary"
            :title="$t('weatherProps.humidity')"
            :text="currentForecast.humidity + ' %'"
            append-icon="mdi-water-percent"></v-card>
            
          <v-card v-if="currentForecast.clouds"
            class="bg-primary"
            :title="$t('weatherProps.clouds')"
            :text="currentForecast.clouds + ' %'"
            append-icon="mdi-cloud-outline"></v-card>

          <v-card v-if="currentForecast.visibility"
            class="bg-primary"
            :title="$t('weatherProps.visibility')"
            :text="(currentForecast.visibility /100) + ' %'"
            append-icon="mdi-eye-outline"></v-card>

          <v-card v-if="currentForecast.rain"
            class="bg-primary"
            :title="$t('weatherProps.rain')"
            :text="currentForecast.rain + ' %'"
            append-icon="mdi-weather-pouring"></v-card>
        </div>
      </template>
    </v-card>
  </v-container>
  <HourlySection :hourlyList="hourlyForecast"/>
  <DailySection :dailyForecast="dailyForecast"/>
</template>