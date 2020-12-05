const TIMEOUT = 3 * 1000

const state = {
  text: '',
  isActive: false,
}

const mutations = {
  setIsActive(state, isActive) {
    state.isActive = isActive
  },
  setText(state, text) {
    state.text = text
  },
}

const actions = {
  send({commit, dispatch}, {text}) {
    commit('setText', text)
    commit('setIsActive', true)

    setTimeout(() => dispatch('close'), TIMEOUT)
  },

  close({commit}) {
    commit('setIsActive', false)
    commit('setText', '')
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
