import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import pt from 'vuetify/lib/locale/pt'

import '@fortawesome/fontawesome-free/css/all.css'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#6C63FF',
        secondary: '#000',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
  lang: {
    locales: {pt},
    current: 'pt',
  },
  icons: {
    iconfont: 'fa',
  },
})
