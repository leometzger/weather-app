import api from '@/api'
import {
  CREATED_SUCCESSFULLY_MSG,
  CREATE_ERROR_MSG,
  UPDATED_SUCCESSFULLY_MSG,
  UPDATE_ERROR_MSG,
  DELETED_SUCCESSFULLY_MSG,
  DELETE_ERROR_MSG,
} from '@/messages'

const state = {
  cities: [],
}

const mutations = {
  setCities(state, cities) {
    state.cities = cities
  },
}

const actions = {
  async fetchCities({commit}) {
    const response = await api.cities.getItems()

    if (response.isSuccess()) {
      commit('setCities', response.payload)
    }
  },

  async createCity({dispatch}, city) {
    const response = await api.cities.createItem(city)

    if (response.isSuccess()) {
      dispatch(
        'notifications/send',
        {text: CREATED_SUCCESSFULLY_MSG},
        {root: true}
      )
      dispatch('fetchCities')
    } else {
      dispatch('notifications/send', {text: CREATE_ERROR_MSG}, {root: true})
    }
  },

  async updateCity({dispatch}, city) {
    const response = await api.cities.updateItem(city.id, city)

    if (response.isSuccess()) {
      dispatch(
        'notifications/send',
        {text: UPDATED_SUCCESSFULLY_MSG},
        {root: true}
      )
      dispatch('fetchCities')
    } else {
      dispatch('notifications/send', {text: UPDATE_ERROR_MSG}, {root: true})
    }
  },

  async deleteCity({dispatch}, {id}) {
    const response = await api.cities.deleteItem(id)

    if (response.isSuccess()) {
      dispatch(
        'notifications/send',
        {text: DELETED_SUCCESSFULLY_MSG},
        {root: true}
      )
      dispatch('fetchCities')
    } else {
      dispatch('notifications/send', {text: DELETE_ERROR_MSG}, {root: true})
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
