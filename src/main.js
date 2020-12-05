import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import VuePageTransition from 'vue-page-transition'

import '@babel/polyfill'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(VuePageTransition)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
