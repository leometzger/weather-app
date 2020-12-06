import api from '@/api'
import weatherStore from '@/store/weather'
import {City} from '@/api/CitiesApi'
import {WeatherForecast} from '@/api/WeatherApi'
import {Result} from '@/api/Result'

jest.mock('@/api')

describe('Weather Store', () => {
  const commit = jest.fn()
  const dispatch = jest.fn()
  const {actions} = weatherStore
  const fakeCity = City()

  afterEach(() => {
    commit.mockReset()
    dispatch.mockReset()
  })

  describe('actions', () => {
    describe('addCity', () => {
      it('should add city to store', async () => {
        await actions.addCity({commit, dispatch}, fakeCity)

        expect(commit).toBeCalledWith('setIsLoading', true)
        expect(commit).toBeCalledWith('setIsLoading', false)
        expect(dispatch).toBeCalledWith('getForecastsForCity', fakeCity)
        expect(dispatch).toBeCalledWith('getPastForecastsForCity', fakeCity)
      })
    })

    describe('getForecastsForCity', () => {
      it('timemachine should be seted when has success response', async () => {
        api.weather.getCityForecastWeather.mockImplementation(() => {
          return Result({status: 200, payload: [WeatherForecast()]})
        })
        await actions.getForecastsForCity({commit}, fakeCity)

        expect(commit).toBeCalledWith('addCityForecast', {
          city: fakeCity,
          forecasts: [WeatherForecast()],
        })
      })

      it('should set null when response is not success', async () => {
        api.weather.getCityForecastWeather.mockImplementation(() => {
          return Result({status: 404, payload: [WeatherForecast()]})
        })
        await actions.getForecastsForCity({commit}, fakeCity)

        expect(commit).toBeCalledWith('addCityForecast', {
          city: fakeCity,
          forecasts: null,
        })
      })
    })

    describe('getPastForecastsForCity', () => {
      it('timemachine should be seted when has success response', async () => {
        api.weather.getCityTimemachineWeather.mockImplementation(() => {
          return Result({status: 200, payload: [WeatherForecast()]})
        })
        await actions.getPastForecastsForCity({commit}, fakeCity)

        expect(commit).toBeCalledWith('addCityTimeMachine', {
          city: fakeCity,
          timeMachine: [WeatherForecast()],
        })
      })

      it('should set null when response is not success', async () => {
        api.weather.getCityTimemachineWeather.mockImplementation(() => {
          return Result({status: 404, payload: [WeatherForecast()]})
        })
        await actions.getPastForecastsForCity({commit}, fakeCity)

        expect(commit).toBeCalledWith('addCityTimeMachine', {
          city: fakeCity,
          timeMachine: null,
        })
      })
    })
  })
})
