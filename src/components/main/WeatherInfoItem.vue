<template>
  <v-list-item>
    <v-list-item-icon>
      <v-icon v-if="icon">{{ icon }}</v-icon>
    </v-list-item-icon>
    <v-list-item-title>
      <div class="weather-info-label">
        {{ label }}
      </div>
    </v-list-item-title>
    <v-list-item-subtitle>
      {{ value }}
    </v-list-item-subtitle>
  </v-list-item>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: false,
      default: null,
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      required: false,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.weather-info-label {
  font-weight: 600;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
}
</style>
