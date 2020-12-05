<template>
  <div class="weather-content-container">
    <template v-for="info in cityWeatherData">
      <weather-info :key="info.city.id" :weather-info="info"></weather-info>
    </template>
  </div>
</template>

<script>
import WeatherInfo from './WeatherInfo.vue'

export default {
  components: {WeatherInfo},

  props: {
    cityWeatherData: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@media (min-width: 1024px) {
  .weather-content-container {
    display: grid;

    justify-content: center;
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media (max-width: 1024px) {
  .weather-content-container {
    display: grid;

    justify-content: center;
    grid-template-columns: 1fr;
  }
}
</style>
