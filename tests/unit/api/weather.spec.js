import forecastData from './forecast.json'
import timeMachineData from './timemachine.json'
import WeatherApi, {WeatherForecast} from '@/api/WeatherApi'
import {Country} from '@/api/CountriesApi'
import {City} from '@/api/CitiesApi'

describe('weather API', () => {
  const http = {get: jest.fn()}
  const db = {
    countries: {
      get: jest.fn(),
    },
  }
  const api = WeatherApi(http, db)

  describe('getCityForecastWeather', () => {
    db.countries.get.mockReturnValue(Country({code: 'BR'}))

    it('should get /forecasts api', async () => {
      http.get.mockResolvedValue({status: 200, data: forecastData})
      const result = await api.getCityForecastWeather(
        City({
          id: 1,
          name: 'Brasil',
          country: 1,
          latitude: -25.0,
          longitude: -42.0,
        })
      )

      expect(result.isSuccess()).toBe(true)
      expect(result.payload).toEqual([
        WeatherForecast({
          cloudIndex: 95,
          datetime: new Date('2020-12-06T21:00:00.000Z'),
          humidity: 94,
          pressure: 1016,
          temperature: 291.13,
          weatherType: 'Rain',
          windSpeed: 0.49,
        }),
      ])
    })

    it('should work with exceptions', async () => {
      http.get.mockImplementation(() => {
        throw {response: {status: 500}}
      })

      const result = await api.getCityTimemachineWeather(City())

      expect(result.isSuccess()).toBe(false)
      expect(result.payload).toEqual([])
    })
  })

  describe('getCityForecastWeather', () => {
    it('should get /onecall/timemachine api', async () => {
      db.countries.get.mockReturnValue(Country({code: 'BR'}))
      http.get.mockImplementation(() => {
        return {status: 200, data: timeMachineData}
      })
      const oneForecast = WeatherForecast({
        cloudIndex: 75,
        datetime: new Date('2020-12-06T00:00:00.000Z'),
        humidity: 93,
        pressure: 985,
        temperature: 288.36,
        weatherType: 'Rain',
        windSpeed: 1,
      })
      const result = await api.getCityTimemachineWeather(
        City({
          id: 1,
          name: 'Brasil',
          country: 1,
          latitude: -25.0,
          longitude: -42.0,
        })
      )

      expect(result.isSuccess()).toBe(true)
      expect(result.payload).toEqual([
        oneForecast,
        oneForecast,
        oneForecast,
        oneForecast,
        oneForecast,
      ])
    })

    it('should work with exceptions', async () => {
      http.get.mockImplementation(() => {
        throw {response: {status: 500}}
      })

      const result = await api.getCityTimemachineWeather(City())

      expect(result.isSuccess()).toBe(false)
      expect(result.payload).toEqual([])
    })
  })
})
