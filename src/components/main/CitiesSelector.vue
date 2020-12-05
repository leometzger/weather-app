<template>
  <v-autocomplete
    multiple
    chips
    class="mx-4"
    label="Buscar previsão"
    item-text="name"
    item-value="id"
    :items="cities"
    :value="value"
    @input="onInput"
  ></v-autocomplete>
</template>

<script>
import {difference} from '@/utils/collections'

export default {
  props: {
    cities: {
      type: Array,
      required: true,
    },
    value: {
      type: Array,
      required: true,
    },
  },

  methods: {
    onInput(cityIds) {
      if (cityIds.length > this.value.length) {
        const addedId = difference(cityIds, this.value)[0]
        const city = this.cities.find(city => addedId === city.id)

        this.$emit('add', city)
      }
      if (cityIds.length < this.value.length) {
        const removedId = difference(this.value, cityIds)[0]
        const city = this.cities.find(city => removedId === city.id)

        this.$emit('remove', city)
      }
    },
  },
}
</script>
