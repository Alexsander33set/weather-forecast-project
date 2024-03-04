<script setup>
  import { ref, computed } from 'vue';
  import { userPreferences } from '@/stores/userPreferences'
  const props = defineProps({hourlyList: Array})

  const preferences = userPreferences()
  const chartData = computed(() => {
    return 'something'
  })
</script>

<template>
  <v-container>
    <v-container class="d-flex ga-3 overflow-auto" style="white-space: nowrap">
        <v-card class="bg-blue-lighten-3 pa-4 flex-shrink-0" density="comfortable"
        v-for="(hour, index) in props.hourlyList" 
        :key="index">
          <p class="text-h6 text-center">{{ new Date(hour.dt * 1000).getHours() }}:00 - {{ new Date(hour.dt * 1000).getHours() }}:00</p>
          <v-container class="d-flex align-center">
            <img :src="'https://openweathermap.org/img/wn/'+hour.weather[0].icon+'@2x.png'" :alt="hour.weather[0].description" />
            <v-container>
            <p class="text-body-1">{{ hour.weather[0].description }}</p>
            <p>{{ (hour.temp)}}° - 15°</p>
            </v-container>
          </v-container>
        </v-card>
        
    </v-container>
</v-container>
</template>


<style scoped>

</style>