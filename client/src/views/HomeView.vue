<script setup>
import axios from 'axios'
import { ref, computed, watch } from 'vue';
import { userPreferences } from '@/stores/userPreferences'
import HourlyGraph from '../components/HourlyGraph.vue'

const preferences = userPreferences()

const model = ref(null)
const expand = ref(null)
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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getWeatherData(lat, lon) {
  if (!lat || !lon) { return }
  axios.get('api/weather-data', { params: { lat: lat, lon: lon, lang: preferences.language, } })
    .then(res => {
      bruteWeatherData.value = res.data;
      bruteWeatherData.value.timestamp = new Date()
      localStorage.setItem('lastWeatherData', JSON.stringify(bruteWeatherData.value));
    })
    .catch(err => { console.error(err) })
}

function IPGeolocation() {
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
    await IPGeolocation()
    if (!geolocation.value.lat || !geolocation.value.lon) { return console.log(`Geolocation not valid | lat:${geolocation.value.lat} | lon:${geolocation.value.lon} |`); }
    await getWeatherData(geolocation.value.lat, geolocation.value.lon)
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
    <v-card class="mx-auto" density="comfortable">
      <v-card-item :title="geolocation.city || 'Cidade não definida'">
      </v-card-item>

      <v-card-text class="py-0">
        <v-row align="center" no-gutters>
          <v-col class="text-h2" cols="6">
            {{currentForecast.temp}}&deg;{{preferences.metricUnit}}
          </v-col>

          <v-col cols="6" class="text-right">
            <img :src="'https://openweathermap.org/img/wn/'+currentForecast.weather[0].icon+'@4x.png'" :alt="currentForecast.weather[0].description" />
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
  <HourlyGraph :hourlyList="hourlyForecast"/>
  <v-container class="daily">
    <h3>Hourly</h3>
    <v-sheet class="mx-auto">
      <v-slide-group v-model="model" class="pa-4" selected-class="bg-primary" show-arrows>
        <v-slide-group-item v-for="(day, index) in dailyForecast" :key="index" v-slot="{ isSelected, toggle, selectedClass }">
          <v-card color="blue-lighten-2" :class="['ma-4', selectedClass]"  @click="toggle">
            <div class="d-flex flex-column fill-height align-center justify-center pa-3">
              <h3 class="text-h6">{{ new Date(day.dt * 1000).getDate() }}/{{$t(`months.${parseInt(new Date(day.dt * 1000).getMonth())}`).substring(0, 3)}}</h3>
              <img :src="'https://openweathermap.org/img/wn/'+day.weather[0].icon+'@2x.png'" :alt="day.weather[0].description" />
              <p class="text-body-1">{{ `${day.temp.eve} °${preferences.metricUnit}` }}</p>
              <!-- <v-scale-transition>
                <v-icon v-if="isSelected" color="white" size="48" icon="mdi-close-circle-outline"></v-icon>
              </v-scale-transition> -->
            </div> 
          </v-card>
        </v-slide-group-item>
      </v-slide-group>

      <v-expand-transition>
        <v-sheet v-if="model != null" height="200">
          <div class="d-flex flex-column fill-height justify-center">
            <h3 class="text-h6">
              {{ 
                new Date(dailyForecast[model].dt * 1000).getDate() 
              }}
              {{
                capitalizeFirstLetter($t(`months.${parseInt(new Date(dailyForecast[model].dt * 1000).getMonth())}`).substring(0, 3))
              }}
            </h3>
            <hr>
            <p class="text-body-1">{{ hourlyForecast[model].weather }}</p>
          </div>
        </v-sheet>
      </v-expand-transition>
    </v-sheet>
  </v-container>
  <v-container>
    <h3>Daily</h3>
    <hr>
    <h4>Geolocation:</h4>
    <div>
      {{ geolocation }}
    </div>
    <hr>
    
  </v-container>
  <v-container>
    <h4>WeatherData</h4>
  {{ forecastAlerts }}
  <hr>
  {{ currentForecast }}
  <hr>
  {{ dailyForecast }}
  <hr>
  {{ hourlyForecast }}
  </v-container>
</template>
