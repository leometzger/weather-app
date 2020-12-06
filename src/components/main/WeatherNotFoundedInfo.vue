<template>
  <div class="mx-auto">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline">
          {{ weatherInfo.city.name }}
        </v-list-item-title>
        <v-list-item-subtitle></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
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
