<script setup>
  import { ref, computed } from 'vue';
  
  const props = defineProps({hourlyList: Array})
  const chartData = computed(() => {
    return 'something'
  })
  console.log(props.hourlyList[0].clouds + chartData.value)
</script>

<template>
  <v-container>
    <h3 class="text-h6">HourlyGraph</h3>
    <v-container class="d-flex justify-space-between">
        <div class="pa-1" 
          v-for="(hour, index) in props.hourlyList" 
          :key="index">
          <p>{{ new Date(hour.dt * 1000).getHours() }}:00</p>
          {{ (hour.temp -273,15)}}graus |
        </div>
        
    </v-container>
</v-container>
</template>


<style scoped>

</style>