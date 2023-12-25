<script>
import axios from 'axios'

export default {
  name: "HomeView",
  data() {
    return {
      response: {},
      searchCities: '',
      autocompleteResponse: {},
      model: null,
      expand: null,
    }
  },
  created() {

  },
  methods: {
    requestAPI() {
      axios.get('api/weather-data', { params: { lat: "-22", lon: "-44", lang: "pt_br", } })
        .then(res => { this.response = res })
    },
    getPredictions() {
      axios.get('api/autocomplete', { params: { input: "camp", lang: "pt_br" } })
        .then(res => { this.autocompleteResponse = res })
    }
  },
}
</script>

<template>
  <v-container class="alerts">
    <v-alert density="compact" type="warning" title="Alert title"
      text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!"></v-alert>
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
    <v-title>Hourly</v-title>
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
    <v-title>Daily</v-title>
    <v-container>
      <v-btn @click="requestAPI"> Get Weather data</v-btn>
      <hr>
      <h3>Response:</h3>
      <p>{{ response }}</p>
    </v-container>
    <v-container>
        <v-btn @click="getPredictions">Get autocomplete</v-btn>
        <v-autocomplete label="Search Cities" v-model="searchCities"
          :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']">
        </v-autocomplete>
      <hr>
      <h3>Response:</h3>
      <div>
        {{ autocompleteResponse }}
      </div>
    </v-container>
  </v-container>
</template>
