import {Result} from './Result'
import {flatArray} from '@/utils/collections'

const daysBackEnv = +process.env.VUE_APP_N_DAYS_BACK
const ndaysBack =
  daysBackEnv && daysBackEnv <= 4 && daysBackEnv >= 0 ? daysBackEnv : 4

export const WeatherForecast = ({
  datetime,
  temperature,
  climate,
  cloudIndex,
  pressure,
  humidity,
  windSpeed,
  weatherType,
} = {}) => ({
  datetime: datetime,
  temperature: temperature,
  climate: climate,
  windSpeed: windSpeed,
  cloudIndex: cloudIndex,
  pressure: pressure,
  humidity: humidity,
  weatherType: weatherType,
})

const buildWeatherForecastResult = data => {
  const forecasts = data.list

  return forecasts.map(forecast =>
    WeatherForecast({
      datetime: fromUnixTime(forecast.dt),
      temperature: forecast.main.temp,
      cloudIndex: forecast.clouds.all,
      pressure: forecast.main.pressure,
      humidity: forecast.main.humidity,
      windSpeed: forecast.wind.speed,
      weatherType: forecast.weather[0].main,
    })
  )
}

const buildWeatherTimeMachineResult = data => {
  const forecasts = data.hourly

  return forecasts.map(forecast =>
    WeatherForecast({
      datetime: fromUnixTime(forecast.dt),
      temperature: forecast.temp,
      cloudIndex: forecast.clouds,
      pressure: forecast.pressure,
      humidity: forecast.humidity,
      windSpeed: forecast.wind_speed,
      weatherType: forecast.weather[0].main,
    })
  )
}

const fromUnixTime = unix => new Date(unix * 1000)

const unixNowMinusDay = n => {
  const now = new Date()
  now.setDate(now.getDate() - n)
  return Math.floor(now.getTime() / 1000)
}

const isMultipleOfThree = hour => hour % 3 === 0

const WeatherApi = (http, db) => ({
  async getCityForecastWeather(city) {
    try {
      const country = await db.countries.get(city.country)
      const response = await http.get('/forecast', {
        params: {
          q: `${city.name},${country.code}`,
          lat: city.latitude,
          lon: city.longitude,
        },
      })

      if (response.status === 200) {
        return Result({
          status: 200,
          payload: buildWeatherForecastResult(response.data),
        })
      }
      return Result({status: response.status, payload: []})
    } catch (e) {
      const response = e.response

      return Result({status: response.status, payload: []})
    }
  },

  async getCityTimemachineWeather(city) {
    try {
      const calls = []

      for (let i = ndaysBack; i >= 0; --i) {
        const promise = http.get('/onecall/timemachine', {
          params: {
            dt: unixNowMinusDay(i),
            lat: city.latitude,
            lon: city.longitude,
          },
        })
        calls.push(promise)
      }
      const responses = await Promise.all(calls)
      const weatherForecasts = responses.map(response => {
        if (response.status === 200) {
          return buildWeatherTimeMachineResult(response.data)
        } else {
          throw {response}
        }
      })
      const payload = flatArray(weatherForecasts).filter(forecast =>
        isMultipleOfThree(forecast.datetime.getHours())
      )

      return Result({
        status: 200,
        payload: payload,
      })
    } catch (e) {
      const response = e.response
      return Result({status: response.status, payload: []})
    }
  },
})

export default WeatherApi
