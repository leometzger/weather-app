import api from '@/api'

const state = {
  citiesForecasts: [],
  citiesTimeMachine: [],
  citiesError: {},
}

const mutations = {
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
  async addCity({getters, dispatch}, city) {
    if (getters.citiesCount < 3) {
      await Promise.all([
        dispatch('getForecastsForCity', city),
        dispatch('getPastForecastsForCity', city),
      ])
    }
  },

  async getForecastsForCity({commit}, city) {
    const result = await api.weather.getCityForecastWeather(city)

    if (result.isSuccess()) {
      commit('addCityForecast', {city, forecasts: result.payload})
    }
  },

  async getPastForecastsForCity({commit}, city) {
    const result = await api.weather.getCityTimemachineWeather(city)

    if (result.isSuccess()) {
      commit('addCityTimeMachine', {city, timeMachine: result.payload})
    }
  },
}

const getters = {
  citiesCount() {
    return 0
  },
  citiesWeatherData(state) {
    return state.citiesForecasts.map(({city, forecasts}) => {
      const {timeMachine: pastForecasts} = state.citiesTimeMachine.find(
        ({city: tmCity}) => {
          return city === tmCity
        }
      )

      return {city, pastForecasts, forecasts}
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
