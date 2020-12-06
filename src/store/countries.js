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
  countries: [],
}

const mutations = {
  setCountries(state, countries) {
    state.countries = countries
  },
}

const actions = {
  async fetchCountries({commit}) {
    const response = await api.countries.getItems()

    if (response.isSuccess()) {
      commit('setCountries', response.payload)
    }
  },

  async createCountry({dispatch}, country) {
    const response = await api.countries.createItem(country)

    if (response.isSuccess()) {
      dispatch(
        'notifications/send',
        {text: CREATED_SUCCESSFULLY_MSG},
        {root: true}
      )
      dispatch('fetchCountries')
    } else {
      dispatch('notifications/send', {text: CREATE_ERROR_MSG}, {root: true})
    }
  },

  async updateCountry({dispatch}, country) {
    const response = await api.countries.updateItem(country.id, country)

    if (response.isSuccess()) {
      dispatch(
        'notifications/send',
        {text: UPDATED_SUCCESSFULLY_MSG},
        {root: true}
      )
      dispatch('fetchCountries')
    } else {
      dispatch('notifications/send', {text: UPDATE_ERROR_MSG}, {root: true})
    }
  },

  async deleteCountry({dispatch}, {id}) {
    const response = await api.countries.deleteItem(id)

    if (response.isSuccess()) {
      dispatch(
        'notifications/send',
        {text: DELETED_SUCCESSFULLY_MSG},
        {root: true}
      )
      dispatch('fetchCountries')
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
