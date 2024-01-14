<script setup>
import { RouterView } from 'vue-router'

import { useTheme } from 'vuetify'
import { userPreferences } from '@/stores/userPreferences'

const theme = useTheme().global
const preferences = userPreferences()
//* CHECK PREFERENCES (FIRST LOGIN, IF NOT, DEFAULT IN STORAGE)

function toggleTheme() {
  theme.name.value = theme.current.value.dark ? 'light' : 'dark'
  this.preferences.theme = theme.name.value
}

//*

</script>

<template>
  <v-app>
    <v-app-bar :elevation="2">
      <v-toolbar-title>{{ $t('app_name') }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-slot:append>
        <v-tooltip :text="$t('header.theme_tooltip')" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn id="theme-changer" @click="toggleTheme()" icon="mdi-theme-light-dark" color="primary" v-bind="props">
            </v-btn>
          </template>
        </v-tooltip>
        <v-menu id="language-changer" transition="scale-transition" v-bind="props">
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-translate" v-bind="props" color="primary"></v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(language, index) in preferences.acceptedLanguages" :key="index" :value="language.value" @click="preferences.toggleLanguage($i18n, language.value)">
              <v-list-item-title>{{language.label}}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>
    <v-main>
      <RouterView />
    </v-main>
    <v-footer class="bg-black">
      Sander Tools - Weather Forecast
    </v-footer>
  </v-app>
</template>
