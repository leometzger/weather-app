<template>
  <div class="mx-auto">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline">
          {{ weatherInfo.city.name }}
        </v-list-item-title>
        <v-list-item-subtitle
          >Cidade não encontrada na API Open Weather</v-list-item-subtitle
        >
      </v-list-item-content>
    </v-list-item>
    <v-img
      class="illustration-404"
      gradient
      max-width="200px"
      src="@/assets/illustrations/404.svg"
    ></v-img>
  </div>
</template>

<script>
export default {
  props: {
    weatherInfo: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.illustration-404 {
  margin: 0 auto;
}
</style>
