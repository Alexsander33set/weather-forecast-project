<script>
import axios from 'axios'

export default {
  name:"HomeView",
  data() {
    return {
      response: {}
    }
  },
  created() {
    
  },
  methods: {
    requestAPI(){
      axios.get('api/weather-data', { params: { lat: "-22", lon:"-44", lang:"pt_br", } })
      .then(res=> {this.response = res})
    }
  },
}
</script>

<template>
  <main>
    <button @click="requestAPI"> Get API Data</button>
    <hr>
    <h3>Response:</h3>
    <div>
      {{ response }}
    </div>
  </main>
</template>
