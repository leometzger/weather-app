import api from '@/api'

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
      dispatch('notifications/send', {text: 'Criado com sucesso'}, {root: true})
      dispatch('fetchCountries')
    } else {
      dispatch('notifications/send', {text: 'Falha ao criar'})
    }
  },

  async updateCountry({dispatch}, country) {
    const response = await api.countries.updateItem(country.id, country)

    if (response.isSuccess()) {
      dispatch(
        'notifications/send',
        {text: 'Atualizado com sucesso'},
        {root: true}
      )
      dispatch('fetchCountries')
    } else {
      dispatch('notifications/send', {text: 'Falha ao atualizar'})
    }
  },

  async deleteCountry({dispatch}, {id}) {
    const response = await api.countries.deleteItem(id)

    if (response.isSuccess()) {
      dispatch(
        'notifications/send',
        {text: 'Deletado com sucesso'},
        {root: true}
      )
      dispatch('fetchCountries')
    } else {
      dispatch('notifications/send', {text: 'Erro ao deletar'}, {root: true})
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
