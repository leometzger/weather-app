<template>
  <div class="mx-auto">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline">
          {{ weatherInfo.city.name }}
          <v-icon @click="$emit('remove', weatherInfo.city)">
            close
          </v-icon>
        </v-list-item-title>
        <v-list-item-subtitle> </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <weather-info-type
      class="mb-10"
      :weather-type="currentForecast.weatherType"
    />

    <v-card-text>
      <div class="celsius mb-8">
        {{ toCelsius(currentForecast.temperature) }}&deg;C
      </div>
    </v-card-text>

    <weather-info-item
      icon="fas fa-wind"
      label="Vento"
      :value="currentForecast.windSpeed"
    ></weather-info-item>

    <weather-info-item
      icon="fas fa-tint"
      label="Umidade"
      :value="currentForecast.humidity + '%'"
    ></weather-info-item>

    <weather-info-item
      icon="fas fa-tachometer-alt"
      label="Pressão"
      :value="currentForecast.pressure"
    ></weather-info-item>

    <weather-info-item
      icon="fas fa-cloud"
      label="Núvens"
      :value="currentForecast.cloudIndex"
    ></weather-info-item>

    <div class="my-5">
      <strong>{{ toDatetime(currentForecast.datetime) }}</strong>
    </div>
    <v-slider
      v-model="time"
      :max="allForecasts.length"
      class="mx-4"
      ticks
      @input="onChangeForecast"
    ></v-slider>

    <v-list class="transparent"> </v-list>
    <v-divider></v-divider>
  </div>
</template>

<script>
import WeatherInfoItem from './WeatherInfoItem'
import WeatherInfoType from './WeatherInfoType.vue'
import {WeatherForecast} from '@/api/WeatherApi'

export default {
  components: {WeatherInfoItem, WeatherInfoType},
  props: {
    weatherInfo: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      time: null,
      currentForecast: WeatherForecast(),
      allForecasts: [],
    }
  },

  computed: {},

  mounted() {
    this.allForecasts = [
      ...this.weatherInfo.pastForecasts,
      ...this.weatherInfo.forecasts,
    ]
    this.time = this.weatherInfo.pastForecasts.length
    this.currentForecast = this.allForecasts[
      this.weatherInfo.pastForecasts.length
    ]
  },

  methods: {
    toCelsius(temperature) {
      return (Math.round((temperature - 273.15) * 10) / 10).toFixed(1)
    },
    onChangeForecast(index) {
      this.currentForecast = this.allForecasts[index]
    },
    toDatetime(datetime) {
      if (datetime && typeof datetime.toLocaleString === 'function') {
        return datetime.toLocaleString('pt-br')
      }
      return datetime
    },
  },
}
</script>

<style lang="scss" scoped>
.celsius {
  font-size: 72px;
  color: rgba(0, 0, 0, 0.6);
}
</style>
