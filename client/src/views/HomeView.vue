<script>
import axios from 'axios'

export default {
  name:"HomeView",
  data() {
    return {
      response: {},
      searchCities: '',
      autocompleteResponse: {}
    }
  },
  created() {
    
  },
  methods: {
    requestAPI(){
      axios.get('api/weather-data', { params: { lat: "-22", lon:"-44", lang:"pt_br", } })
      .then(res=> {this.response = res})
    },
    getPredictions(){
      axios.get('api/autocomplete', { params: { input: "camp", lang: "pt_br"} })
      .then(res=> {this.autocompleteResponse = res})
    }
  },
}
</script>

<template>
  <main>
    <section>
    <button @click="requestAPI"> Get API Data</button>
    <hr>
    <h3>Response:</h3>
    <div>
      {{ response }}
    </div>
    </section>
    <section>
      <input type="text" name="" id="" v-model="searchCities">
    <button @click="getPredictions">Get autocomplete</button>
    <hr>
    <h3>Response:</h3>
    <div>
      {{ autocompleteResponse }}
    </div>
    </section>
  </main>
</template>
