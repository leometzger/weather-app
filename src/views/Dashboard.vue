<template>
  <div class="dashboard-container">
    <cities-selector
      v-if="cities.length"
      class="cities-selector"
      :value="selectedCitiesIds"
      :cities="cities"
      :disabled="selectedCitiesIds.length >= 3"
      @add="addCity"
      @remove="removeCity"
    />
    <loading-state v-if="isLoading" />
    <empty-state
      v-else-if="citiesWeatherData.length === 0"
      :cities="cities"
      :countries="countries"
      @add-city="addCity"
      @insert-country="$router.push({name: 'Countries'})"
      @insert-city="$router.push({name: 'Cities'})"
    ></empty-state>
    <weather-content
      v-else
      :city-weather-data="citiesWeatherData"
      @remove="removeCity"
    ></weather-content>
  </div>
</template>

<script>
import CitiesSelector from '@/components/main/CitiesSelector.vue'
import EmptyState from '@/components/main/EmptyState'
import LoadingState from '@/components/main/LoadingState'
import WeatherContent from '@/components/main/WeatherContent'
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'

export default {
  components: {CitiesSelector, EmptyState, WeatherContent, LoadingState},

  computed: {
    ...mapState('countries', ['countries']),
    ...mapState('cities', ['cities']),
    ...mapGetters('weather', ['citiesWeatherData']),
    ...mapState('weather', ['isLoading']),
    selectedCitiesIds() {
      return this.citiesWeatherData.map(({city}) => city.id)
    },
  },

  mounted() {
    this.fetchCountries()
    this.fetchCities()
  },

  methods: {
    ...mapActions('weather', ['addCity']),
    ...mapMutations('weather', ['removeCity']),
    ...mapActions('cities', ['fetchCities']),
    ...mapActions('countries', ['fetchCountries']),
  },
}
</script>

<style lang="scss" scoped>
@media (min-width: 1023px) {
  .cities-selector {
    width: 40% !important;
    margin: 15px auto !important;
  }
}

@media (max-width: 1023px) {
  .cities-selector {
    width: 80% !important;
    margin: 15px auto !important;
  }
}
</style>
