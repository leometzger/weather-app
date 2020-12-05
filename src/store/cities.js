import api from '@/api'

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
      dispatch('notifications/send', {text: 'Criado com sucesso'}, {root: true})
      dispatch('fetchCities')
    } else {
      dispatch('notifications/send', {text: 'Falha ao criar'})
    }
  },

  async updateCity({dispatch}, city) {
    const response = await api.cities.updateItem(city)

    if (response.isSuccess()) {
      dispatch(
        'notifications/send',
        {text: 'Atualizado com sucesso'},
        {root: true}
      )
      dispatch('fetchCities')
    } else {
      dispatch('notifications/send', {text: 'Falha ao atualizar'})
    }
  },

  async deleteCity({dispatch}, {id}) {
    const response = await api.cities.deleteItem(id)

    if (response.isSuccess()) {
      dispatch(
        'notifications/send',
        {text: 'Deletado com sucesso'},
        {root: true}
      )
      dispatch('fetchCities')
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
