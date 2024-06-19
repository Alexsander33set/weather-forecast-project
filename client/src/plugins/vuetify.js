/* documentation: https://vuetifyjs.com */

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'


export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#90CAF9',
          'primaryLight': '#4A809C',
          secondary: '#5CBBF6',
          background: '#F7FAFC',
        },
      },
      dark: {
        colors: {
          // background: '#00060c'
          primary: '#3484df',
        },
      },
    },
  },
})
