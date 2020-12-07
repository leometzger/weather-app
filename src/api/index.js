import Dexie from 'dexie'
import axios from 'axios'

import CitiesApi from './CitiesApi'
import CountriesApi from './CountriesApi'
import LoginApi from './LoginApi'
import WeatherApi from './WeatherApi'

const db = new Dexie('weather')

db.version(1).stores({
  cities: '++id,country',
  countries: '++id,code,name',
})

const http = axios.create({
  baseURL: 'https://community-open-weather-map.p.rapidapi.com/',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
    'x-rapidapi-key': process.env.VUE_APP_RAPIDAPI_KEY,
    useQueryString: true,
  },
})

export default {
  ...LoginApi(db),
  cities: CitiesApi(db),
  countries: CountriesApi(db),
  weather: WeatherApi(http, db),
}
