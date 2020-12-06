import api from '@/api'

export const authStates = {
  UNAUTHENTICATED: 'UNAUTHENTICATED',
  AUTHENTICATED: 'AUTHENTICATED',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGGIN_IN: 'LOGGIN_IN',
}

const state = {
  loginState: authStates.UNAUTHENTICATED,
}

const mutations = {
  authenticated(state) {
    state.loginState = authStates.AUTHENTICATED
  },
  failedLogin(state) {
    state.loginState = authStates.LOGIN_ERROR
  },
  logginIn(state) {
    state.loginState = authStates.LOGGIN_IN
  },
  loginChange(state) {
    state.loginState = authStates.UNAUTHENTICATED
  },
}

const actions = {
  async submitLogin({commit}, {username, password}) {
    commit('logginIn')
    const resp = await api.login({username, password})

    if (resp.isSuccess()) {
      commit('authenticated')
    } else {
      commit('failedLogin')
    }
  },
}

const getters = {
  isAuthenticated(state) {
    return state.loginState === authStates.AUTHENTICATED
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
}
