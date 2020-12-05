import Vue from 'vue'
import Vuex from 'vuex'

import authentication from './authentication'
import cities from './cities'
import countries from './countries'
import notifications from './notifications'
import weather from './weather'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    authentication,
    cities,
    countries,
    notifications,
    weather,
  },
})
