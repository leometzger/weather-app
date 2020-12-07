<template>
  <div class="weather-content-container">
    <template v-for="info in cityWeatherData">
      <weather-info
        v-if="info.founded"
        :key="info.city.id"
        :weather-info="info"
      ></weather-info>
      <weather-not-founded-info
        v-else
        :key="info.city.id"
        :weather-info="info"
      />
    </template>
  </div>
</template>

<script>
import WeatherInfo from './WeatherInfo.vue'
import WeatherNotFoundedInfo from './WeatherNotFoundedInfo'

export default {
  components: {WeatherInfo, WeatherNotFoundedInfo},

  props: {
    cityWeatherData: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@media (min-width: 1023px) {
  .weather-content-container {
    display: grid;

    justify-content: center;
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media (max-width: 1023px) {
  .weather-content-container {
    display: grid;

    justify-content: center;
    grid-template-columns: 1fr;
  }
}
</style>
