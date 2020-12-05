import Dexie from 'dexie'
import axios from 'axios'

import CitiesApi from './CitiesApi'
import CountriesApi from './CountriesApi'
import LoginApi from './LoginApi'
import WeatherApi from './WeatherApi'

const db = new Dexie('weather')

db.version(1).stores({
  cities: '++id,[name+country]',
  countries: 'code,name',
})

export default {
  ...LoginApi(db),
  cities: CitiesApi(db),
  countries: CountriesApi(db),
  weather: WeatherApi(axios),
}
