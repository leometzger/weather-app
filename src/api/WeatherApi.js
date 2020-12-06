import {Result} from './Result'

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
      const response = await http.get('/onecall/timemachine', {
        params: {
          dt: Math.floor(new Date().getTime() / 1000),
          lat: city.latitude,
          lon: city.longitude,
        },
      })

      if (response.status === 200) {
        return Result({
          status: 200,
          payload: buildWeatherTimeMachineResult(response.data),
        })
      }
      return Result({status: response.status, payload: []})
    } catch (e) {
      const response = e.response
      return Result({status: response.status, payload: []})
    }
  },
})

export default WeatherApi
