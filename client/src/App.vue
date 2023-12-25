<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router'

import { useTheme } from 'vuetify'
import { userPreferences } from '@/stores/userPreferences'

const theme = useTheme()
const preferences = userPreferences()


//* CHECK PREFERENCES (FIRST LOGIN, IF NOT, DEFAULT IN STORAGE)

function toggleTheme() {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'  
    this.preferences.setTheme(theme.global.name.value);
    }
</script>

<template>
  <v-app>
    <v-app-bar :elevation="2">

      <v-toolbar-title>{{ $t('app_name') }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-slot:append>

        <v-select label="Language" placeholder="Choose an option" autofocus density="compact"
          :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select>
        <v-btn icon="mdi-magnify"></v-btn>
        <v-btn id="theme-changer" @click="toggleTheme()" icon="mdi-theme-light-dark" v-bind="props" color="primary"></v-btn>
        <v-menu id="language-changer" transition="scale-transition">
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-translate" v-bind="props" color="primary"></v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>English</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Português Brasil</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>
    <v-main>
      <RouterView />
    </v-main>
    <v-footer class="bg-black">
      <strong>Sander Tools - Weather Forecast</strong>
    </v-footer>
  </v-app>
</template>
