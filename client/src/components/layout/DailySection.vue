<script setup>
  import { ref, computed } from 'vue';
  import { userPreferences } from '@/stores/userPreferences'
  const props = defineProps({dailyForecast: Array})

  const preferences = userPreferences()
  const model = ref(null)

  const capitalizeFirstLetter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
</script>

<template>
    <v-container class="daily">
    <v-sheet class="mx-auto elevation-2">
      <v-slide-group v-model="model" class="py-2" selected-class="bg-primary" show-arrows>
        <v-slide-group-item 
          v-for="(day, index) in props.dailyForecast" :key="index" 
          v-slot="{ isSelected, toggle, selectedClass }">
          <v-card :class="['ma-4', selectedClass]"  
            color="blue-lighten-2"
            @click="toggle">
            <div class="d-flex flex-column fill-height align-center justify-center pa-3">
              <h3 class="text-h6">{{ new Date(day.dt * 1000).getDate() }}/{{$t(`months.${parseInt(new Date(day.dt * 1000).getMonth())}`).substring(0, 3)}}</h3>
              <img :src="'https://openweathermap.org/img/wn/'+day.weather[0].icon+'@2x.png'" :alt="day.weather[0].description" />
              <p class="text-body-1">{{ `${preferences.unitConverter.kelvinToCelsius(day.temp.eve)} °${preferences.metricUnit}` }}</p>
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
                new Date(dailyForecast[model].dt * 1000).getDate() + ' ' + capitalizeFirstLetter($t(`months.${parseInt(new Date(dailyForecast[model].dt * 1000).getMonth())}`))
              }}

            </h3>
            <hr>
            <p class="text-body-1">{{ hourlyForecast[model] }}</p>
            <hr>
            <p></p>
          </div>
        </v-sheet>
      </v-expand-transition>
    </v-sheet>
  </v-container>
</template>


<style scoped>

</style>