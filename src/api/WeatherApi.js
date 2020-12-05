import {Result} from './Result'
import forecastsData from './forecasts.json'
import timeMachineData from './timemachine.json'

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

const WeatherApi = () => ({
  async getCityForecastWeather() {
    /*const response = await forecastApi.get({
      url: 'forecast',
      params: {
        q: `${city.name},${city.code}`,
        lat: city.lat,
        lon: city.lon,
      },
    })*/
    const response = {
      status: 200,
      data: forecastsData,
    }

    if (response.status === 200) {
      return Result({
        status: 200,
        payload: buildWeatherForecastResult(response.data),
      })
    }

    return Result({status: response.status, payload: []})
  },

  async getCityTimemachineWeather() {
    /*const response = await forecastApi.get({
      url: 'onecall/timemachine',
      params: {
        dt: new Date().toUTCString(),
        lat: city.lat,
        lon: city.lon,
      },
    })*/
    const response = {
      status: 200,
      data: timeMachineData,
    }

    if (response.status === 200) {
      return Result({
        status: 200,
        payload: buildWeatherTimeMachineResult(response.data),
      })
    }

    return Result({status: response.status, payload: []})
  },
})

export default WeatherApi
