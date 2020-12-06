<template>
  <v-icon size="72px" v-if="weatherType === 'Rain'"
    >fas fa-cloud-showers-heavy</v-icon
  >
  <v-icon size="72px" v-else-if="weatherType === 'Clouds'">fas fa-cloud</v-icon>
  <v-icon size="72px" v-else-if="weatherType === 'Clear'">fas fa-sun</v-icon>
  <v-icon size="72px" v-else-if="weatherType === 'Drizzle'"
    >fas fa-cloud-rain</v-icon
  >
  <v-icon size="72px" v-else>fas fa-cloud-sun-rain</v-icon>
</template>

<script>
export default {
  props: {
    weatherType: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>
