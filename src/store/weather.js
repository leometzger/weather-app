import api from '@/api'

const state = {
  citiesForecasts: [],
  citiesTimeMachine: [],
  citiesError: {},
  isLoading: false,
}

const mutations = {
  setIsLoading(state, isLoading) {
    state.isLoading = isLoading
  },
  addCityForecast(state, {city, forecasts}) {
    state.citiesForecasts.push({city, forecasts})
  },
  addCityTimeMachine(state, {city, timeMachine}) {
    state.citiesTimeMachine.push({city, timeMachine})
  },
  removeCity(state, removedCity) {
    state.citiesTimeMachine = state.citiesTimeMachine.filter(
      ({city}) => city.id !== removedCity.id
    )
    state.citiesForecasts = state.citiesForecasts.filter(
      ({city}) => city.id !== removedCity.id
    )
  },
}

const actions = {
  async addCity({commit, getters, dispatch}, city) {
    commit('setIsLoading', true)
    if (getters.citiesCount < 3) {
      await Promise.all([
        dispatch('getForecastsForCity', city),
        dispatch('getPastForecastsForCity', city),
      ])
    }
    commit('setIsLoading', false)
  },

  async getForecastsForCity({commit}, city) {
    const result = await api.weather.getCityForecastWeather(city)

    commit('addCityForecast', {
      city,
      forecasts: result.isSuccess() ? result.payload : null,
    })
  },

  async getPastForecastsForCity({commit}, city) {
    const result = await api.weather.getCityTimemachineWeather(city)

    commit('addCityTimeMachine', {
      city,
      timeMachine: result.isSuccess() ? result.payload : null,
    })
  },
}

const getters = {
  citiesCount() {
    return 0
  },
  citiesWeatherData(state) {
    return state.citiesForecasts.map(({city, forecasts}) => {
      const {timeMachine: pastForecasts} =
        state.citiesTimeMachine.find(({city: tmCity}) => {
          return city === tmCity
        }) || {}

      return {
        city,
        pastForecasts,
        forecasts,
        founded: !!(pastForecasts && forecasts),
      }
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
